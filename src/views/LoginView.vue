<template>
  <AuthLayout>
    <div class="login-form">
      <h2 class="form-title">Giriş Yap</h2>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="email" class="form-label">E-Posta</label>
          <InputText
            id="email"
            v-model="form.email"
            type="email"
            placeholder="ornek@email.com"
            :class="{ 'p-invalid': errors.email }"
            class="form-input"
          />
          <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Şifre</label>
          <Password
            id="password"
            v-model="form.password"
            placeholder="Şifrenizi girin"
            :class="{ 'p-invalid': errors.password }"
            class="form-input"
            toggleMask
            :feedback="false"
          />
          <small v-if="errors.password" class="form-error">{{ errors.password }}</small>
        </div>

        <div class="form-group form-group--checkbox">
          <div class="checkbox-container">
            <Checkbox id="remember" v-model="form.rememberMe" binary />
            <label for="remember" class="form-label form-label--checkbox"> Beni Hatırla </label>
          </div>
        </div>

        <Button
          type="submit"
          label="Oturum Aç"
          class="form-button form-button--primary"
          :loading="isLoading"
          :disabled="!isFormValid"
        />

        <div class="form-divider">
          <span>veya</span>
        </div>

        <div class="form-alternatives">
          <Button
            label="E-İmza İle"
            icon="pi pi-id-card"
            severity="secondary"
            outlined
            class="form-button form-button--alternative"
          />
          <Button
            label="Mobil İmza İle"
            icon="pi pi-mobile"
            severity="secondary"
            outlined
            class="form-button form-button--alternative"
          />
        </div>

        <div class="form-links">
          <router-link to="/register" class="form-link"> Kayıt Ol </router-link>
          <a href="#" class="form-link" @click.prevent="handleForgotPassword"> Şifre Sıfırla </a>
        </div>
      </form>

      <!-- Demo Users Info -->
      <div class="demo-users">
        <h4 class="demo-title">Demo Kullanıcılar:</h4>
        <div class="demo-user"><strong>omer@izimza.com</strong> / <code>123456</code></div>
        <div class="demo-user"><strong>test@izimza.com</strong> / <code>test123</code></div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'
import type { LoginCredentials } from '@/types/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<LoginCredentials>({
  email: '',
  password: '',
  rememberMe: false,
})

const errors = ref<Record<string, string>>({})
const isLoading = ref(false)

const isFormValid = computed(() => {
  return form.value.email && form.value.password && !Object.keys(errors.value).length
})

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.email) {
    errors.value.email = 'E-posta adresi gereklidir'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Geçerli bir e-posta adresi girin'
  }

  if (!form.value.password) {
    errors.value.password = 'Şifre gereklidir'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Şifre en az 6 karakter olmalıdır'
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    const success = await authStore.login(form.value)

    if (success) {
      router.push({ name: 'Dashboard' })
    } else {
      errors.value.general = 'E-posta veya şifre hatalı'
    }
  } catch {
    errors.value.general = 'Giriş yapılırken bir hata oluştu'
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
}
</script>

<style scoped>
.login-form {
  width: 100%;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #495057;
  margin: 0 0 2rem 0;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
}

.form-group--checkbox {
  flex-direction: row;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-label--checkbox {
  margin: 0;
  font-weight: 500;
}

.form-input {
  width: 100%;
}

/* Fix Password component alignment */
:deep(.p-password) {
  width: 100%;
}

:deep(.p-password .p-password-input) {
  width: 100%;
}

:deep(.p-password .p-password-toggle) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.form-button {
  width: 100%;
  height: 3rem;
  font-weight: 600;
}

.form-button--primary {
  background: #1976d2;
  border-color: #1976d2;
}

.form-button--primary:hover {
  background: #1565c0;
  border-color: #1565c0;
}

.form-button--alternative {
  flex: 1;
  height: 2.5rem;
}

.form-divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #6c757d;
  font-size: 0.875rem;
  margin: 0.5rem 0;
}

.form-divider::before,
.form-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e9ecef;
}

.form-divider span {
  padding: 0 1rem;
}

.form-alternatives {
  display: flex;
  gap: 0.75rem;
}

.form-links {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.form-link {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-link:hover {
  text-decoration: underline;
}

.form-error {
  color: #dc3545;
  font-size: 0.75rem;
}

.demo-users {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.demo-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #495057;
  margin: 0 0 0.75rem 0;
}

.demo-user {
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.demo-user:last-child {
  margin-bottom: 0;
}

.demo-user code {
  background: #e9ecef;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.75rem;
  color: #495057;
}

/* Responsive */
@media (max-width: 480px) {
  .form-alternatives {
    flex-direction: column;
  }

  .form-button--alternative {
    flex: none;
  }

  .form-links {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
