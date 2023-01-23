import { z } from 'zod';

export const podcastSchema = z.object({
  title: z.string(),
  description: z.optional(z.string()),
  generator: z.optional(z.string()),
  feedUrl: z.string(),
  siteUrl: z.string(),
  imageUrl: z.optional(z.string()),
  docs: z.optional(z.string()),
  author: z.string(),
  managingEditor: z.optional(z.string()),
  webMaster: z.optional(z.string()),
  copyright: z.optional(z.string()),
  language: z.optional(z.string()),
  categories: z.optional(z.array(z.string())),
  pubDate: z.optional(z.union([z.date(), z.string()])),
  ttl: z.optional(z.number()),
  itunesAuthor: z.optional(z.string()),
  itunesSubtitle: z.optional(z.string()),
  itunesSummary: z.optional(z.string()),
  itunesOwner: z.optional(
    z.object({
      name: z.string(),
      email: z.string(),
    })
  ),
  itunesExplicit: z.optional(z.boolean()),
  itunesCategory: z.array(
    z.object({
      text: z.string(),
      subcats: z.array(z.object({ text: z.string() })),
    })
  ),
  itunesImage: z.optional(z.string()),
  itunesType: z.enum(['serial', 'episodic']),
});

export const episodeSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string(),
  guid: z.string(),
  categories: z.optional(z.array(z.string())),
  author: z.optional(z.string()),
  date: z.union([z.date(), z.string()]),
  lat: z.optional(z.number()),
  long: z.optional(z.number()),
  enclosure: z.optional(
    z.object({
      url: z.string(),
      file: z.optional(z.string()),
      size: z.optional(z.number()),
      type: z.optional(z.string()),
    })
  ),
  content: z.optional(z.string()),
  itunesAuthor: z.optional(z.string()),
  itunesExplicit: z.optional(z.boolean()),
  itunesSubtitle: z.optional(z.string()),
  itunesSummary: z.optional(z.string()),
  itunesDuration: z.optional(z.number()),
  itunesImage: z.optional(z.string()),
  itunesSeason: z.optional(z.number()),
  itunesEpisode: z.optional(z.number()),
  itunesTitle: z.optional(z.string()),
  itunesEpisodeType: z.optional(z.enum(['full', 'trailer', 'bonus'])),
  itunesNewFeedUrl: z.optional(z.string()),
  customElements: z.optional(z.array(z.string())),
});
