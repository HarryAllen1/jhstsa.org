import { computed, h } from 'vue';
import { useRoute } from 'vitepress';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

const ratings: Record<string, number> = {
  'Technology-Problem-Solving': 1,
  'Extemporaneous-Speech': 1,
  'Technology-Bowl': 1,
  'Debating-Technological-Issues': 1,
  Cybersecurity: 2,
  'Interior-Design': 2,
  'Promotional-Design': 2,
  'Career-Prep': 2,
  'Artificial-Intelligence': 2,
  'Forensic-Science': 2,
  'Hybrid-Racer-XL': 2,
  Infographic: 2,
  'Audio-Podcasting': 2,
  'Automated-Manufacturing-Systems': 2,
  'Future-Technology-and+Engineering-Teacher': 2,
  'Prepared-Presentation': 2,
  'Structural-Design-and-Engineering': 2,
  'CAD-Engineering': 3,
  'Engineering-Design': 3,
  'On-Demand-Video': 3,
  'Photographic-Technology': 3,
  'STEM-Mass-Media': 3,
  Vlogging: 3,
  'Biotechnology-Design': 3,
  'CAD-Architecture': 3,
  Catapult: 3,
  'Concept-Art': 3,
  'Dragster-Design': 3,
  'Board-Game-Design': 5,
  'Childrens-Stories': 4,
  Robotics: 4,
  'Transportation-Modeling': 4,
  Webmaster: 4,
  Animation: 4,
  'Data-Science-and-Analytics': 4,
  'Silent-Film': 4,
  'Digital-Video-Production': 4,
  Animatronics: 4,
  'Music-Production': 4,
  VR: 5,
  'Architectural-Design': 5,
  'Drone-Challenge': 5,
  'Fashion-Design-and-Technology': 5,
  'Flight-Endurance': 5,
  'Software-Development': 5,
  'Video-Game-Design': 5,
};

const RatingBadge = {
  setup() {
    const route = useRoute();
    const rating = computed(() => {
      const match = route.path.match(/(?:events|wa-events)\/(.+?)(?:\.html)?\/?$/);
      return match ? ratings[match[1]] : undefined;
    });
    return () =>
      rating.value
        ? h('div', { class: 'event-rating-badge', title: 'Club difficulty rating' }, [
            h('span', { class: 'event-rating-label' }, 'Club rating'),
            h('strong', `${rating.value}/5`),
          ])
        : null;
  },
};

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-before': () => h(RatingBadge),
  }),
  enhanceApp() {},
} satisfies Theme;
