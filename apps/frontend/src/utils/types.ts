import {z} from 'zod'

export const UserSchema = z.object({
    username: z.string(),
    email: z.string(),
    avatar: z.string(),
    name: z.string(),
    rating: z.number(),
    wins: z.number()
})

export type User = z.infer<typeof UserSchema>

export const Game = z.object({
    id: z.string(),
    white: z.string(),
    black: z.string(),
    winner: z.string(),
    timeControl: z.string(),
    ratingRange: z.string(),
    gameType: z.string(),
    fen: z.string(),
    moves: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Game = z.infer<typeof Game>