import loadPassportSession from "./passport-session";
import loadPassportStrategy from "./passport-strategy";
import loadExpress from "./express";
import type { Express } from "express";

let app: Express | null = null;

export default async function () {
  await loadPassportSession();
  await loadPassportStrategy();
  app = await loadExpress();
}

/**
 * Get the Express application instance
 * @returns The Express application instance
 * @throws Error if the app hasn't been initialized
 */
export function getExpressApp(): Express {
  if (!app) {
    throw new Error(
      "Express app has not been initialized. Call the loader first."
    );
  }
  return app;
}
