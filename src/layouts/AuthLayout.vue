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
            <div class="illustration__beach">
              <div class="beach__umbrella"></div>
              <div class="beach__person">
                <div class="person__tablet"></div>
              </div>
              <div class="beach__palm-1"></div>
              <div class="beach__palm-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="auth-layout__right">
      <div class="auth-layout__form-container">
        <slot />
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
  background: linear-gradient(to bottom, #87ceeb 0%, #98fb98 100%);
  border-radius: 20px;
  overflow: hidden;
}

.illustration__beach {
  position: relative;
  width: 100%;
  height: 100%;
}

.beach__umbrella {
  position: absolute;
  top: 20px;
  right: 30px;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 80px solid #ff6b35;
}

.beach__person {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: #8b4513;
  border-radius: 20px 20px 0 0;
}

.person__tablet {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 35px;
  background: #333;
  border-radius: 3px;
}

.beach__palm-1,
.beach__palm-2 {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 80px;
  background: #8b4513;
}

.beach__palm-1 {
  left: 20px;
}

.beach__palm-2 {
  right: 20px;
}

.beach__palm-1::before,
.beach__palm-2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid #228b22;
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
    flex-direction: column;
  }

  .auth-layout__left {
    flex: none;
    min-height: 30vh;
    padding: 1rem;
  }

  .auth-layout__right {
    flex: 1;
    padding: 1rem;
  }

  .logo {
    font-size: 1.75rem;
  }

  .slogan-main {
    font-size: 1.5rem;
  }

  .slogan-sub {
    font-size: 1rem;
  }

  .auth-layout__illustration {
    display: none;
  }
}

@media (max-width: 480px) {
  .auth-layout__left {
    min-height: 25vh;
    padding: 0.75rem;
  }

  .auth-layout__right {
    padding: 0.75rem;
  }

  .logo {
    font-size: 1.5rem;
  }

  .slogan-main {
    font-size: 1.25rem;
  }

  .slogan-sub {
    font-size: 0.9rem;
  }
}
</style>
