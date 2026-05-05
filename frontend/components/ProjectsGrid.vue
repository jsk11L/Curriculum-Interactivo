<script setup lang="ts">
import type { ProjectItem } from '~/stores/cvStore'

const { copy } = usePortfolioCopy()

defineProps<{
  projects: ProjectItem[]
}>()
</script>

<template>
  <section class="projects-section">
    <div class="section-header">
      <h2>{{ copy.ui.projectsTitle }}</h2>
      <p class="section-subtitle">{{ copy.ui.projectsSubtitle }}</p>
    </div>
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-section {
  padding: 48px 0;
}

.section-header {
  margin-bottom: 32px;

  h2 {
    margin: 0 0 8px;
    color: var(--accent-red);
    font-size: 1.6rem;
    letter-spacing: 1px;
  }

  .section-subtitle {
    margin: 0;
    color: var(--text-secondary);
    font-size: 13px;
    letter-spacing: 0.5px;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
