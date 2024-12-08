import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
  clientPrefix: "PUBLIC_",

  client: {
    PUBLIC_FATHOM_SITE_ID: z.string().min(1),
    PUBLIC_STATUS_PAGE_URL: z.string().url().optional(),
    PUBLIC_CONTACT_EMAIL: z.string().email().optional(),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
