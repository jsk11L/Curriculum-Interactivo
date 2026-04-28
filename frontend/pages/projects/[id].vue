<script setup lang="ts">
import { useCvStore } from '~/stores/cvStore'

const route = useRoute()
const cvStore = useCvStore()

const projectId = route.params.id as string
const project = computed(() => cvStore.projects.find((p) => p.id === projectId))

if (!project.value && cvStore.projects.length === 0) {
  await cvStore.fetchProjects()
}

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

/** Format project date — empty string means "En desarrollo". */
function formatDate(dateStr: string): string {
  if (!dateStr) return 'TBA'
  return new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
  })
}
</script>

<template>
  <div v-if="project" class="project-detail">
    <div class="project-nav">
      <NuxtLink to="/" class="back-link">← $ cd ..</NuxtLink>
    </div>

    <div class="project-hero-banner" v-if="project.images.length">
      <img :src="project.images[0]" :alt="project.title" />
    </div>

    <header class="project-header">
      <span class="project-date">{{ formatDate(project.created_at) }}</span>
      <h1>{{ project.title }}</h1>
      <p class="project-short">{{ project.short_description }}</p>
    </header>

    <div class="project-body">
      <div class="project-description">
        <h2>$ cat description.txt</h2>
        <p>{{ project.description }}</p>
      </div>

      <aside class="project-sidebar">
        <div class="sidebar-block">
          <h3>// Tecnologías</h3>
          <div class="tech-list">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>

        <div v-if="project.links.length" class="sidebar-block">
          <h3>// Enlaces</h3>
          <div class="links-list">
            <a
              v-for="link in project.links"
              :key="link.type"
              :href="String(link.url)"
              target="_blank"
              rel="noopener noreferrer"
              class="link-button"
            >
              $ open {{ link.label.toLowerCase() }}
            </a>
          </div>
        </div>

        <div class="sidebar-block">
          <h3>// Fecha</h3>
          <p class="date-value">{{ new Date(project.created_at).toLocaleDateString('es-ES') }}</p>
        </div>
      </aside>
    </div>

    <div v-if="project.images.length > 1" class="gallery">
      <h2>$ ls ./gallery</h2>
      <div class="gallery-grid">
        <img
          v-for="(image, index) in project.images"
          :key="index"
          :src="image"
          :alt="`${project.title} - Imagen ${index + 1}`"
          class="gallery-image"
        />
      </div>
    </div>

    <div class="contact-cta">
      <h2>¿Interesado en colaborar?</h2>
      <p>Si te gustan los proyectos que has visto, me encantaría hablar contigo.</p>
      <NuxtLink to="/contact" class="btn-contact">$ contacto --nuevo</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-detail {
  padding: 40px 0 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.project-nav {
  .back-link {
    display: inline-block;
    color: var(--accent-red);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    padding: 8px 0;

    &:hover {
      color: var(--text-primary);
      transform: translateX(-4px);
    }
  }
}

.project-hero-banner {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  border: 2px solid var(--border-dark);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.project-header {
  .project-date {
    display: inline-block;
    margin-bottom: 12px;
    font-size: 12px;
    color: var(--accent-red);
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .project-short {
    margin: 0;
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

.project-body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  .project-description {
    h2 {
      margin: 0 0 16px;
      font-size: 1.2rem;
      color: var(--accent-red);
      letter-spacing: 0.5px;
    }

    p {
      margin: 0;
      font-size: 16px;
      line-height: 1.8;
      color: var(--text-primary);
    }
  }
}

.project-sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;

  .sidebar-block {
    padding: 20px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-dark);

    h3 {
      margin: 0 0 14px;
      font-size: 13px;
      color: var(--accent-red);
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .tech-tag {
    background: transparent;
    color: var(--accent-red);
    border: 1px solid var(--accent-red);
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-red);
      color: var(--bg-primary);
    }
  }
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .link-button {
    display: block;
    padding: 12px 16px;
    background: transparent;
    border: 2px solid var(--accent-red);
    color: var(--accent-red);
    text-decoration: none;
    font-family: 'Fira Code', monospace;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-red);
      color: var(--bg-primary);
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
    }
  }
}

.date-value {
  margin: 0;
  font-size: 15px;
  color: var(--text-primary);
}

.gallery {
  h2 {
    margin: 0 0 20px;
    font-size: 1.2rem;
    color: var(--accent-red);
    letter-spacing: 0.5px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;

    .gallery-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border: 2px solid var(--border-dark);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--accent-red);
        box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
      }
    }
  }
}

.contact-cta {
  padding: 48px;
  border: 2px solid var(--accent-red);
  background: rgba(220, 38, 38, 0.05);
  text-align: center;

  h2 {
    margin: 0 0 12px;
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 700;
    color: var(--text-primary);
  }

  p {
    margin: 0 0 28px;
    font-size: 16px;
    color: var(--text-secondary);
  }

  .btn-contact {
    display: inline-block;
    padding: 16px 36px;
    background: var(--accent-red);
    color: var(--bg-primary);
    text-decoration: none;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;

    &:hover {
      background: transparent;
      color: var(--accent-red);
      border: 2px solid var(--accent-red);
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
    }
  }
}

@media (max-width: 768px) {
  .project-body {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .project-header .project-short { font-size: 16px; }

  .contact-cta {
    padding: 32px 20px;
  }
}

@media (max-width: 480px) {
  .project-detail {
    padding: 24px 0 48px;
    gap: 28px;
  }

  .contact-cta {
    padding: 24px 16px;

    .btn-contact {
      padding: 12px 24px;
      font-size: 12px;
    }
  }
}
</style>
