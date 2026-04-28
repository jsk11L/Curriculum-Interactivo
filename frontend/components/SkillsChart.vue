<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import type { SkillItem } from '~/stores/cvStore'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps<{
  skills: SkillItem[]
}>()

const technicalSkills = computed(() =>
  props.skills.filter((s) => s.category !== 'Habilidades Blandas')
)
const softSkills = computed(() =>
  props.skills.find((s) => s.category === 'Habilidades Blandas')
)

const chartData = computed(() => ({
  labels: technicalSkills.value.map((s) => s.category),
  datasets: [
    {
      label: 'Proficiency',
      data: technicalSkills.value.map((s) => s.proficiency),
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      borderColor: '#dc2626',
      borderWidth: 2,
      pointBackgroundColor: '#dc2626',
      pointBorderColor: '#dc2626',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleColor: '#dc2626',
      bodyColor: '#e5e5e5',
      borderColor: '#333',
      borderWidth: 1,
      titleFont: { family: "'Fira Code', monospace", size: 13 },
      bodyFont: { family: "'Fira Code', monospace", size: 12 },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        color: '#a0a0a0',
        backdropColor: 'transparent',
        font: { family: "'Fira Code', monospace", size: 11 },
      },
      grid: { color: 'rgba(51, 51, 51, 0.6)' },
      angleLines: { color: 'rgba(51, 51, 51, 0.6)' },
      pointLabels: {
        color: '#e5e5e5',
        font: { family: "'Fira Code', monospace", size: 13, weight: '600' as const },
      },
    },
  },
}))

const chartKey = ref(0)
onMounted(() => { chartKey.value++ })
watch(() => props.skills, () => { chartKey.value++ })
</script>

<template>
  <section class="skills-section">
    <div class="skills-header">
      <h2>$ skills --list</h2>
      <p class="section-subtitle">// Tecnologías y herramientas</p>
    </div>

    <!-- Top: Soft skills + Radar chart side by side -->
    <div class="radar-row">
      <div v-if="softSkills" class="soft-skills-panel">
        <h3>// {{ softSkills.category }}</h3>
        <ul>
          <li v-for="item in softSkills.items" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="radar-wrapper">
        <Radar :key="chartKey" :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Bottom: Tag grid (technical only, no soft skills) -->
    <div class="tags-section">
      <h3 class="tags-title">// Tecnologías</h3>
      <div class="tags-container">
        <div v-for="skill in technicalSkills" :key="skill.category" class="tag-group">
          <span class="tag-category">{{ skill.category }}</span>
          <div class="tags-grid">
            <div v-for="item in skill.items" :key="item" class="skill-tag">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills-section {
  padding: 40px 24px;
  background: rgba(12, 12, 12, 0.5);
  border: 1px solid rgba(42, 42, 42, 0.6);
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.skills-header {
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

/* Top row: soft skills (left) + radar (right) */
.radar-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 28px;
  align-items: start;
}

.soft-skills-panel {
  padding: 20px;
  background: rgba(8, 8, 8, 0.6);
  border: 2px solid var(--border-dark);

  h3 {
    margin: 0 0 16px;
    color: var(--accent-red);
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    color: var(--text-primary);
    font-size: 14px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-dark);

    &:last-child { border-bottom: none; }

    &::before {
      content: "→ ";
      color: var(--accent-red);
      font-weight: 700;
    }
  }
}

.radar-wrapper {
  max-width: 460px;
  margin: 0 auto;
  width: 100%;
}

/* Bottom: tag grid */
.tags-section {
  border-top: 2px solid var(--border-dark);
  padding-top: 28px;

  .tags-title {
    margin: 0 0 20px;
    color: var(--accent-red);
    font-size: 14px;
    letter-spacing: 0.5px;
  }
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tag-group {
  .tag-category {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-secondary);
    font-weight: 700;
  }
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.skill-tag {
  padding: 12px 16px;
  border: 2px solid var(--accent-red);
  color: var(--accent-red);
  background-color: transparent;
  text-align: center;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
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

@media (max-width: 900px) {
  .radar-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .skills-section { padding: 24px 16px; }

  .tags-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
  }

  .skill-tag {
    padding: 10px 12px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .tags-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  .skill-tag {
    padding: 8px 10px;
    font-size: 10px;
  }
}
</style>
