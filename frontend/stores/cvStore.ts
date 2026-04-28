/**
 * Centralized client state for CV data.
 *
 * Uses $fetch (not useFetch) so requests work identically in SSR and CSR.
 * The store is the single source of truth — all components read from here.
 */
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

export interface ProjectLink {
  type: string
  url: string
  label: string
}

export interface ProjectItem {
  id: string
  title: string
  short_description: string
  description: string
  images: string[]
  technologies: string[]
  links: ProjectLink[]
  created_at: string
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
    projects: [] as ProjectItem[],
    loading: true,
    error: null as string | null,
  }),
  actions: {
    /** Resolve the API base URL depending on server vs client context. */
    getBaseUrl(): string {
      const config = useRuntimeConfig()
      return import.meta.server
        ? (config.apiUrl as string)
        : (config.public.apiUrl as string)
    },

    async fetchProfile() {
      this.profile = await $fetch<PersonalInfo>(`${this.getBaseUrl()}/profile`)
    },

    async fetchExperiences(tech?: string) {
      const url = new URL(`${this.getBaseUrl()}/experience`)
      if (tech) url.searchParams.set("tech", tech)
      this.experiences = await $fetch<ExperienceItem[]>(url.toString())
    },

    async fetchSkills() {
      this.skills = await $fetch<SkillItem[]>(`${this.getBaseUrl()}/skills`)
    },

    async fetchProjects() {
      this.projects = await $fetch<ProjectItem[]>(`${this.getBaseUrl()}/projects`)
    },

    /**
     * Load all data in parallel.
     * Sets loading=true while fetching, catches errors gracefully.
     */
    async loadAll() {
      this.loading = true
      this.error = null

      try {
        await Promise.all([
          this.fetchProfile(),
          this.fetchExperiences(),
          this.fetchSkills(),
          this.fetchProjects(),
        ])
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Unable to load curriculum data"
      } finally {
        this.loading = false
      }
    },

    async submitContact(payload: ContactPayload) {
      return await $fetch<ContactResponse>(`${this.getBaseUrl()}/contact`, {
        method: "POST",
        body: payload,
      })
    },
  },
})
