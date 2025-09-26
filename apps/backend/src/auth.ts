import {betterAuth} from "better-auth"
import {prisma} from "./Singleton"
import {prismaAdapter} from "better-auth/adapters/prisma"

export const auth = betterAuth({
    telemetry: {enabled : false},
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        // autoSignIn: true,
    },
    socialProviders:{
        google: {
            enabled: true,
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            scope: ["profile", "email"]
        }
    }
})