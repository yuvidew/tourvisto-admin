import { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";

export const authenticate : MiddlewareHandler = async (c , next) => {
    const authHeader = c.req.header("authorization");

    if (!authHeader) {
        return c.json(
            {
                message: "Authentication error. Token required.",
            },
            401
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
            algorithms: ["HS256"],
        });

        // save decoded payload to context for later use
        c.set("user", decoded);

        await next(); // proceed to next handler
    } catch (error) {
        console.log("error from the authentication" , error);
        return c.json(
            {
                code: 403,
                message: "Authentication error. Invalid or expired token.",
            },
            403
        );
    }
}