import type { MetadataRoute } from "next";

const base = "https://hafizhamdani.vercel.app";
const paths = ["", "/quality", "/architecture", "/sample-work", "/strategy", "/break-this-app"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: base + p, lastModified: new Date() }));
}
