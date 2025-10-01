<template>
  <div class="auth-layout">
    <div class="auth-layout__left">
      <div class="auth-layout__content">
        <div class="auth-layout__logo">
          <h1 class="logo"><span class="logo__dot">i</span>zimza</h1>
        </div>

        <div class="auth-layout__slogan">
          <h2 class="slogan-main">Her yer senin ofisin</h2>
          <p class="slogan-sub">
            <span class="highlight">İmzala gönder,</span><br />
            özgürlüğün tadını çıkar
          </p>
        </div>

        <div class="auth-layout__illustration">
          <div class="illustration">
            <div class="gradient-shape gradient-shape-1"></div>
            <div class="gradient-shape gradient-shape-2"></div>
            <div class="gradient-shape gradient-shape-3"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="auth-layout__right">
      <div class="auth-layout__form-container">
        <router-view />
      </div>
    </div>

    <div class="auth-layout__language">
      <Button
        icon="pi pi-globe"
        text
        rounded
        severity="secondary"
        size="small"
        @click="toggleLanguage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const toggleLanguage = () => {
  console.log('Language toggle clicked')
}
</script>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.auth-layout__left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
}

.auth-layout__content {
  max-width: 500px;
  width: 100%;
}

.auth-layout__logo {
  margin-bottom: 3rem;
}

.logo {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  position: relative;
}

.logo__dot {
  color: #ff6b35;
  position: relative;
}

.logo__dot::after {
  content: '';
  position: absolute;
  top: -5px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: #ff6b35;
  border-radius: 50%;
}

.auth-layout__slogan {
  margin-bottom: 3rem;
}

.slogan-main {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.slogan-sub {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.highlight {
  color: #ff6b35;
  font-weight: 600;
}

.auth-layout__illustration {
  margin-top: 2rem;
}

.illustration {
  width: 100%;
  height: 300px;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gradient-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
}

.gradient-shape-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ff6b35 0%, #f9ca24 100%);
  top: -50px;
  left: -50px;
  animation: float1 25s ease-in-out infinite;
}

.gradient-shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  bottom: -30px;
  right: 20%;
  animation: float2 30s ease-in-out infinite;
}

.gradient-shape-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 50%;
  right: -20px;
  animation: float3 20s ease-in-out infinite;
}

@keyframes float1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-60px, -70px);
  }
  66% {
    transform: translate(50px, -60px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(55px, 65px);
  }
  66% {
    transform: translate(-45px, 50px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translate(0, -50%);
  }
  33% {
    transform: translate(-70px, calc(-50% + 60px));
  }
  66% {
    transform: translate(40px, calc(-50% - 55px));
  }
}

.auth-layout__right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
}

.auth-layout__form-container {
  width: 100%;
  max-width: 400px;
}

.auth-layout__language {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .auth-layout {
    background: white;
  }

  .auth-layout__left {
    display: none;
  }

  .auth-layout__right {
    padding: 1.5rem;
  }

  .auth-layout__language {
    top: 1rem;
    right: 1rem;
  }
}
</style>
