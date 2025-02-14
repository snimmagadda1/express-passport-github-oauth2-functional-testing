import express, { type Request, type Response } from "express";
import passport from "passport";
import { isAuth } from "../middleware/is-auth";
import { sessionMiddleware } from "../middleware/session";
import type { CreateUserRequest } from "../models/user";
import { userService } from "../services/userService";

export default async function () {
  const app = express();
  app.use(express.json());

  // Setup express session
  app.use(sessionMiddleware);

  // Register passport
  app.use(passport.initialize());

  // Setup passport session integration
  app.use(passport.session());

  app.get("/", isAuth, (req, res) => {
    res.send(
      `Hello, you are logged in as ${JSON.stringify(req.user)} via Express!`
    );
  });

  app.post(
    "/users",
    isAuth,
    (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
      const { name, email } = req.body;
      const user = { id: Date.now().toString(), name, email };
      userService.save(user);
      res.status(201).json(user);
    }
  );

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/")
  );

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}
