<template>
  <div class="dashboard-layout">
    <aside class="dashboard-layout__sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <Button
        icon="pi pi-times"
        text
        rounded
        severity="secondary"
        class="mobile-close-btn"
        @click="toggleMobileMenu"
      />
      <div class="sidebar">
        <div class="sidebar__logo">
          <h2 class="logo"><span class="logo__dot">i</span>zimza</h2>
        </div>

        <nav class="sidebar__nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link
                to="/dashboard"
                class="nav-link"
                active-class="nav-link--active"
                @click="closeMobileMenu"
              >
                <i class="pi pi-home nav-icon"></i>
                <span>Anasayfa</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/sign"
                class="nav-link"
                active-class="nav-link--active"
                @click="closeMobileMenu"
              >
                <i class="pi pi-pencil nav-icon"></i>
                <span>İmzala</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/timestamp"
                class="nav-link"
                active-class="nav-link--active"
                @click="closeMobileMenu"
              >
                <i class="pi pi-clock nav-icon"></i>
                <span>Zaman Damgala</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/archive"
                class="nav-link"
                active-class="nav-link--active"
                @click="closeMobileMenu"
              >
                <i class="pi pi-folder nav-icon"></i>
                <span>Arşiv</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="sidebar__support">
          <h3 class="support-title">Destek</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="pi pi-question-circle nav-icon"></i>
                <span>Yardım</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="pi pi-comments nav-icon"></i>
                <span>Geri Bildirim</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <div class="dashboard-layout__main">
      <header class="dashboard-layout__header">
        <div class="header">
          <div class="header__left">
            <Button
              icon="pi pi-bars"
              text
              rounded
              severity="secondary"
              class="mobile-menu-btn"
              @click="toggleMobileMenu"
            />
            <h1 class="page-title">
              <slot name="title">Dashboard</slot>
            </h1>
          </div>
          <div class="header__right">
            <div class="user-menu">
              <Button icon="pi pi-user" text rounded severity="secondary" @click="toggleUserMenu" />
              <Menu ref="userMenu" :model="userMenuItems" :popup="true" />
            </div>
          </div>
        </div>
      </header>

      <main class="dashboard-layout__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const userMenu = ref()
const isMobileMenuOpen = ref(false)

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const userMenuItems = ref([
  {
    label: 'Profil',
    icon: 'pi pi-user',
    command: () => {
      console.log('Profile clicked')
    },
  },
  {
    label: 'Ayarlar',
    icon: 'pi pi-cog',
    command: () => {
      console.log('Settings clicked')
    },
  },
  {
    separator: true,
  },
  {
    label: 'Çıkış Yap',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout()
      router.push({ name: 'Login' })
    },
  },
])

const toggleUserMenu = (event: Event) => {
  userMenu.value?.toggle(event)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.dashboard-layout__sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
}

.sidebar {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar__logo {
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #495057;
}

.logo__dot {
  color: #ff6b35;
  position: relative;
}

.logo__dot::after {
  content: '';
  position: absolute;
  top: -3px;
  right: -6px;
  width: 6px;
  height: 6px;
  background: #ff6b35;
  border-radius: 50%;
}

.sidebar__nav {
  flex: 1;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #6c757d;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #495057;
}

.nav-link--active {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
}

.nav-icon {
  margin-right: 0.75rem;
  font-size: 1rem;
}

.sidebar__support {
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.support-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6c757d;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dashboard-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dashboard-layout__header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu-btn {
  display: none;
}

.mobile-menu-btn :deep(.p-button-icon) {
  margin: 0;
}

.mobile-close-btn {
  display: none;
}

.mobile-close-btn :deep(.p-button-icon) {
  margin: 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #495057;
}

.user-menu {
  position: relative;
}

.dashboard-layout__content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-layout__sidebar {
    width: 200px;
  }

  .sidebar {
    padding: 1rem;
  }

  .dashboard-layout__header {
    padding: 1rem;
  }

  .dashboard-layout__content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .dashboard-layout__sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  .dashboard-layout__sidebar.mobile-open {
    display: flex;
    opacity: 1;
    visibility: visible;
  }

  .dashboard-layout__main {
    width: 100%;
    margin-left: 0;
  }

  .sidebar {
    flex-direction: column;
    padding: 2rem 1.5rem;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    overflow-y: auto;
  }

  .sidebar__logo {
    margin-bottom: 3rem;
    text-align: center;
  }

  .logo {
    font-size: 2rem;
    color: white;
  }

  .sidebar__nav {
    flex: 1;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-item {
    margin-bottom: 0;
  }

  .nav-link {
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .nav-link--active {
    background: rgba(255, 255, 255, 0.3);
    color: white;
    font-weight: 600;
  }

  .nav-icon {
    font-size: 1.25rem;
  }

  .sidebar__support {
    margin-top: auto;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .support-title {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
  }

  .sidebar__support .nav-list {
    gap: 0.5rem;
  }

  .sidebar__support .nav-link {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }

  .mobile-menu-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .mobile-menu-btn :deep(.p-button-icon) {
    margin: 0;
  }

  .mobile-close-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10001;
    color: white !important;
    width: 2.5rem;
    height: 2.5rem;
  }

  .mobile-close-btn :deep(.p-button-icon) {
    margin: 0;
    font-size: 1.25rem;
  }

  .mobile-close-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .header__left {
    display: flex;
    align-items: center;
  }
}
</style>
