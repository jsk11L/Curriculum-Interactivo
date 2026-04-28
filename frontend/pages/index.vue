<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cvStore = useCvStore()
const { profile, experiences, skills, projects, loading, error } = storeToRefs(cvStore)

// useAsyncData handles SSR → CSR hydration properly.
// If SSR fetch fails (e.g. backend not reachable), it retries on the client.
await useAsyncData('cv-data', () => cvStore.loadAll(), {
  server: true,
  lazy: false,
})
</script>

<template>
  <!-- Full-screen loading overlay -->
  <Transition name="loading-fade">
    <div v-if="loading" class="loading-screen">
      <div class="loading-content">
        <span class="loading-title">javier@portfolio:~</span>
        <p class="loading-text">$ cargando curriculum...</p>
        <div class="loading-bar-track">
          <div class="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Page content — only shown after load -->
  <div v-if="!loading" class="home-page">
    <HeroSection :profile="profile" />

    <section v-if="error" class="state-panel error-state">
      <p>$ error: {{ error }}</p>
    </section>

    <template v-else>
      <section class="intro-band">
        <div>
          <p class="eyebrow">Sobre mí</p>
          <h2>Construyo software que veo necesario</h2>
        </div>
        <p>
          Este espacio muestra mi trayectoria, proyectos y habilidades técnicas.
        </p>
      </section>

      <!-- Projects FIRST -->
      <ProjectsGrid :projects="projects" />

      <!-- Then Experience + Skills -->
      <div class="content-grid">
        <ExperienceTimeline :experiences="experiences" />
        <SkillsChart :skills="skills" />
      </div>

      <section v-if="profile" class="contact-preview">
        <div class="contact-copy">
          <p class="eyebrow">Contacto</p>
          <h2>¿Quieres hablar sobre un proyecto?</h2>
          <p>
            Si tienes una idea, proyecto o propuesta, no dudes en contactarme.
            Estoy abierto a colaboraciones y nuevas oportunidades.
          </p>
        </div>

        <div class="contact-actions">
          <div class="contact-item">
            <span class="contact-label">email</span>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">github</span>
            <a :href="String(profile.github_url)" target="_blank" rel="noopener">{{ String(profile.github_url).replace('https://', '') }}</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">linkedin</span>
            <a :href="String(profile.linkedin_url)" target="_blank" rel="noopener">{{ String(profile.linkedin_url).replace('https://www.', '') }}</a>
          </div>
          <NuxtLink to="/contact" class="contact-button">$ contacto --nuevo</NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="scss">
/* Loading screen */
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #050505;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 320px;
}

.loading-title {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.loading-text {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  color: var(--accent-red);
  letter-spacing: 0.5px;
}

.loading-bar-track {
  width: 100%;
  height: 4px;
  background: var(--border-dark);
  overflow: hidden;
}

.loading-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #7f1d1d, #dc2626, #ef4444);
  animation: loading-progress 2s ease-in-out infinite;
}

@keyframes loading-progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 60%;
    margin-left: 20%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}

.loading-fade-leave-active {
  transition: opacity 0.4s ease;
}

.loading-fade-leave-to {
  opacity: 0;
}

/* Page content */
.home-page {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 48px 0 96px;
}

.state-panel {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 28px;
  background: rgba(14, 14, 14, 0.6);
  border: 1px solid var(--border-dark);
  font-family: 'Fira Code', monospace;
  color: var(--text-secondary);
}

.error-state {
  color: #ef4444;
  border-color: #ef4444;
}

.intro-band,
.contact-preview {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: 28px;
  padding: 40px;
  background: rgba(14, 14, 14, 0.4);
  border: 1px solid rgba(42, 42, 42, 0.6);
}

.intro-band {
  grid-template-columns: 1.2fr 1fr;
  align-items: end;
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-red);
}

.intro-band h2,
.contact-copy h2 {
  margin: 0;
  font-size: clamp(28px, 3.5vw, 44px);
  line-height: 1.15;
  color: var(--text-primary);
}

.intro-band p,
.contact-copy p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.content-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.contact-preview {
  grid-template-columns: 1.2fr 0.8fr;
  align-items: start;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(42, 42, 42, 0.6);
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-dark);

  &:last-of-type {
    padding-bottom: 0;
    border-bottom: none;
  }

  .contact-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--accent-red);
    font-weight: 700;
  }

  a {
    font-size: 14px;
    color: var(--text-primary);
    text-decoration: none;
    word-break: break-all;
    transition: color 0.3s ease;

    &:hover { color: var(--accent-red); }
  }
}

.contact-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  padding: 16px 28px;
  background: transparent;
  color: var(--accent-red);
  border: 2px solid var(--accent-red);
  text-decoration: none;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
  }
}

@media (max-width: 900px) {
  .intro-band,
  .contact-preview,
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-page {
    gap: 32px;
    padding: 32px 0 64px;
  }

  .intro-band,
  .contact-preview {
    padding: 24px;
  }

  .loading-content {
    width: 240px;
  }
}

@media (max-width: 480px) {
  .intro-band,
  .contact-preview {
    padding: 16px;
  }

  .contact-actions {
    padding: 16px;
  }

  .loading-content {
    width: 200px;
  }
}
</style>
