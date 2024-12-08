import Redis from "ioredis";
import { serverEnv } from "~/server-env";

export const redis = new Redis(serverEnv.REDIS_REST_URL);
