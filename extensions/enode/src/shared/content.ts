import type { Context, Json, Values } from "quinecms/core/types";
export const text = (value: unknown) =>
  typeof value === "string" ? value : "";
export const rows = (value: unknown): Values[] =>
  Array.isArray(value)
    ? value.filter(
        (v): v is Values => !!v && typeof v === "object" && !Array.isArray(v),
      )
    : [];
export function url(value: unknown) {
  const result = text(value).trim();
  return /^(\/|#|https?:\/\/|mailto:)/i.test(result) && !result.startsWith("//")
    ? result
    : "#";
}
export function media(value: Json | undefined, context: Context) {
  const id =
    value && typeof value === "object" && !Array.isArray(value)
      ? text(value.mediaId)
      : "";
  return context.media.find((item) => item.id === id)?.original;
}
