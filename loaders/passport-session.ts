// Import passport session serialization/deserialization config
import passport from "passport";
import { userService } from "../services/userService";
import { type User } from "../models/user";

/**
 * Configures passport session serialization and deserialization
 * This is part of the initialization process that sets up how passport
 * will store the user object in the session
 */
export default async function () {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await userService.findById(id);
      if (!user) {
        return done(new Error("User not found"));
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
