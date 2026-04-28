<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-container">
        <NuxtLink to="/" class="site-logo">
          <span class="site-label">// javier.sepúlveda</span>
        </NuxtLink>

        <nav class="site-nav">
          <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">
            $ inicio
          </NuxtLink>
          <NuxtLink to="/contact" class="nav-link" :class="{ active: route.path === '/contact' }">
            $ contacto
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-content">
        <p>// {{ new Date().getFullYear() }} — javier sepúlveda — hecho con nuxt 3 + fastapi</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  background-color: var(--bg-primary);
  border-bottom: 2px solid var(--border-dark);
  padding: 18px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background-color: rgba(10, 10, 10, 0.95);
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.site-logo {
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.site-label {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-red);
  }
}

.site-nav {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    background: var(--accent-red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover,
  &.active {
    color: var(--accent-red);

    &::after {
      transform: scaleX(1);
    }
  }
}

.site-main {
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.site-footer {
  background-color: var(--bg-secondary);
  border-top: 2px solid var(--border-dark);
  padding: 28px 24px;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 13px;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .site-nav {
    gap: 20px;
  }

  .site-main {
    padding: 0 16px;
  }
}
</style>
