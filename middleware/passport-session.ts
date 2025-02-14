import passport from "passport";
import { userService } from "../services/userService";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const user = userService.findById(id);
  if (!user) {
    return done(new Error("User not found"));
  }
  done(null, user);
});
