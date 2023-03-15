import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Jabber from "./classes/Jabber";

export const colors = ["blue", "red", "amber", "green", "rose", "sky"];
export const uploader_key: string = process.env.UPLOADER_API_KEY as string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomColor(node: "text" | "background") {
  const random = colors[Math.floor(colors.length * Math.random())];
  if (node === "text") {
    return `text-${random}-500`;
  } else {
    return `bg-${random}-500`;
  }
}

export function cutText(text: string, max = 10) {
  return text.length >= max ? text.substring(0, max) + "..." : text;
}

export function beautifyErrors(error: string) {
  const errors: Record<string, string> = {
    UNAUTHORIZED: "You are not logged in!",
  };

  return errors[error] ?? error;
}

export async function sendDiscordWebhook(
  id: string,
  token: string,
  content: string
) {
  await fetch(`https://discord.com/api/v10/webhooks/${id}/${token}?wait=true`, {
    method: "POST",
    body: JSON.stringify({
      content,
      embeds: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const jabber = new Jabber();
