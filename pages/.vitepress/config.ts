/// <reference types="vite/client" />

import glob from 'tiny-glob';
import { defineConfig } from 'vitepress';
import { readFile } from 'node:fs/promises';

export default defineConfig({
  title: 'JHS TSA',
  description: 'Guide for events',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/HarryAllen1/jhstsa.org',
      },
    ],
    editLink: {
      pattern:
        'https://github.com/HarryAllen1/jhstsa.org/edit/main/pages/:path',
      text: 'Edit this page on GitHub',
    },
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Forms',
        link: 'https://lwsd.sharepoint.com/:f:/r/sites/GR-JHS-TechnologyStudentAssociation-SCA/Shared%20Documents/23-24/Competition/Forms?csf=1&web=1&e=T7xSdI',
      },
      { text: 'Team Creation', link: 'https://grouping.jhstsa.org' },
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
