<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PersonalInfo } from '~/stores/cvStore'
import profileImg from '~/assets/profile.png'

const props = defineProps<{
  profile: PersonalInfo | null
}>()

const typewriterText = ref('')
const showContent = ref(false)

onMounted(() => {
  const fullText = props.profile?.name
    ? `Hola!, soy ${props.profile.name}`
    : 'Hola!, bienvenido'

  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      typewriterText.value = fullText.substring(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(interval)
      setTimeout(() => { showContent.value = true }, 300)
    }
  }, 70)
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-layout">
      <!-- Photo window — floats above the terminal, top-right -->
      <div class="photo-terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-close"></span>
            <span class="btn-minimize"></span>
            <span class="btn-maximize"></span>
          </div>
          <span class="terminal-title">photo.png</span>
        </div>
        <div class="photo-content">
          <img :src="profileImg" alt="Javier Sepúlveda" class="profile-photo" />
        </div>
      </div>

      <!-- Main terminal — large, covers full height -->
      <div class="hero-terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-close"></span>
            <span class="btn-minimize"></span>
            <span class="btn-maximize"></span>
          </div>
          <span class="terminal-title">javier@portfolio:~</span>
        </div>
        <div class="terminal-content">
          <div class="terminal-line">
            <span class="prompt">~/portfolio $</span>
            <span class="typewriter-text">{{ typewriterText }}</span>
          </div>

          <Transition name="fade">
            <div v-if="showContent && profile" class="about-output">
              <div class="terminal-line">
                <span class="prompt">~/portfolio $</span>
                <span class="command">cat about.txt</span>
              </div>
              <p class="about-text">
                Estudiante de 5to año de Ingeniería Civil Informática apasionado
                por <span class="highlight">construir software</span> y
                <span class="highlight">herramientas</span> que voy viendo necesario
                en mi vida y que pueden ser útil a más gente. Tengo experiencia en
                <span class="highlight">investigación</span> y soy co-autor de una
                publicación de optimización de cronogramas hospitalarios.
                Me apasionan la <span class="highlight">música</span> y los
                <span class="highlight">videojuegos</span>.
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <div v-if="profile" class="hero-links">
      <a :href="String(profile.github_url)" target="_blank" rel="noopener noreferrer" class="link-btn">
        $ github
      </a>
      <a :href="String(profile.linkedin_url)" target="_blank" rel="noopener noreferrer" class="link-btn">
        $ linkedin
      </a>
      <a :href="`mailto:${profile.email}`" class="link-btn">
        $ email
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 72px 0 56px;
}

/* Layout: photo overlaps the terminal from the top-right */
.hero-layout {
  position: relative;
  padding-top: 60px; /* space for the photo to peek above */
}

/* Photo terminal — positioned above and right of the main terminal */
.photo-terminal {
  position: absolute;
  top: 0;
  right: 24px;
  width: 210px;
  z-index: 10;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
  overflow: hidden;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(220, 38, 38, 0.08);
}

.photo-content {
  /* Non-conventional aspect ratio: taller than wide, like a portrait polaroid */
  aspect-ratio: 3 / 3.8;
  overflow: hidden;
  background: #0a0a0a;

  .profile-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.4s ease;

    &:hover {
      filter: grayscale(0%);
    }
  }
}

/* Main terminal — big, stretches full width */
.hero-terminal {
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(220, 38, 38, 0.1);
  min-height: 340px;
}

/* Shared terminal header */
.terminal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: #1a1a1a;
  border-bottom: 1px solid var(--border-dark);
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.btn-close,
.btn-minimize,
.btn-maximize {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close { background-color: #ef4444; }
.btn-minimize { background-color: #f59e0b; }
.btn-maximize { background-color: #10b981; }

.terminal-title {
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

/* Terminal body */
.terminal-content {
  padding: 36px 32px;
  padding-right: 260px; /* keep text from going under the photo */
  color: var(--text-primary);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.8;
}

.terminal-line {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.prompt {
  color: var(--accent-red);
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
}

.command {
  color: var(--text-secondary);
  font-size: 16px;
}

.typewriter-text {
  color: var(--accent-red);
  font-weight: 700;
  font-size: clamp(20px, 2.8vw, 28px);
  border-right: 2px solid var(--accent-red);
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 49% { border-right-color: var(--accent-red); }
  50%, 100% { border-right-color: transparent; }
}

.about-output {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-text {
  margin: 4px 0 0 0;
  padding: 16px 0 16px 24px;
  border-left: 3px solid var(--accent-red);
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.8;
}

.highlight {
  color: var(--accent-red);
  font-weight: 700;
}

/* Links */
.hero-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.link-btn {
  display: inline-block;
  background-color: transparent;
  border: 2px solid var(--accent-red);
  color: var(--accent-red);
  padding: 16px 32px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background-color: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
}

.fade-enter-active { transition: opacity 0.5s ease; }
.fade-enter-from { opacity: 0; }

/* Responsive */
@media (max-width: 900px) {
  .photo-terminal {
    width: 180px;
    right: 16px;
  }

  .terminal-content {
    padding-right: 220px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 48px 0 36px;
    gap: 24px;
  }

  .hero-layout {
    padding-top: 0;
  }

  .photo-terminal {
    position: relative;
    top: auto;
    right: auto;
    width: 160px;
    margin-bottom: -20px;
    margin-left: auto;
  }

  .terminal-content {
    font-size: 14px;
    padding: 24px 16px;
    padding-right: 16px;
  }

  .prompt, .command { font-size: 14px; }

  .hero-links { gap: 12px; }

  .link-btn {
    padding: 12px 20px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 0 20px;
    gap: 16px;
  }

  .photo-terminal {
    width: 130px;
  }

  .terminal-content {
    font-size: 12px;
    padding: 16px 12px;
  }

  .hero-links {
    flex-direction: column;
  }

  .link-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
