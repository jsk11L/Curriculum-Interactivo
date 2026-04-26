import { defineStore } from "pinia"

export interface PersonalInfo {
  name: string
  title: string
  summary: string
  github_url: string
  linkedin_url: string
  email: string
}

export interface ExperienceItem {
  id: string
  company: string
  position: string
  start_date: string
  end_date: string
  description: string[]
  technologies: string[]
}

export interface SkillItem {
  category: string
  items: string[]
  proficiency: number
}

export interface ContactPayload {
  name: string
  email: string
  content: string
}

interface ContactResponse {
  status: string
}

export const useCvStore = defineStore("cv", {
  state: () => ({
    profile: null as PersonalInfo | null,
    experiences: [] as ExperienceItem[],
    skills: [] as SkillItem[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    apiBaseUrl() {
      const config = useRuntimeConfig()
      return process.server ? config.apiUrl : config.public.apiUrl
    },
    async fetchProfile() {
      const { data, error } = await useFetch<PersonalInfo>(`${this.apiBaseUrl()}/profile`)
      if (error.value) {
        throw error.value
      }
      this.profile = data.value ?? null
    },
    async fetchExperiences(tech?: string) {
      const url = new URL(`${this.apiBaseUrl()}/experience`)
      if (tech) {
        url.searchParams.set("tech", tech)
      }

      const { data, error } = await useFetch<ExperienceItem[]>(url.toString())
      if (error.value) {
        throw error.value
      }
      this.experiences = data.value ?? []
    },
    async fetchSkills() {
      const { data, error } = await useFetch<SkillItem[]>(`${this.apiBaseUrl()}/skills`)
      if (error.value) {
        throw error.value
      }
      this.skills = data.value ?? []
    },
    async loadAll() {
      this.loading = true
      this.error = null

      try {
        await Promise.all([this.fetchProfile(), this.fetchExperiences(), this.fetchSkills()])
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unable to load curriculum data"
      } finally {
        this.loading = false
      }
    },
    async submitContact(payload: ContactPayload) {
      const response = await $fetch<ContactResponse>(`${this.apiBaseUrl()}/contact`, {
        method: "POST",
        body: payload,
      })

      return response
    },
  },
})
