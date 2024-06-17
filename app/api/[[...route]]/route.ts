import { Hono } from "hono";
import { handle } from "hono/vercel"; //feel free to swap vercel out
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge"; //need to be deleted

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// read this to understand more about Hono RPC https://hono.dev/guides/rpc

export type AppType = typeof routes;
