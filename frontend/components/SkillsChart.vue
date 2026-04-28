<script setup lang="ts">
import type { SkillItem } from "~/stores/cvStore"

defineProps<{
  skills: SkillItem[]
}>()

// Flat list of technologies to display
const technologies = [
  'React',
  'Vue 3',
  'Nuxt 3',
  'Angular',
  'Next.js',
  'React Native',
  'Go',
  'Python (FastAPI)',
  'Node.js (NestJS)',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Docker',
  'TypeScript',
  'TailwindCSS'
]
</script>

<template>
  <section class="skills-section">
    <h2>$ skills --list</h2>
    <p class="section-subtitle">// Tecnologías y herramientas dominadas</p>

    <div class="skills-grid">
      <div v-for="tech in technologies" :key="tech" class="skill-tag">
        {{ tech }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills-section {
  padding: 40px 0;
  border-top: 2px solid var(--border-dark);
}

h2 {
  margin: 0 0 8px;
  color: var(--accent-red);
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.section-subtitle {
  margin: 0 0 32px;
  color: var(--text-secondary);
  font-size: 12px;
  letter-spacing: 0.5px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.skill-tag {
  padding: 12px 16px;
  border: 2px solid var(--accent-red);
  color: var(--accent-red);
  background-color: transparent;
  text-align: center;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background-color: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .skill-tag {
    padding: 10px 12px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }

  .skill-tag {
    padding: 8px 10px;
    font-size: 10px;
  }
}
</style>
