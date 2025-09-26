import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth");
});

// email-password, google or github based login and register
//using auth/express library

export default authRouter;