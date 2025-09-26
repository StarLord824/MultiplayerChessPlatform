export enum MessageTypes {
    Game_Over = "GameOver",
    Game_Started = "GameStarted",
    Player_Joined = "PlayerJoined",
    Player_Left = "PlayerLeft",
    Player_Moved = "PlayerMoved",
    Move= "Move",
    Init_Game = "InitGame",
    Set_Name = "SetName",
}

//users will send moves through the frontend in this json format
// {
// "type": "MOVE",
//   "payload": { "from": "e2", "to": "e4" }
// }
