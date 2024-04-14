/// <reference types="vite/client" />

import glob from 'tiny-glob';
import { defineConfig } from 'vitepress';
import { readFile } from 'node:fs/promises';

export default defineConfig({
  title: 'JHS TSA',
  description: 'Guide for events',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Events', link: '/events/' },
    ],

    sidebar: [
      {
        text: 'WA Only Events',
        items: await Promise.all(
          (await glob('./pages/wa-events/*.md')).map(async (path) => ({
            text: (await readFile(path))
              .toString()
              .split('\n')[0]
              .slice(2, -18),
            link: path.slice(6),
          })),
        ),
      },
      {
        text: 'National Events',
        items: await Promise.all(
          (await glob('./pages/events/*.md')).map(async (path) => ({
            text: (await readFile(path)).toString().split('\n')[0].slice(2),
            link: path.slice(6),
          })),
        ),
      },
    ],
  },
});
