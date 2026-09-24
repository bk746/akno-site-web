import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "AKNO — Sites qui convertissent";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function TwitterImage() {
  return renderOgImage();
}
