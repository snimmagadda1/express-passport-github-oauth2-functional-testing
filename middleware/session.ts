import session, { MemoryStore } from "express-session";

export const sessionMiddleware = session({
  secret: "super-secret-shh",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // a pattern to prioritize DX
    domain: (() => {
      switch (process.env.NODE_ENV) {
        case "development":
          return "localhost";
        case "test":
          return undefined;
        default:
          return ".yourdomain.com";
      }
    })(),
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production" ? "strict" : "lax") as
      | "strict"
      | "lax",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
});
