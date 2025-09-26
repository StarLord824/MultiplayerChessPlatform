import { WebSocket } from "ws";
import { Chess, Move } from "chess.js";
import {MessageTypes as Messages} from "../ws/messages";
import { prisma } from "../Singleton";
import { MatchStatus } from "@prisma/client";

export class Player {
  public id: string;
  public ws: WebSocket;
  public username?: string;
  public game?: Game;
  constructor(id: string, ws: WebSocket, username?: string, game?: Game) {
    this.id = id;
    this.ws = ws;
    this.username = username;
    this.game = game;
  }
}

export type MovePayload = { from: string; to: string };

export class Game {
  public id: number;
  public whitePlayer: Player;
  public blackPlayer: Player;
  public board: Chess;
  public moves: MovePayload[];
  public startTime : number;

  constructor(whitePlayer: Player, blackPlayer: Player, id: number) {
    this.id = id;
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;
    this.board = new Chess();
    this.moves = [];
    this.startTime = Date.now();
  }

  public async makeMove(playerWs: WebSocket, move: MovePayload) {
    const playerColor = playerWs === this.whitePlayer.ws ? "w" : "b";

    //check if this is the player's turn, and if the move is valid
    if (this.board.turn() !== playerColor) {
      playerWs.send(JSON.stringify({
        type: "error",
        message: "It's not your turn."
      }));
      return;
    }
    const result = this.board.move(move as Move);
    if (!result) {
      playerWs.send(JSON.stringify({
        type: "error",
        message: "Invalid move."
      }));
      return;
    }

    // Save move
    this.moves.push(move);

    await prisma.match.update({
      where: { id: this.id },
      data: {
        moves: this.moves,
        updatedAt: new Date()
      }
    });
    // Broadcast move to both players
    [this.whitePlayer, this.blackPlayer].forEach(p => {
      p.ws.send(JSON.stringify({
        type: Messages.Move,
        payload: {
          moves: this.moves, //includes full move history
          board: this.board.fen(),
          turn: this.board.turn()
        }
      }));
    });

    // Check for game over
    if (this.board.isGameOver()) {
      let winner: string;
      if (this.board.isCheckmate()) {
        winner = this.board.turn() === "w" ? "black" : "white"; // opposite of current turn
      } else {
        winner = "draw";
      }

      await prisma.match.update({
        where: { id: this.id },
        data: {
          status: MatchStatus.FINISHED,
          winnerId: winner === "draw" ? null : winner === "black" ? this.blackPlayer.id : this.whitePlayer.id,
          updatedAt: new Date()
        }
      });
      
      [this.whitePlayer, this.blackPlayer].forEach(p => {
        p.ws.send(JSON.stringify({
          type: Messages.Game_Over,
          payload: winner
        }));
      });
    }
  }
}
