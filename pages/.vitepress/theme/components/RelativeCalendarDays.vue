<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const now = ref(new Date());
let refreshTimer: number | undefined;

function nextWeekday(weekday: number) {
  const date = new Date(now.value);
  date.setHours(0, 0, 0, 0);

  let daysUntil = (weekday - date.getDay() + 7) % 7;
  if (daysUntil === 0) daysUntil = 7;
  date.setDate(date.getDate() + daysUntil);
  return date;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

const upcomingDays = computed(() => [
  { label: 'Next Thursday', date: formatDate(nextWeekday(4)) },
  { label: 'Next Friday', date: formatDate(nextWeekday(5)) },
]);

onMounted(() => {
  refreshTimer = window.setInterval(
    () => {
      now.value = new Date();
    },
    60 * 60 * 1000,
  );
});

onBeforeUnmount(() => {
  if (refreshTimer) window.clearInterval(refreshTimer);
});
</script>

<template>
  <section class="relative-calendar-days" aria-label="Upcoming calendar days">
    <p>Plan for</p>
    <dl>
      <div v-for="day in upcomingDays" :key="day.label">
        <dt>{{ day.label }}</dt>
        <dd>{{ day.date }}</dd>
      </div>
    </dl>
    <a
      class="calendar-subscribe"
      href="https://calendar.google.com/calendar/u/0?cid=NTMwNTc2OWRjNGM2NTA1MzYzZjg3NDYzYWNkNDZlNDc4MWJlNTE5NGJlZTNjZjQwNjYwYzk2ZWYwOGMyZGNmZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
      target="_blank"
      rel="noreferrer"
      >Add to Google Calendar <span aria-hidden="true">↗</span></a
    >
  </section>
</template>
