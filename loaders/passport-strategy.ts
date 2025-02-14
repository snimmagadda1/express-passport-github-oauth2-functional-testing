import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { userService } from "../services/userService";

export default async function () {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/auth/github/callback",
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        try {
          // Find existing user or create a new one
          const user = userService.findOrCreate(profile);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}
