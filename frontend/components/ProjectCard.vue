<script setup lang="ts">
import type { ProjectItem } from "~/stores/cvStore"

defineProps<{
  project: ProjectItem
}>()

/**
 * Format a project date string for display.
 * Empty string → "En desarrollo", otherwise locale-formatted date.
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return "TBA"
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  })
}
</script>

<template>
  <NuxtLink :to="`/projects/${project.id}`" class="project-card">
    <div class="project-image">
      <img v-if="project.images.length" :src="project.images[0]" :alt="project.title" />
      <div v-else class="placeholder">
        <span class="placeholder-icon">{ }</span>
        <span>{{ project.title }}</span>
      </div>
    </div>
    <div class="project-content">
      <div class="project-meta">
        <span class="project-date">{{ formatDate(project.created_at) }}</span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.short_description }}</p>
      <div class="project-tech">
        <span v-for="tech in project.technologies.slice(0, 4)" :key="tech" class="tech-badge">
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 4" class="tech-more">
          +{{ project.technologies.length - 4 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  background: rgba(14, 14, 14, 0.5);
  border: 1px solid rgba(42, 42, 42, 0.6);
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    border-color: var(--accent-red);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
    transform: translateY(-4px);
  }
}

.project-image {
  width: 100%;
  height: 200px;
  background: rgba(20, 20, 20, 0.8);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 12px;
    font-family: 'Fira Code', monospace;
  }

  .placeholder-icon {
    font-size: 28px;
    color: var(--accent-red);
    opacity: 0.4;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.project-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-meta {
  display: flex;
  align-items: center;
}

.project-date {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-secondary);
  font-weight: 600;
}

.project-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-red);
  font-family: 'Fira Code', monospace;
}

.project-description {
  margin: 0;
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.6;
  flex-grow: 1;
}

.project-tech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;

  .tech-badge {
    background: transparent;
    color: var(--accent-red);
    border: 1px solid var(--accent-red);
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;
  }

  .tech-more {
    color: var(--text-secondary);
    font-size: 11px;
    padding: 4px 8px;
  }
}
</style>
