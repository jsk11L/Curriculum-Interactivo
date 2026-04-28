<script setup lang="ts">
import type { ExperienceItem } from '~/stores/cvStore'

defineProps<{
  experiences: ExperienceItem[]
}>()
</script>

<template>
  <section class="experience-section">
    <h2>$ experience --timeline</h2>
    <p class="section-subtitle">// Trayectoria profesional y académica</p>

    <div class="timeline">
      <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
        <div class="timeline-marker">
          <span class="marker-dot"></span>
          <span class="marker-line"></span>
        </div>

        <article class="experience-card">
          <div class="card-header">
            <span class="dates">{{ exp.start_date }} → {{ exp.end_date }}</span>
            <h3 class="position">{{ exp.position }}</h3>
            <p class="company">@ {{ exp.company }}</p>
          </div>

          <ul class="description-list">
            <li v-for="item in exp.description" :key="item">{{ item }}</li>
          </ul>

          <div class="tech-list">
            <span v-for="tech in exp.technologies" :key="tech" class="tech-badge">
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-section {
  padding: 40px 24px;
  background: rgba(12, 12, 12, 0.5);
  border: 1px solid rgba(42, 42, 42, 0.6);
}

h2 {
  margin: 0 0 8px;
  color: var(--accent-red);
  font-size: 1.6rem;
  letter-spacing: 1px;
}

.section-subtitle {
  margin: 0 0 32px;
  color: var(--text-secondary);
  font-size: 13px;
  letter-spacing: 0.5px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: flex;
  gap: 20px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;

  .marker-dot {
    width: 12px;
    height: 12px;
    background: var(--accent-red);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
    flex-shrink: 0;
    margin-top: 6px;
  }

  .marker-line {
    width: 2px;
    flex: 1;
    background: var(--border-dark);
    min-height: 20px;
  }
}

.timeline-item:last-child .marker-line {
  display: none;
}

.experience-card {
  flex: 1;
  padding: 20px;
  margin-bottom: 24px;
  background: rgba(8, 8, 8, 0.6);
  border: 1px solid var(--border-dark);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--accent-red);
  }
}

.card-header {
  margin-bottom: 16px;
}

.dates {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--accent-red);
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.position {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.company {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
}

.description-list {
  margin: 0 0 16px;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 6px 0 6px 20px;
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.6;

    &::before {
      content: "→";
      position: absolute;
      left: 0;
      color: var(--accent-red);
      font-weight: 700;
    }
  }
}

.tech-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tech-badge {
  background: transparent;
  color: var(--accent-red);
  border: 1px solid var(--accent-red);
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  font-family: 'Fira Code', monospace;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .experience-section { padding: 24px 16px; }

  .position { font-size: 16px; }

  .description-list li { font-size: 13px; }

  .experience-card { padding: 16px; }
}

@media (max-width: 480px) {
  .timeline-marker { width: 16px; }

  .timeline-marker .marker-dot {
    width: 10px;
    height: 10px;
  }

  .experience-card {
    padding: 12px;
    margin-bottom: 16px;
  }
}
</style>
