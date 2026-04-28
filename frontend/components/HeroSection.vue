<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PersonalInfo } from '~/stores/cvStore'

defineProps<{
  profile: PersonalInfo | null
}>()

const typewriterText = ref('')
const fullText = 'Hola!, soy Javier Sepúlveda'
let currentIndex = 0

onMounted(() => {
  const interval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      typewriterText.value = fullText.substring(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(interval)
    }
  }, 80)
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn-close"></span>
          <span class="btn-minimize"></span>
          <span class="btn-maximize"></span>
        </div>
      </div>
      <div class="terminal-content">
        <div class="terminal-line">
          <span class="prompt">C:\Users\Javier></span>
          <span class="typewriter-text">{{ typewriterText }}</span>
        </div>
        <div class="terminal-line" style="margin-top: 24px">
          <span class="prompt">C:\Users\Javier></span>
          <span class="command">cat about.txt</span>
        </div>
        <div class="about-output">
          <p>
            Frontend Engineer & Full Stack Developer apasionado por construir
            experiencias digitales impactantes. Especialista en Vue 3, React y
            arquitectura moderna. Experto en transformar ideas en soluciones
            escalables con código limpio y buenas prácticas.
          </p>
        </div>
      </div>
    </div>

    <div class="hero-links">
      <a href="https://github.com/jsk11L" target="_blank" rel="noopener noreferrer" class="link-btn">
        $ github
      </a>
      <a href="https://www.linkedin.com/in/jasepulvedaca/" target="_blank" rel="noopener noreferrer" class="link-btn">
        $ linkedin
      </a>
      <a href="mailto:jasepulvedaca@gmail.com" class="link-btn">
        $ email
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding: 60px 0 40px;
}

.hero-terminal {
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
  border-top: 24px solid var(--border-dark);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(220, 38, 38, 0.1);
}

.terminal-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background-color: var(--border-dark);
  display: flex;
  align-items: center;
  padding-left: 8px;
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
  background-color: var(--text-secondary);
  opacity: 0.5;
}

.btn-close {
  background-color: #ef4444;
}

.btn-minimize {
  background-color: #f59e0b;
}

.btn-maximize {
  background-color: #10b981;
}

.terminal-content {
  padding: 20px 16px;
  color: var(--text-primary);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
}

.terminal-line {
  display: flex;
  gap: 8px;
}

.prompt {
  color: var(--accent-red);
  font-weight: 600;
}

.command {
  color: var(--text-secondary);
}

.typewriter-text {
  color: var(--accent-red);
  font-weight: 600;
  border-right: 2px solid var(--accent-red);
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  49% {
    border-right-color: var(--accent-red);
  }
  50%,
  100% {
    border-right-color: transparent;
  }
}

.about-output {
  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  color: var(--text-primary);

  p {
    margin: 0;
    color: var(--text-primary);
    font-size: 13px;
    line-height: 1.6;
  }
}

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
  padding: 12px 24px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background-color: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0 30px;
    gap: 24px;
  }

  .terminal-content {
    font-size: 12px;
  }

  .hero-links {
    gap: 12px;
  }

  .link-btn {
    padding: 10px 16px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 0 20px;
    gap: 16px;
  }

  .terminal-content {
    font-size: 11px;
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
