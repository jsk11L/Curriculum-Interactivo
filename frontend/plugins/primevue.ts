import Aura from "@primevue/themes/aura"
import PrimeVue from "primevue/config"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    },
  })
})
