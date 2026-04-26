<script setup lang="ts">
import Timeline from "primevue/timeline"

import type { ExperienceItem } from "~/stores/cvStore"

defineProps<{
  experiences: ExperienceItem[]
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <h3>Experience</h3>
      <p>Selected roles and the stack behind them.</p>
    </div>

    <Timeline :value="experiences" align="alternate" class="experience-timeline">
      <template #content="slotProps">
        <article class="experience-card">
          <p class="experience-dates">{{ slotProps.item.start_date }} - {{ slotProps.item.end_date }}</p>
          <h4>{{ slotProps.item.position }}</h4>
          <p class="company">{{ slotProps.item.company }}</p>
          <ul>
            <li v-for="item in slotProps.item.description" :key="item">{{ item }}</li>
          </ul>
          <div class="tech-list">
            <span v-for="tech in slotProps.item.technologies" :key="tech">{{ tech }}</span>
          </div>
        </article>
      </template>
    </Timeline>
  </section>
</template>
