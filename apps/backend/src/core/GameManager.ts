  import { WebSocket } from "ws";
  import { Game, Player } from "./Game";
  import { MessageTypes as Messages } from "../ws/messages";
  import { prisma } from "../Singleton";
  import { auth } from "../auth";
  import { MatchStatus } from "@prisma/client";

  export class GameManager {
    private playersCount = 0;
    private players: Player[];
    private games: Game[];
    private pendingUser: Player | undefined;

    constructor() {
      this.players = [];
      this.games = [];
      this.pendingUser = undefined;
    }

    public handleMessage(ws: WebSocket, type: string, payload: any) {
      const player = this.players.find((p) => p.ws === ws);
      if (!player) {
        ws.send(JSON.stringify({ type: "error", message: "Player not found." }));
        return;
      }

      switch (type) {
        // case Messages.Player_Joined:
        //ops
        // this.addPlayer(ws, payload);
        // break;
        case Messages.Set_Name:
          this.setName(player, payload.username);
          break;
        case Messages.Player_Left:
          this.removePlayer(player);
          break;
        case Messages.Init_Game:
          this.startGame(player);
          break;
        case Messages.Move:
          this.makeMove(player, payload);
          break;
        case Messages.Game_Over:
          //ops
          break;
        default:
          ws.send(
            JSON.stringify({ type: "error", message: "Invalid message type." })
          );
      }
    }

    public async setName(player: Player, username: string) {
      if(player.username) {
        player.ws.send(JSON.stringify({ "type": "error", message: "Username already set" }));
      }
      // ensure uniqueness in DB
      const existing = await prisma.user.findUnique({ where: { username : username } });
      if (existing) {
        player.ws.send(JSON.stringify({ type: "error", message: "Username taken." }));
        return;
      }

      await prisma.user.update({
        where: { id: player.id },
        data: { username: username }
      });

      player.username = username;
      player.ws.send(JSON.stringify({ message: `Hello ${player.username}` }));
      this.broadcast(Messages.Player_Joined, player.username, player.ws);
    }

    public async addPlayer(ws: WebSocket, req: any) {
      try {
        // 1. Extract session token from cookie or headers
        const token = req.headers.cookie?.match(/session=([^;]+)/)?.[1];
        if (!token) {
          ws.close(4001, "Unauthorized: no token");
          return;
        }

        // 2. Validate session using better-auth
        const session = await auth.api.getSession(token);
        
        if (!session) {
          ws.close(4001, "Unauthorized: invalid session");
          return;
        }

        // 3. Lookup user in DB
        const user = await prisma.user.findUnique({
          where: { id: session.user.id }
        });

        if (!user) {
          ws.close(4001, "User not found");
          return;
        }

        // 4. Create Player object
        const player = new Player(user.id, ws, user.username ?? undefined);
        this.players.push(player);

        // 5. Send welcome message
        ws.send(
          JSON.stringify({
            type: Messages.Player_Joined,
            message: user.username
              ? `Welcome back, ${user.username}!`
              : `Welcome! Please set your username.`,
            payload: { id: user.id, username: user.username }
          })
        );

        return player;
      } catch (err) {
        console.error("Error adding player:", err);
        ws.close(4001, "Auth error");
      }
    }


    public async removePlayer(player: Player) {
      const playerIndex = this.players.findIndex((p) => p === player);
      if (playerIndex !== -1) {
        this.players.splice(playerIndex, 1);
        player.ws.send(JSON.stringify({ message: "You left the game." }));
      }
      //remove from queue
      if (this.pendingUser?.ws === player.ws) {
        this.pendingUser = undefined;
      } else {
        //stop his game
        const gameIndex = this.games.findIndex(
          (game) => game.whitePlayer === player || game.blackPlayer === player
        );
        if (gameIndex !== -1) {
          const game = this.games[gameIndex];
          await prisma.match.update({
            where: { id: game.id },
            data: {
              status: MatchStatus.ABORTED,
              updatedAt: new Date()
            }
          });

          const opponent = game.whitePlayer === player ? game.blackPlayer : game.whitePlayer;
          opponent.ws.send(
            JSON.stringify({
              type: Messages.Player_Left,
              payload: opponent.username,
              message: `Opponent has left the game.`,
            })
          );
          this.games.splice(gameIndex, 1);
        }
      }
    }

    public broadcast(type: string, payload: any, excludeWs?: WebSocket) {
      const ws = excludeWs ?? null;
      this.players.forEach((p) => {
        if (p.ws !== ws) {
          p.ws.send(JSON.stringify({ type, payload }));
        }
      });
    }

    public async startGame(player: Player) {
      //a user is in the queue
      //start the game
      if (this.pendingUser) {
        
        const dbMatch = await prisma.match.create({
          data: {
            whitePlayerId: this.pendingUser.id,
            blackPlayerId: player.id,
            status: MatchStatus.IN_PROGRESS,
            moves: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });
        
        const game = new Game(this.pendingUser, player, dbMatch.id);

        //add game object to both players
        this.pendingUser.game = game;
        player.game = game;

        this.games.push(game);
        // player.ws.send(JSON.stringify({ type: Game_Started, payload: game.board.fen() }));
        player.ws.send(
          JSON.stringify({
            type: Messages.Game_Started,
            payload: game.board.fen(),
            message: `The Culling Games are starting and you are assigned Black. Good luck ${player.username}!`,
          })
        );
        this.pendingUser.ws.send(
          JSON.stringify({
            type: Messages.Game_Started,
            payload: game.board.fen(),
            message: `The Culling Games are starting and you are assigned White. Best of Luck ${this.pendingUser.username}!`,
          })
        );
        this.pendingUser = undefined;
      }
      //join the queue for matching
      else {
        this.pendingUser = player;
        player.ws.send(
          JSON.stringify({
            message: "Waiting for another player to join the Culling games...",
          })
        );
      }
    }

    public makeMove(player: Player, move: { from: string; to: string }) {
      const game = this.games.find(
        (g) => g.whitePlayer === player || g.blackPlayer === player
      );
      if (game) {
        game.makeMove(player.ws, move);
      } else {
        player.ws.send(
          JSON.stringify({ type: "error", message: "You are not in a game." })
        );
      }
    }
  }
