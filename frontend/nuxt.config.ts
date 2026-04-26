export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/scss/main.scss"],
  runtimeConfig: {
    apiUrl: `${process.env.API_URL ?? "http://backend:8000"}/api/v1`,
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
    },
  },
  build: {
    transpile: ["primevue"],
  },
  app: {
    head: {
      title: "Curriculum Interactivo",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Curriculum interactivo built with Nuxt, FastAPI, and MongoDB." },
      ],
    },
  },
})
