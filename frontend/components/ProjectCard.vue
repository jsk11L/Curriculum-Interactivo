<script setup lang="ts">
import type { ProjectItem } from "~/stores/cvStore"

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <NuxtLink :to="`/projects/${project.id}`" class="project-card">
    <div class="project-image">
      <img v-if="project.images.length" :src="project.images[0]" :alt="project.title" />
      <div v-else class="placeholder">No image</div>
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.short_description }}</p>
      <div class="project-tech">
        <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-badge">
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 3" class="tech-more">
          +{{ project.technologies.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border: 2px solid var(--border-dark);
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    border-color: var(--accent-red);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
    transform: translateY(-4px);
  }

  .project-image {
    width: 100%;
    height: 200px;
    background: var(--border-dark);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-secondary);
      font-size: 12px;
      font-family: 'Fira Code', monospace;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .project-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .project-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--accent-red);
      font-family: 'Fira Code', monospace;
    }

    .project-description {
      margin: 0;
      font-size: 13px;
      color: var(--text-primary);
      line-height: 1.5;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .tech-badge {
        background: transparent;
        color: var(--accent-red);
        border: 1px solid var(--accent-red);
        padding: 4px 8px;
        border-radius: 0;
        font-size: 11px;
        font-weight: 600;
        font-family: 'Fira Code', monospace;
      }

      .tech-more {
        color: var(--text-secondary);
        font-size: 11px;
        padding: 4px 8px;
      }
    }
  }
}
</style>
