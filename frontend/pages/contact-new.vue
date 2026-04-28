<script setup lang="ts">
import { ref } from "vue"
import { useCvStore } from "~/stores/cvStore"

const cvStore = useCvStore()
const loading = ref(false)
const submitted = ref(false)

const form = ref({
  name: "",
  email: "",
  content: "",
})

// Real contact info
const contactData = {
  email: "jasepulvedaca@gmail.com",
  phone: "+56977799021",
  github: "https://github.com/jsk11L",
  linkedin: "https://www.linkedin.com/in/jasepulvedaca/",
}

const submit = async () => {
  if (!form.value.name || !form.value.email || !form.value.content) {
    alert("Por favor completa todos los campos")
    return
  }

  loading.value = true
  try {
    await cvStore.submitContact({
      name: form.value.name,
      email: form.value.email,
      content: form.value.content,
    })
    submitted.value = true
    form.value = { name: "", email: "", content: "" }
    setTimeout(() => {
      submitted.value = false
    }, 3000)
  } catch (error) {
    alert("Error enviando el mensaje. Intenta de nuevo.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <h1>$ contacto --info</h1>
    <p class="subtitle">// Déjame un mensaje</p>

    <div class="contact-wrapper">
      <aside class="contact-info-panel">
        <div class="info-block">
          <span class="label">email</span>
          <a :href="`mailto:${contactData.email}`">{{ contactData.email }}</a>
        </div>

        <div class="info-block">
          <span class="label">phone</span>
          <a :href="`tel:${contactData.phone}`">{{ contactData.phone }}</a>
        </div>

        <div class="info-block">
          <span class="label">github</span>
          <a :href="contactData.github" target="_blank" rel="noopener noreferrer">
            {{ contactData.github }}
          </a>
        </div>

        <div class="info-block">
          <span class="label">linkedin</span>
          <a :href="contactData.linkedin" target="_blank" rel="noopener noreferrer">
            {{ contactData.linkedin }}
          </a>
        </div>
      </aside>

      <form class="contact-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="name">nombre</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="tu nombre completo"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="message">mensaje</label>
          <textarea
            id="message"
            v-model="form.content"
            placeholder="cuéntame tu idea..."
            rows="8"
            required
          ></textarea>
        </div>

        <button type="submit" :disabled="loading" class="btn-send">
          {{ loading ? "$ enviando..." : "$ enviar mensaje" }}
        </button>

        <div v-if="submitted" class="success-message">
          // ✓ Mensaje recibido. Te responderé pronto.
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  padding: 40px 0;
}

h1 {
  margin: 0 0 8px;
  color: var(--accent-red);
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.subtitle {
  margin: 0 0 40px;
  color: var(--text-secondary);
  font-size: 12px;
  letter-spacing: 0.5px;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

.contact-info-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-dark);

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-red);
    font-weight: 600;
  }

  a {
    font-size: 12px;
    word-break: break-all;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--accent-red);
    }
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-dark);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent-red);
    font-weight: 600;
  }

  input,
  textarea {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--border-dark);
    color: var(--text-primary);
    padding: 8px 0;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 13px;
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
    min-height: 120px;
  }
}

.btn-send {
  background-color: transparent;
  border: 2px solid var(--accent-red);
  color: var(--accent-red);
  padding: 12px 24px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  font-weight: 600;

  &:hover:not(:disabled) {
    background-color: var(--accent-red);
    color: var(--bg-primary);
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.success-message {
  padding: 12px;
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  color: #10b981;
  font-size: 12px;
  font-family: 'Fira Code', monospace;
  text-align: center;
}

@media (max-width: 768px) {
  .contact-info-panel,
  .contact-form {
    padding: 16px;
  }

  .form-group {
    input,
    textarea {
      font-size: 12px;
    }
  }
}

@media (max-width: 480px) {
  .contact-info-panel,
  .contact-form {
    padding: 12px;
  }

  .btn-send {
    padding: 10px 16px;
    font-size: 11px;
  }
}
</style>
