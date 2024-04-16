import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    client: {
        NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_SENDER_ID: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1)
    },
    server: {
        OPENAI_API_KEY: z.string().min(1),
    },
    runtimeEnv: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        // Firebase
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        NEXT_PUBLIC_FIREBASE_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    },
})