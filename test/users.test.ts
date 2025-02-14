import type { Express } from "express";
import type { Agent } from "supertest";
import request from "supertest";
import { userService } from "../services/userService";

let app: Express;
let authenticatedAgent: Agent;

// beforeAll()
