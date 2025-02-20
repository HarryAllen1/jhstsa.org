import { readFile } from 'node:fs/promises';
import glob from 'tiny-glob';
import { defineConfig } from 'vitepress';

const waEvents = async () =>
  await Promise.all(
    (await glob('./pages/wa-events/*.md')).map(async (path) => ({
      text: (await readFile(path)).toString().split('\n')[0].slice(2, -18),
      link: path.slice(5, -3),
    })),
  );

const nationalEvents = async () =>
  await Promise.all(
    (await glob('./pages/events/*.md')).map(async (path) => ({
      text: (await readFile(path)).toString().split('\n')[0].slice(2),
      link: path.slice(5, -3),
    })),
  );

export default defineConfig({
  title: 'JHS TSA',
  description: 'Guide for events',
  metaChunk: true,
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-0XL2T54EP5',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0XL2T54EP5');`,
    ],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
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
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Forms',
        link: 'https://lwsd.sharepoint.com/:f:/r/sites/GR-JHS-TechnologyStudentAssociation-SCA/Shared%20Documents/2024-25/Forms',
      },
      {
        text: 'Team Creation',
        link: 'https://teaming.jhstsa.org',
      },
    ],

    sidebar: [
      {
        text: 'Deadlines',
        link: '/deadlines',
        collapsed: false,
        items: [
          {
            text: 'January Feedback',
            link: '/deadlines/january',
          },
          {
            text: 'Early Entry',
            link: '/deadlines/march',
          },
          {
            text: 'State Conference',
            link: '/deadlines/april',
          },
        ],
      },
      {
        text: 'WA Events',
        collapsed: false,
        items: await waEvents(),
      },
      {
        text: 'National Events',
        collapsed: false,
        items: await nationalEvents(),
      },
    ],
  },
});
