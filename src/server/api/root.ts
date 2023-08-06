import { aimeRouter } from "@rithik/chunitools/server/api/routers/aime"
import { createTRPCRouter } from "@rithik/chunitools/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aime: aimeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
