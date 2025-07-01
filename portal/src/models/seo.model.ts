import { MediaModel } from "./media.model";

export interface SeoModel {
  metaTitle: string;
  metaDescription: string;
  metaImage: MediaModel;
  keywords: string;
  metaRobots: string;
  structuredData: Record<string, unknown>;
  metaViewport: string;
  canonicalURL: string;
}
