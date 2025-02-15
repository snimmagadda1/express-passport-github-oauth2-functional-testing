import {
  beforeEach,
  afterEach,
  expect,
  test,
  describe,
  afterAll,
} from "bun:test";
import type { Express } from "express";
import type { Agent } from "supertest";
import request from "supertest";
import type { Response } from "superagent";
import { userService } from "../services/userService";
import loadLoaders, { getExpressApp, getServerInstance } from "../loaders";

let app: Express;
let authenticatedAgent: Agent;

const createAuthenticatedAgent = async (
  expressApp: Express
): Promise<Agent> => {
  const authAgent = request.agent(expressApp);
  console.info(`Before cookie jar ${authAgent}`);
  // Go directly to the callback URL since we're using a mock strategy
  const response: Response = await authAgent
    .get("/auth/github/callback")
    .expect(302);

  // Verify the header for debugging
  const cookieHeader = response.headers["set-cookie"];
  const sessionCookies = Array.isArray(cookieHeader)
    ? cookieHeader
    : [cookieHeader];
  if (!sessionCookies || sessionCookies.length === 0) {
    throw new Error("No session cookie set");
  }
  return authAgent;
};

beforeEach(async () => {
  await loadLoaders();
  app = await getExpressApp();
  authenticatedAgent = await createAuthenticatedAgent(app);
});

afterEach(async () => {
  (await getServerInstance()).close();
});

describe("POST /users", () => {
  test("should return 401 when not authenticated", async () => {
    const mockUser = {
      email: "test@example.com",
      name: "Test User",
    };

    // new request instance
    await request(app).post("/users").send(mockUser).expect(401);
  });

  test("should create a new user when authenticated", async () => {
    const mockUser = {
      email: "test@example.com",
      name: "Test User",
    };

    // Use the pre-authenticated agent which should maintain the session
    const response = await authenticatedAgent
      .post("/users")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      email: mockUser.email,
      name: mockUser.name,
    });
    expect(response.body.id).toBeDefined();

    // Verify the user exists in the store
    const createdUser = userService.findById(response.body.id);
    expect(createdUser).toBeDefined();
    expect(createdUser).toMatchObject({
      email: mockUser.email,
      name: mockUser.name,
      id: response.body.id,
    });
  });
});
