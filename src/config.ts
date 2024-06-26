import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;
export const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");
