import {z} from "zod";

export const ServerMessageSchema = z.object({
    type: z.string(),
    payload: z.any(),
    message: z.string(),
});

export type ServerMessage = z.infer<typeof ServerMessageSchema>;