import { z } from "zod"
import {
  createTRPCRouter,
  publicProcedure,
} from "@rithik/chunitools/server/api/trpc"
import * as fs from "fs"
import { TRPCError } from "@trpc/server"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { env } from "@rithik/chunitools/env.mjs"
import { eq } from "drizzle-orm"
import profile from "@rithik/chunitools/models/profile"
import profilesTable from "@rithik/chunitools/db/schema"

const sqlite = new Database(`${env.AIME_PATH}/aime.db`)

function generateRandomID() {
  const characters = "0123456789"
  let result = ""
  const charactersLength = characters.length

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }

  return result
}

const aimeRouter = createTRPCRouter({
  setCurrentProfile: publicProcedure
    .input(z.string().length(20))
    .mutation(({ input }) => {
      fs.writeFile(`${env.AIME_PATH}/aime.txt`, input, (err) => {
        if (err)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          })
      })
    }),
  addNewProfile: publicProcedure.input(profile).mutation(({ input }) => {
    const db = drizzle(sqlite)

    // generate 20 digit id
    let id = !input.id ? generateRandomID() : input.id

    while (true) {
      // check if id already exists
      const profiles = db
        .select({
          id: profilesTable.id,
        })
        .from(profilesTable)
        .where(eq(profilesTable.id, id))
        .all()
      if (profiles.values.length > 0) id = generateRandomID()
      else break
    }

    db.insert(profilesTable)
      .values({
        id: id,
        name: input.name,
      })
      .run()
  }),
  getProfiles: publicProcedure.query(() => {
    const db = drizzle(sqlite)
    const profiles = db
      .select({
        id: profilesTable.id,
        name: profilesTable.name,
      })
      .from(profilesTable)
      .all()
    return profiles
  }),
  deleteProfile: publicProcedure
    .input(z.string().length(20))
    .mutation(({ input }) => {
      const db = drizzle(sqlite)
      db.delete(profilesTable).where(eq(profilesTable.id, input)).run()
    }),
})

export default aimeRouter
