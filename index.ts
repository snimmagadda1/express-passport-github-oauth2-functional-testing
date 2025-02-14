import express from "express";
import { isAuth } from "./middleware/is-auth";
import { sessionMiddleware } from "./middleware/session";
import passport from "passport";

// Import passport session serialization/deserialization config
import "./middleware/passport-session";

// Import passport strategy(ies) config
import "./middleware/passport-github";

const app = express();

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
