import { Router } from "express";

const matchRouter = Router();

matchRouter.get("/", (req, res) => {
  res.send("Matches");
});

export default matchRouter;