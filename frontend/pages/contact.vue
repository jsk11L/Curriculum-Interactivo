<script setup lang="ts">
import { computed, ref } from "vue"
import { useCvStore } from "~/stores/cvStore"

const cvStore = useCvStore()
const loading = ref(false)
const submitted = ref(false)

const form = ref({
  name: "",
  email: "",
  content: "",
})

const contactInfo = computed(() => ({
  email: cvStore.profile?.email ?? "hello@example.com",
  github: cvStore.profile?.github_url ?? "https://github.com/your-handle",
  linkedin: cvStore.profile?.linkedin_url ?? "https://linkedin.com/in/your-handle",
}))

const submit = async () => {
  if (!form.value.name || !form.value.email || !form.value.content) {
    alert("Please fill in all fields")
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
    alert("Error sending message. Please try again.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <div class="contact-container">
      <div class="contact-header">
        <h1>Ponte en Contacto</h1>
        <p>¿Tienes una propuesta o pregunta? Me encantaría escucharte.</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h3>Información de Contacto</h3>
          <div class="info-items">
            <div class="info-item">
              <span class="label">Email</span>
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </div>
            <div class="info-item">
              <span class="label">GitHub</span>
              <a :href="contactInfo.github" target="_blank" rel="noopener">
                {{ contactInfo.github }}
              </a>
            </div>
            <div class="info-item">
              <span class="label">LinkedIn</span>
              <a :href="contactInfo.linkedin" target="_blank" rel="noopener">
                {{ contactInfo.linkedin }}
              </a>
            </div>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="submit">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              v-model="form.content"
              placeholder="Tu mensaje..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? "Enviando..." : "Enviar Mensaje" }}
          </button>

          <div v-if="submitted" class="success-message">
            ¡Gracias por tu mensaje! Te responderé pronto.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  min-height: calc(100vh - 80px);
  padding: 60px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .contact-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 50px;

    h1 {
      margin: 0 0 16px;
      font-size: 40px;
      font-weight: 700;
      color: #333;
    }

    p {
      margin: 0;
      font-size: 18px;
      color: #666;
    }
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .contact-info {
      h3 {
        margin: 0 0 24px;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      .info-items {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .label {
          font-weight: 600;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        a {
          color: #1967d2;
          text-decoration: none;
          font-size: 16px;
          word-break: break-all;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;

        label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        input,
        textarea {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;

          &:focus {
            outline: none;
            border-color: #1967d2;
            box-shadow: 0 0 0 3px rgba(25, 103, 210, 0.1);
          }

          &::placeholder {
            color: #999;
          }
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }
      }

      .btn-submit {
        padding: 12px 24px;
        background: #1967d2;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(:disabled) {
          background: #185ab0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 103, 210, 0.3);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .success-message {
        padding: 12px 16px;
        background: #d4edda;
        color: #155724;
        border-radius: 6px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
