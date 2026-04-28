<script setup lang="ts">
import type { ProjectItem } from "~/stores/cvStore"

defineProps<{
  projects: ProjectItem[]
}>()
</script>

<template>
  <section class="projects-grid-section">
    <div class="section-header">
      <h2>Proyectos Destacados</h2>
      <p>Explora los proyectos en los que he trabajado</p>
    </div>
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-grid-section {
  padding: 60px 20px;
  background: #f9f9f9;

  .section-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      margin: 0 0 8px;
      font-size: 32px;
      font-weight: 700;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
