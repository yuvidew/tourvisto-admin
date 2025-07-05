import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "../../features/auth/server/route"

const app = new Hono().basePath("/api");

app
.route("/v1/auth", auth);

// You only really need one handler:
export const handler = handle(app);

// Or if required by framework:
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
