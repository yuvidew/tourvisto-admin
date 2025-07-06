import { Hono } from "hono";
import { authenticate } from "../middleware/authenticate";
import { connectDB, getDB } from "../../db/getDB";
import { createTripValidator } from "../validator";
import type { OkPacket } from "mysql2";
import { TripsType } from "../types";

const app = new Hono()
    /**
     * @route POST /create-trip
     * @description Creates a new trip
     * @access Private
     * @middleware authenticate
     * @body userId, country, duration, group_type, travel_style, interests, budget_estimate, images, result
     */
    .post("/create-trip", authenticate, async (c) => {
        await connectDB();
        const db = getDB();

        const body = await c.req.json();
        const parsed = createTripValidator.safeParse(body);

        if (!parsed.success) {
            return c.json(
                {
                    success: false,
                    error: parsed.error,
                },
                400
            );
        }

        const {
            userId,
            country,
            duration,
            group_type,
            travel_style,
            interests,
            budget_estimate,
            images,
            result,
        } = parsed.data;

        try {
            const [row] = await db.query(
                "INSERT INTO trips (userId , country , duration , group_type , travel_style , interests , budget_estimate , images , result) VALUES ( ?,?,?,?,?,?,?,?,?)",
                [
                    userId,
                    country,
                    duration,
                    group_type,
                    travel_style,
                    interests,
                    budget_estimate,
                    images,
                    result,
                ]
            );

            console.log("the row ", row);

            const ok = row as OkPacket;

            if (ok.affectedRows === 0) {
                return c.json(
                    {
                        success: false,
                        message: "Failed to create trip. Please try again.",
                    },
                    400
                );
            }

            return c.json(
                {
                    success: true,
                    message: "Trip created successfully.",
                    tripId: ok.insertId,
                },
                201
            );
        } catch (error) {
            console.error("Error creating trip:", error);

            return c.json(
                {
                    success: false,
                    message: "Something went wrong while creating the trip.",
                    error: "Something went wrong while creating the trip.",
                },
                500
            );
        }
    })
    /**
     * @route GET /get-all-trips
     * @description Fetches all trips
     * @access Private
     * @middleware authenticate
     */
    .get("/get-all-trips", authenticate, async (c) => {
        await connectDB();
        const db = getDB();

        try {
            const [trips] = await db.query("SELECT * FROM trips");
            // const ok = trips as OkPacket;

            if ((trips as TripsType[]).length === 0) {
                return c.json(
                    {
                        success: false,
                        message: "No trips found",
                    },
                    404
                );
            }

            return c.json({
                success: true,
                trips,
            });
        } catch (error) {
            console.error("Error creating trip:", error);
            return c.json(
                {
                    message: "Something went wrong while fetching trips.",
                    error: "Something went wrong while fetching trips.",
                },
                500
            );
        }
    })
    /**
     * @route GET /get-trip-by-id/:id
     * @description Fetches a trip by ID
     * @access Private
     * @middleware authenticate
     * @param {string} id - Trip ID to fetch
     */
    .get("/get-trip-by-id/:id", authenticate, async (c) => {
        await connectDB();
        const db = getDB();

        // console.log(" calling the get trips by id api");

        const tripId = c.req.param("id");

        // console.log("the trips id" , tripId);

        try {
            const [trip] = await db.query("SELECT * FROM trips WHERE id = ?", [
                tripId,
            ]);

            if ((trip as TripsType[]).length === 0) {
                return c.json(
                    {
                        success: false,
                        message: "No trips found",
                    },
                    404
                );
            }

            return c.json(
                {
                    success: true,
                    trip,
                },
                200
            );
        } catch (error) {
            console.log("Error from the get trip by id", error);
            return c.json({
                message: "Something went wrong while fetching the trip.",
                error: "Something went wrong while fetching the trip.",
            });
        }
    })
    /**
     * @route DELETE /delete-trip-by-id/:id
     * @description Deletes a trip by ID
     * @access Private
     * @middleware authenticate
     * @param {string} id - Trip ID to delete
     */
    .delete("/delete-trip-by-id/:id", authenticate, async (c) => {
        await connectDB();
        const db = getDB();

        console.log("calling the api ");

        const tripId = c.req.param("id");

        console.log("the id", tripId);

        try {
            if (!tripId) {
                return c.json(
                    {
                        success: false,
                        message: "Trip id is required!",
                    },
                    404
                );
            }

            const [trip] = await db.query("DELETE FROM trips WHERE id = ?", [tripId]);

            if ((trip as TripsType[]).length === 0) {
                return c.json(
                    {
                        success: false,
                        message: "No trips found",
                    },
                    404
                );
            }

            return c.json(
                {
                    success: true,
                    message: "Trip is deleted successfully",
                },
                200
            );
        } catch (error) {
            console.log("error from delete trip", error);
            return c.json(
                {
                    message: "Something went wrong while delete the trip.",
                    error: "Something went wrong while delete the trip.",
                },
                500
            );
        }
    });

export default app;
