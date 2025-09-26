import { WebSocketServer, WebSocket } from "ws";
import { GameManager } from "../core/GameManager";
import http from "http";

export default function wsConnections(server: http.Server) {
  const wss = new WebSocketServer({ server }, () => {
    console.log("WebSocket server started");
  });

  const gameManager: GameManager = new GameManager();

  wss.on("connection", (ws, req) => {
    console.log("player connected");
    gameManager.addPlayer(ws, req);

    ws.on("message", (message) => {
      try {
        const {type, payload} = JSON.parse(message.toString());
        gameManager.handleMessage(ws, type, payload);
      } catch (e) {
        console.log(`Invalid message from client:`, e);
      }
    });

    ws.on("close", () => {
      gameManager.handleMessage(ws, `PlayerLeft`, null);
      console.log("Client disconnected");
    });
  });
  console.log(
    "WebSocket server is bound to HTTP server"
  );
}
