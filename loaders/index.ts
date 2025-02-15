import { Server } from "http";
import loadPassportSession from "./passport-session";
import loadPassportStrategy from "./passport-strategy";
import loadExpress from "./express";
import type { Express } from "express";

let app: Express | null = null;
let server: Server;

export default async function () {
  await loadPassportSession();
  await loadPassportStrategy();
  ({ app, server } = await loadExpress());
}

/**
 * Get the Express application instance
 * @returns The Express application instance
 * @throws Error if the app hasn't been initialized
 */
export async function getExpressApp(): Promise<Express> {
  if (!app) {
    throw new Error(
      "Express app has not been initialized. Call the loader first."
    );
  }
  return app;
}

/**
 * Get the Server instance
 * @returns The Server instance
 * @throws Error if the server hasn't been initialized
 */
export async function getServerInstance(): Promise<Server> {
  if (!server) {
    throw new Error("Server has not been initialized. Call the loader first.");
  }
  return server;
}
