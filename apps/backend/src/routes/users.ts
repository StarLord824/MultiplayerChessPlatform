import { Router } from "express";
import { prisma } from "../Singleton";
import { Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("Users");
});


userRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const { email } = req.body.user;
    const user = await prisma.user.findUnique({
      where: { email }, // email first
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        rating: true,
        matchesWon: true
      }
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default userRouter;