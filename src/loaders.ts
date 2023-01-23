import { promises as fs } from 'fs';
import { parse } from 'yaml';
import { FeedOptions, ItemOptions, Podcast } from 'podcast';
import { z } from 'zod';
import { episodeSchema, podcastSchema } from './schemas.js';

export const loadPodcast = async (): Promise<Podcast> => {
  const podcastYml = await fs.readFile('./podcast/podcast.yml', 'utf-8');
  if (!podcastYml) {
    throw new Error('Could not find podcast.yml file. Check if it exists.');
  }

  const podcastJson: FeedOptions = parse(podcastYml);
  if (!podcastJson) {
    throw new Error(
      'Could not parse podcast.yml file. Check if it is valid yml.'
    );
  }

  const zodSchemaResult = podcastSchema.safeParse(podcastJson);
  if (!zodSchemaResult.success) {
    console.log(JSON.stringify(podcastJson.itunesCategory));
    throw new Error(
      `Invalid podcast.yml file schema. Error message: ${zodSchemaResult.error}`
    );
  }

  const podcast: FeedOptions = {
    itunesImage: podcastJson.imageUrl,
    itunesAuthor: podcastJson.author,
    ...podcastJson,
  };

  return new Podcast(podcast);
};

export const loadEpisode = async (
  episodeFile: string
): Promise<ItemOptions> => {
  console.log(episodeFile);

  const episodeYml = await fs.readFile(episodeFile, 'utf-8');
  if (!episodeYml) {
    throw new Error('Could not find episode.yml file. Check if it exists.');
  }
  const episodeJson: ItemOptions = parse(episodeYml);
  if (!episodeJson) {
    throw new Error(
      'Could not parse episode.yml file. Check if it is valid yml.'
    );
  }

  const zodSchemaResult = episodeSchema.safeParse(episodeJson);
  if (!zodSchemaResult.success) {
    throw new Error(
      `Invalid podcast.yml file schema. Error message: ${zodSchemaResult.error}`
    );
  }
  return episodeJson;
};
