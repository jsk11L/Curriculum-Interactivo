<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const { copy, locale, localeOptions, setLocale } = usePortfolioCopy()

const showDropdown = ref(false)

const flagMap: Record<string, string> = {
  es: '🇪🇸',
  en: '🇺🇸',
  de: '🇩🇪',
  ru: '🇷🇺',
}

const brokenFlags = ref<Record<string, boolean>>({})

function toggle() {
  showDropdown.value = !showDropdown.value
}

function select(code: string) {
  setLocale(code)
  showDropdown.value = false
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    showDropdown.value = false
  }
}

function imgError(code: string) {
  brokenFlags.value = { ...brokenFlags.value, [code]: true }
}

onMounted(() => {
  // clear stale broken-flag state so flags attempt to load on mount
  brokenFlags.value = {}
  document.addEventListener('click', onDocumentClick)
})
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div class="language-switcher" :aria-label="copy.ui.languageLabel">
    <button
      class="current-flag"
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="showDropdown"
      @click.stop.prevent="toggle"
      :title="copy.ui.languageLabel"
    >
      <span class="flag">
        <img
          :key="`flag-${locale}`"
          :src="`/flags/${locale}.svg`"
          :alt="locale"
          class="flag-img"
          @error="imgError(locale)"
        />
        <span v-if="brokenFlags[locale]" class="flag-fallback">{{ flagMap[locale] }}</span>
      </span>
      <span class="code">{{ locale.toUpperCase() }}</span>
      <span class="caret">▾</span>
    </button>

    <ul
      v-if="showDropdown"
      class="dropdown"
      role="listbox"
      :aria-label="copy.ui.languageLabel"
    >
      <li
        v-for="opt in localeOptions"
        :key="opt.code"
        role="option"
        :aria-selected="locale === opt.code"
      >
        <button type="button" class="opt" @click="select(opt.code)">
          <span class="flag">
            <img
              :key="`flag-${opt.code}`"
              :src="`/flags/${opt.code}.svg`"
              :alt="opt.code"
              class="flag-img"
              @error="imgError(opt.code)"
            />
            <span v-if="brokenFlags[opt.code]" class="flag-fallback">{{ flagMap[opt.code] }}</span>
          </span>
          <span class="opt-code">{{ opt.label }}</span>
          <span class="opt-name">{{ opt.name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.current-flag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 80px;
  height: 48px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--border-dark);
  background: rgba(10, 10, 10, 0.72);
  color: var(--text-secondary);
  font-weight: 700;
  cursor: pointer;
}

.current-flag .flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 28px;
  position: relative;
}

.flag-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.flag-fallback {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-flag .code {
  font-size: 12px;
  letter-spacing: 0.12em;
}
.current-flag .caret {
  margin-left: auto;
  font-size: 12px;
  opacity: 0.8;
}

.dropdown {
  position: absolute;
  top: 46px;
  right: 0;
  min-width: 180px;
  background: rgba(6, 6, 6, 0.96);
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 60;
}

.dropdown .opt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  text-align: left;
  cursor: pointer;
}

.dropdown .opt:hover {
  background: rgba(255, 255, 255, 0.02);
}

.opt .flag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 28px;
  position: relative;
}

.opt .flag-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.opt .opt-code { font-weight: 800; width: 36px; }
.opt .opt-name { opacity: 0.85; font-size: 13px }

@media (max-width: 768px) {
  .current-flag { width: 72px; height: 44px }
  .dropdown { right: 0; left: auto }
}
</style>