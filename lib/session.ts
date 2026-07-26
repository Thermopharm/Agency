import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "thermopharm_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-at-least-32-chars-long";

// Encrypt payload
function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

// Decrypt payload
function decrypt(text: string) {
  try {
    const [ivHex, encryptedHex] = text.split(":");
    if (!ivHex || !encryptedHex) return null;
    const iv = Buffer.from(ivHex, "hex");
    const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    return null;
  }
}

export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: string;
}

export async function createSession(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const payload: SessionPayload = { userId, email, expiresAt };
  const encrypted = encrypt(JSON.stringify(payload));

  cookies().set(SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) return null;

  const decrypted = decrypt(sessionCookie.value);
  if (!decrypted) return null;

  try {
    const payload = JSON.parse(decrypted) as SessionPayload;
    if (new Date(payload.expiresAt) < new Date()) {
      await deleteSession();
      return null;
    }
    return payload;
  } catch (e) {
    return null;
  }
}

export const getAdminSession = getSession;

export async function deleteSession() {
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
}
