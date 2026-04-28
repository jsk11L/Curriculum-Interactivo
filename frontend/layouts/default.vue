<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-container">
        <NuxtLink to="/" class="site-logo">
          <p class="site-label">Mi CV</p>
          <h1>Curriculum Interactivo</h1>
        </NuxtLink>

        <nav class="site-nav">
          <NuxtLink to="/" class="nav-link" :class="{ active: route.path === '/' }">
            Inicio
          </NuxtLink>
          <NuxtLink to="/contact" class="nav-link" :class="{ active: route.path === '/contact' }">
            Contacto
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-content">
        <p>&copy; 2024 Mi Curriculum. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.site-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.site-logo {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-label {
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
}

.site-logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.site-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  position: relative;
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: white;
}

.site-main {
  flex: 1;
  width: 100%;
}

.site-footer {
  background: #111827;
  color: white;
  padding: 24px 20px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    gap: 16px;
  }
}
</style>
