<script setup lang="ts">
import { useCvStore } from "~/stores/cvStore"

const route = useRoute()
const cvStore = useCvStore()

const projectId = route.params.id as string
const project = computed(() => cvStore.projects.find((p) => p.id === projectId))

if (!project.value && cvStore.projects.length === 0) {
  await cvStore.fetchProjects()
}

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" })
}
</script>

<template>
  <div v-if="project" class="project-detail">
    <div class="project-hero">
      <div class="hero-image">
        <img v-if="project.images.length" :src="project.images[0]" :alt="project.title" />
        <div v-else class="placeholder">No image available</div>
      </div>
    </div>

    <div class="project-container">
      <div class="project-header">
        <NuxtLink to="/" class="back-link">← Volver</NuxtLink>
        <h1>{{ project.title }}</h1>
        <p class="subtitle">{{ project.short_description }}</p>
      </div>

      <div class="project-main">
        <div class="project-description">
          <h2>Descripción</h2>
          <p>{{ project.description }}</p>
        </div>

        <div class="project-sidebar">
          <div class="tech-stack">
            <h3>Tecnologías</h3>
            <div class="tech-list">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>

          <div v-if="project.links.length" class="project-links">
            <h3>Enlaces</h3>
            <div class="links-list">
              <a
                v-for="link in project.links"
                :key="link.type"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="link-button"
              >
                {{ link.label }}
              </a>
            </div>
          </div>

          <div class="project-date">
            <h3>Fecha</h3>
            <p>{{ new Date(project.created_at).toLocaleDateString("es-ES") }}</p>
          </div>
        </div>
      </div>

      <div v-if="project.images.length > 1" class="gallery">
        <h2>Galería</h2>
        <div class="gallery-grid">
          <img
            v-for="(image, index) in project.images"
            :key="index"
            :src="image"
            :alt="`${project.title} - Image ${index + 1}`"
            class="gallery-image"
          />
        </div>
      </div>

      <div class="contact-cta">
        <h2>¿Interesado en colaborar?</h2>
        <p>Si te gustan los proyectos que hemos visto, me encantaría hablar contigo.</p>
        <NuxtLink to="/contact" class="btn-contact">Contáctame</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-detail {
  min-height: 100vh;
  background: white;

  .project-hero {
    width: 100%;
    height: 400px;
    background: #f0f0f0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .hero-image {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .placeholder {
      color: #999;
      font-size: 18px;
    }
  }

  .project-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .project-header {
    margin-bottom: 40px;

    .back-link {
      display: inline-block;
      color: #1967d2;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
      transition: color 0.2s;

      &:hover {
        color: #185ab0;
      }
    }

    h1 {
      margin: 0 0 8px;
      font-size: 40px;
      font-weight: 700;
      color: #333;
    }

    .subtitle {
      margin: 0;
      font-size: 18px;
      color: #666;
    }
  }

  .project-main {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    margin-bottom: 60px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .project-description {
      h2 {
        margin: 0 0 16px;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      p {
        margin: 0;
        font-size: 16px;
        line-height: 1.8;
        color: #666;
      }
    }

    .project-sidebar {
      display: flex;
      flex-direction: column;
      gap: 30px;

      h3 {
        margin: 0 0 12px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .tech-stack {
        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .tech-tag {
            background: #e8f0fe;
            color: #1967d2;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            font-weight: 500;
          }
        }
      }

      .project-links {
        .links-list {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .link-button {
            display: inline-block;
            padding: 10px 16px;
            background: #1967d2;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            text-align: center;
            transition: all 0.2s;

            &:hover {
              background: #185ab0;
              transform: translateX(4px);
            }
          }
        }
      }

      .project-date {
        p {
          margin: 0;
          font-size: 16px;
          color: #666;
        }
      }
    }
  }

  .gallery {
    margin-bottom: 60px;

    h2 {
      margin: 0 0 24px;
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;

      .gallery-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }

  .contact-cta {
    background: linear-gradient(135deg, #1967d2 0%, #185ab0 100%);
    color: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;

    h2 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 700;
    }

    p {
      margin: 0 0 24px;
      font-size: 16px;
      opacity: 0.9;
    }

    .btn-contact {
      display: inline-block;
      padding: 12px 32px;
      background: white;
      color: #1967d2;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
