/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import Database from "better-sqlite3";
import {drizzle} from "drizzle-orm/better-sqlite3";
import {migrate} from "drizzle-orm/better-sqlite3/migrator";

const env = await import("./src/env.mjs");

export default () => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    reactStrictMode: true,

    /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
  };

  const sqlite = new Database(`${env.env.AIME_PATH}/aime.db`)
  const db = drizzle(sqlite)
  migrate(db, { migrationsFolder: './drizzle' });

  return nextConfig
}
