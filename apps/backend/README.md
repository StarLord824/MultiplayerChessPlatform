# ♟️ Chess Backend API & WebSocket Server

This is the backend for a real-time online chess game built using **Node.js**, **Express**, and the **ws** WebSocket library. It supports REST endpoints (for game management or testing) and full-duplex WebSocket communication for real-time multiplayer gameplay.

## 🚀 Live Server

- **HTTP Endpoint**: [`https://chessbackend-vd6d.onrender.com`](https://chessbackend-vd6d.onrender.com)
- **WebSocket Endpoint**: `wss://chessbackend-vd6d.onrender.com`

---

## 📦 Tech Stack

- **Node.js** + **Express** + **Native Http Library** — Web server and REST API
- **WebSocket (ws)** — Real-time communication for gameplay
- **Render.com** — Hosting and deployment

---

## 🧩 Features

- WebSocket connection for real-time chess moves and user interaction
- Room-based architecture ready (can be extended)
- REST endpoint(s) for health checks or game metadata
- Compatible with any frontend (React, mobile, etc.)(currently react frontend is live)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/StarLord824/chessBackend.git
cd chessBackend
```

### 2. Install the dependencies

```bash
npm i
```

### 3. Run Loaclly

```bash
npm run start
```
