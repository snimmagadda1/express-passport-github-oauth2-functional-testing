import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { userService } from "../services/userService";
import { type VerifyCallback } from "passport-oauth2";
import MockGHStrategy from "../test/passport-mock-strategy";

const config = {
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "http://localhost:3000/auth/github/callback",
};
export default async function () {
  passport.use(environmentStrategy(userService));
}

// Inject store to environment strategy
const strategyCallback =
  (store: any) =>
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => {
    try {
      // Find existing user or create a new one
      const user = store.findOrCreate(profile);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

const environmentStrategy = (store: any): passport.Strategy => {
  switch (process.env.NODE_ENV) {
    case "test":
      return new MockGHStrategy("github", strategyCallback(store));
    default:
      return new GitHubStrategy(config, strategyCallback(store));
  }
};
