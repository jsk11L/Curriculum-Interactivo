<script setup lang="ts">
import { Github, Linkedin, Mail, Sparkles } from "lucide-vue-next"
import Button from "primevue/button"

import type { PersonalInfo } from "~/stores/cvStore"

defineProps<{
  profile: PersonalInfo | null
}>()
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow"><Sparkles :size="16" /> Interactive Curriculum</p>
      <h1>{{ profile?.name ?? "Your Name" }}</h1>
      <h2>{{ profile?.title ?? "Full Stack Engineer" }}</h2>
      <p class="summary">
        {{ profile?.summary ?? "A focused summary of your background, product mindset, and technical strengths." }}
      </p>
      <div class="hero-actions">
        <Button as="a" :href="profile?.github_url ?? '#'" target="_blank" rel="noreferrer" label="GitHub" />
        <Button as="a" :href="profile?.linkedin_url ?? '#'" target="_blank" rel="noreferrer" label="LinkedIn" severity="secondary" />
        <Button as="a" :href="`mailto:${profile?.email ?? 'hello@example.com'}`" label="Email" outlined />
      </div>
    </div>

    <aside class="hero-panel">
      <div class="contact-line">
        <Github :size="18" />
        <span>{{ profile?.github_url ?? "github.com/your-handle" }}</span>
      </div>
      <div class="contact-line">
        <Linkedin :size="18" />
        <span>{{ profile?.linkedin_url ?? "linkedin.com/in/your-handle" }}</span>
      </div>
      <div class="contact-line">
        <Mail :size="18" />
        <span>{{ profile?.email ?? "hello@example.com" }}</span>
      </div>
    </aside>
  </section>
</template>
