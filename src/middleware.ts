import { defineMiddleware } from "astro:middleware";
import { z } from "zod";
import { redis } from "~/impl";
import { serverEnv } from "~/server-env";

export const onRequest = defineMiddleware(async (_context, next) => {
  const config = await redis.hgetall(serverEnv.REDIS_MAINTENANCE_CONFIG_KEY);

  const { enabled, redirectUrl } = z
    .object({
      enabled: z
        .enum(["true", "false"])
        .transform((val) => val === "true")
        .optional(),
      redirectUrl: z.string().url(),
    })
    .parse(config);

  if (!enabled) {
    // If maintenance mode is not enabled, redirect to the original URL.
    return Response.redirect(redirectUrl, 302);
  }

  return next();
});
