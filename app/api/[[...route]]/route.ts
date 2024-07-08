import { Hono } from "hono";
import { handle } from "hono/vercel"; //feel free to swap vercel out
import companies from "./companies";
import companiesAI from "./companiesAI";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

const routes = app
  .route("/companies", companies)
  .route("/companiesAI", companiesAI);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// read this to understand more about Hono RPC https://hono.dev/guides/rpc

export type AppType = typeof routes;
