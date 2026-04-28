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
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  .project-image {
    width: 100%;
    height: 200px;
    background: #f0f0f0;
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
      color: #999;
      font-size: 14px;
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
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .project-description {
      margin: 0;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      .tech-badge {
        background: #e8f0fe;
        color: #1967d2;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      }

      .tech-more {
        color: #666;
        font-size: 12px;
        padding: 4px 8px;
      }
    }
  }
}
</style>
