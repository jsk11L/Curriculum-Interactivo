<script setup lang="ts">
import { storeToRefs } from "pinia"

const cvStore = useCvStore()

await cvStore.loadAll()

const { profile, experiences, skills, loading, error } = storeToRefs(cvStore)
</script>

<template>
  <div class="page-grid">
    <HeroSection :profile="profile" />

    <section v-if="loading" class="panel status-panel">
      <p>Loading curriculum data...</p>
    </section>

    <section v-else-if="error" class="panel status-panel error-state">
      <p>{{ error }}</p>
    </section>

    <div v-else class="content-grid">
      <ExperienceTimeline :experiences="experiences" />
      <SkillsChart :skills="skills" />
      <ContactForm />
    </div>
  </div>
</template>
