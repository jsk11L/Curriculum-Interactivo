<script setup lang="ts">
import { computed } from "vue"
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Title, Tooltip } from "chart.js"
import { Radar } from "vue-chartjs"

import type { SkillItem } from "~/stores/cvStore"

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

const props = defineProps<{
  skills: SkillItem[]
}>()

const chartData = computed(() => ({
  labels: props.skills.map((skill) => skill.category),
  datasets: [
    {
      label: "Proficiency",
      data: props.skills.map((skill) => skill.proficiency),
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      borderColor: "rgba(34, 197, 94, 0.95)",
      pointBackgroundColor: "rgba(34, 197, 94, 0.95)",
      pointBorderColor: "#ffffff",
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: "rgba(34, 197, 94, 0.95)",
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#d7e0ea",
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        color: "#97a6ba",
      },
      grid: {
        color: "rgba(148, 163, 184, 0.2)",
      },
      angleLines: {
        color: "rgba(148, 163, 184, 0.2)",
      },
      pointLabels: {
        color: "#eef3f8",
      },
    },
  },
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <h3>Skills</h3>
      <p>Radar overview of the main areas of focus.</p>
    </div>

    <div class="chart-shell">
      <ClientOnly>
        <Radar v-if="skills.length" :data="chartData" :options="chartOptions" />
        <p v-else class="empty-state">No skills data available yet.</p>
      </ClientOnly>
    </div>

    <div class="skill-groups">
      <article v-for="skill in skills" :key="skill.category" class="skill-card">
        <h4>{{ skill.category }}</h4>
        <p>{{ skill.items.join(' • ') }}</p>
      </article>
    </div>
  </section>
</template>
