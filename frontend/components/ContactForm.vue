<script setup lang="ts">
import { ref } from "vue"
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Textarea from "primevue/textarea"

const cvStore = useCvStore()

const form = ref({
  name: "",
  email: "",
  content: "",
})

const submitting = ref(false)
const successMessage = ref("")
const errorMessage = ref("")

const handleSubmit = async () => {
  submitting.value = true
  successMessage.value = ""
  errorMessage.value = ""

  try {
    await cvStore.submitContact(form.value)
    successMessage.value = "Message sent successfully."
    form.value = { name: "", email: "", content: "" }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Unable to send the message."
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="panel contact-panel">
    <div class="panel-header">
      <h3>Contact</h3>
      <p>Send a short note and the backend will persist it in MongoDB.</p>
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <label>
        <span>Name</span>
        <InputText v-model="form.name" type="text" placeholder="Your name" class="w-full" />
      </label>

      <label>
        <span>Email</span>
        <InputText v-model="form.email" type="email" placeholder="you@example.com" class="w-full" />
      </label>

      <label>
        <span>Message</span>
        <Textarea v-model="form.content" rows="5" auto-resize placeholder="Tell me about the role, project, or idea." class="w-full" />
      </label>

      <Button type="submit" :label="submitting ? 'Sending...' : 'Send message'" :disabled="submitting" />

      <p v-if="successMessage" class="status success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="status error">{{ errorMessage }}</p>
    </form>
  </section>
</template>
