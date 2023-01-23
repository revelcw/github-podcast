import { FeedOptions, ItemOptions, Podcast } from 'podcast';
import { promises as fs, stat } from 'fs';
import { parse } from 'yaml';
import glob from 'glob';
import { loadEpisode, loadPodcast } from './loaders.js';

import { podcastSchema, episodeSchema } from './schemas';

const feed = await loadPodcast();

const episodeFiles = glob.sync('./podcast/episodes/*/episode.yml');

for (const episodeFile of episodeFiles) {
  const episodeData = await loadEpisode(episodeFile);

  try {
    await fs.stat(
      `./podcast/episodes/${episodeFile.split('/')[3]}/episode.m4a`
    );
  } catch {
    throw new Error(
      `Could not find episode.m4a file for episode ${episodeFile.split('/')[3]}`
    );
  }

  // throw new Error(
  //   `Could not find episode.m4a file for episode ${episodeFile.split('/')[3]}`
  // );

  feed.addItem({
    enclosure: {
      url: `https://raw.githubusercontent.com/revelcw/github-podcast/main/podcast/episodes/${
        episodeFile.split('/')[3]
      }/episode.m4a`,
    },
    ...episodeData,
  });
}

console.log(feed.buildXml());

fs.writeFile('./podcast/feed.xml', feed.buildXml());
