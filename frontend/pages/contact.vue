<script setup lang="ts">
import { ref } from 'vue'
import { useCvStore } from '~/stores/cvStore'

const cvStore = useCvStore()
const loading = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

// Load profile to get contact data from the API
if (!cvStore.profile) {
  await cvStore.fetchProfile()
}
const profile = computed(() => cvStore.profile)

const form = ref({
  name: '',
  email: '',
  content: '',
})

const submit = async () => {
  if (!form.value.name || !form.value.email || !form.value.content) {
    errorMsg.value = 'Por favor completa todos los campos'
    return
  }

  loading.value = true
  errorMsg.value = ''
  try {
    await cvStore.submitContact({
      name: form.value.name,
      email: form.value.email,
      content: form.value.content,
    })
    submitted.value = true
    form.value = { name: '', email: '', content: '' }
    setTimeout(() => {
      submitted.value = false
    }, 4000)
  } catch (error) {
    errorMsg.value = 'Error enviando el mensaje. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <h1>$ contacto --info</h1>
    <p class="subtitle">// Dejame un mensaje</p>

    <div class="contact-wrapper">
      <aside v-if="profile" class="contact-info-panel">
        <div class="info-block">
          <span class="label">email</span>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>

        <div class="info-block">
          <span class="label">github</span>
          <a :href="String(profile.github_url)" target="_blank" rel="noopener noreferrer">
            {{ String(profile.github_url).replace('https://', '') }}
          </a>
        </div>

        <div class="info-block">
          <span class="label">linkedin</span>
          <a :href="String(profile.linkedin_url)" target="_blank" rel="noopener noreferrer">
            {{ String(profile.linkedin_url).replace('https://www.', '') }}
          </a>
        </div>
      </aside>

      <form class="contact-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="contact-name">nombre</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            placeholder="tu nombre completo"
            required
          />
        </div>

        <div class="form-group">
          <label for="contact-email">email</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="contact-message">mensaje</label>
          <textarea
            id="contact-message"
            v-model="form.content"
            placeholder="cuentame tu idea..."
            rows="8"
            required
          ></textarea>
        </div>

        <button type="submit" :disabled="loading" class="btn-send">
          {{ loading ? '$ enviando...' : '$ enviar mensaje' }}
        </button>

        <Transition name="fade">
          <div v-if="submitted" class="status-message success">
            // ✓ Mensaje recibido. Te responderé pronto.
          </div>
        </Transition>

        <Transition name="fade">
          <div v-if="errorMsg" class="status-message error">
            // ✗ {{ errorMsg }}
          </div>
        </Transition>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  padding: 56px 0 80px;
}

h1 {
  margin: 0 0 8px;
  color: var(--accent-red);
  font-size: 2.2rem;
  letter-spacing: 1px;
}

.subtitle {
  margin: 0 0 40px;
  color: var(--text-secondary);
  font-size: 14px;
  letter-spacing: 0.5px;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;
}

.contact-info-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-dark);

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--accent-red);
    font-weight: 700;
  }

  a {
    font-size: 15px;
    word-break: break-all;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover { color: var(--accent-red); }
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--accent-red);
    font-weight: 700;
  }

  input,
  textarea {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--border-dark);
    color: var(--text-primary);
    padding: 10px 0;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-bottom-color: var(--accent-red);
      box-shadow: 0 2px 0 rgba(220, 38, 38, 0.3);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }
}

.btn-send {
  background-color: transparent;
  border: 2px solid var(--accent-red);
  color: var(--accent-red);
  padding: 16px 32px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  font-weight: 700;

  &:hover:not(:disabled) {
    background-color: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.status-message {
  padding: 14px;
  font-size: 14px;
  font-family: 'Fira Code', monospace;
  text-align: center;

  &.success {
    background-color: rgba(16, 185, 129, 0.1);
    border: 1px solid #10b981;
    color: #10b981;
  }

  &.error {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    color: #ef4444;
  }
}

.fade-enter-active { transition: opacity 0.4s ease; }
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .contact-info-panel,
  .contact-form {
    padding: 20px;
  }

  .form-group input,
  .form-group textarea {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .contact-info-panel,
  .contact-form {
    padding: 14px;
  }

  .btn-send {
    padding: 12px 20px;
    font-size: 13px;
  }
}
</style>
