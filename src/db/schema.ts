import { sqliteTable, text } from "drizzle-orm/sqlite-core"

const profilesTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
})

export default profilesTable
