import { connectDB, getDB } from "@/app/features/db/getDB";
import { Hono } from "hono";
import { signInValidator, signUpValidator } from "../validator";
import bcrypt from "bcryptjs";
import { ExistingUserType } from "../type";
import jwt from "jsonwebtoken";


const app = new Hono()
    .post("/sign-up", async (c) => {
        // console.log("calling the sign up api");

        await connectDB()
        const db = getDB()

        const body = await c.req.json();
        const parsed = signUpValidator.safeParse(body);

        if (!parsed.success) {
            return c.json(
                {
                    success: false,
                    error: parsed.error
                },
                400
            )
        }

        const { username, email, password } = parsed.data;

        try {
            const [existing] = await db.query("SELECT * FROM admin_users WHERE email = ?", [email]);

            // console.log("the existing error" , existing);

            if ((existing as ExistingUserType[]).length > 0) {
                return c.json(
                    {
                        success: false,
                        message: "User already exists"
                    },
                    409
                )
            }

            const hashPassword = await bcrypt.hash(password, 10);

            await db.query(
                "INSERT INTO admin_users (username, email, password, role) VALUES (?, ?, ?, ?)",
                [username, email, hashPassword, "admin"]
            );

            return c.json(
                {
                    success: true,
                    message: "Sign up successfully",
                    user: {
                        username,
                        email
                    }
                },
                200
            );
        } catch (error) {
            console.log("Error form the sign up : ", error);
            return c.json(
                {
                    code: 400,
                    success: false,
                    message: "Something went wrong. Please check the email and password.",
                    error: "Something went wrong. Please check the email and password."
                },
                400
            );
        }
    })
    .post("/sign-in", async (c) => {
        await connectDB();
        const db = getDB();

        const body = await c.req.json();
        const parsed = signInValidator.safeParse(body);


        if (!parsed.success) {
            return c.json(
                {
                    success: false,
                    error: parsed.error
                },
                400
            )
        }

        const { email, password } = parsed.data;

        try {
            const [users] = await db.query("SELECT * FROM admin_users WHERE email = ?", [email]);

            if ((users as ExistingUserType[]).length === 0) {
                return c.json(
                    {
                        success: false,
                        message: "User already exists"
                    },
                    409
                )
            }

            const user = (users as ExistingUserType[])[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return c.json(
                    {
                        success: false,
                        message: "Invalid email or password."
                    },
                    401
                )
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.username
                },
                process.env.JWT_SECRET!
            )

            return c.json(
                {
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.username
                    },

                },
                200
            )
        } catch (error) {
            console.log("Error form the sign in : ", error);

            return c.json(
                {
                    success : false,
                    massage : "Server error"
                },
                500
            )
        }
    })

export default app