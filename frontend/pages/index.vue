<script setup lang="ts">
import { storeToRefs } from "pinia"

const cvStore = useCvStore()

await cvStore.loadAll()

const { profile, experiences, skills, projects, loading, error } = storeToRefs(cvStore)
</script>

<template>
  <div class="home-page">
    <HeroSection :profile="profile" />

    <section v-if="loading" class="state-panel">
      <p>Cargando información del currículum...</p>
    </section>

    <section v-else-if="error" class="state-panel error-state">
      <p>{{ error }}</p>
    </section>

    <template v-else>
      <section class="intro-band">
        <div>
          <p class="eyebrow">Resumen profesional</p>
          <h2>Diseño interfaces, producto y experiencias que comunican valor.</h2>
        </div>
        <p>
          Este espacio muestra una versión genérica de tu currículum con proyectos,
          contacto y navegación a subpáginas para detallar cada trabajo.
        </p>
      </section>

      <div class="content-grid">
        <ExperienceTimeline :experiences="experiences" />
        <SkillsChart :skills="skills" />
      </div>

      <ProjectsGrid :projects="projects" />

      <section class="contact-preview">
        <div class="contact-copy">
          <p class="eyebrow">Contacto</p>
          <h2>¿Quieres hablar sobre un proyecto?</h2>
          <p>
            Aquí irá tu información real más adelante. Por ahora queda un bloque genérico
            para que la Home ya tenga una vía de contacto visible.
          </p>
        </div>

        <div class="contact-actions">
          <p><strong>Email:</strong> hello@example.com</p>
          <p><strong>GitHub:</strong> github.com/your-handle</p>
          <p><strong>LinkedIn:</strong> linkedin.com/in/your-handle</p>
          <NuxtLink to="/contact" class="contact-button">Ir a Contacto</NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 20px 64px;
  background:
    radial-gradient(circle at top left, rgba(102, 126, 234, 0.14), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 48%, #f8fafc 100%);
}

.state-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
}

.error-state {
  color: #991b1b;
}

.intro-band,
.contact-preview {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
  border-radius: 24px;
  padding: 28px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
}

.intro-band {
  grid-template-columns: 1.2fr 1fr;
  align-items: end;
}

.eyebrow {
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  font-weight: 700;
  color: #4f46e5;
}

.intro-band h2,
.contact-copy h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  color: #0f172a;
}

.intro-band p,
.contact-copy p {
  margin: 0;
  color: #475569;
  font-size: 16px;
  line-height: 1.7;
}

.content-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 1200px;
  margin: 0 auto;
}

.contact-preview {
  grid-template-columns: 1.2fr 0.8fr;
  align-items: start;
}

.contact-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 18px;
  background: linear-gradient(180deg, #eef2ff 0%, #ffffff 100%);
}

.contact-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  padding: 12px 18px;
  border-radius: 999px;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 900px) {
  .intro-band,
  .contact-preview,
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
