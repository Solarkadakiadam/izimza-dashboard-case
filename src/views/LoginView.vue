<template>
  <div class="login-form">
    <h2 class="form-title">Giriş Yap</h2>

    <Form
      @submit="handleLogin"
      :validation-schema="validationSchema"
      :validate-on-input="false"
      :validate-on-blur="true"
    >
      <div class="form">
        <Field name="email" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="login-email" class="form-label">E-Posta</label>
            <InputText
              id="login-email"
              v-bind="field"
              type="email"
              autocomplete="email"
              placeholder="ornek@email.com"
              :class="{ 'p-invalid': errorMessage }"
              class="form-input"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field name="password" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="login-password" class="form-label">Şifre</label>
            <Password
              input-id="login-password"
              v-bind="field"
              autocomplete="current-password"
              placeholder="Şifrenizi girin"
              :input-class="{ 'p-invalid': errorMessage }"
              class="form-input"
              toggleMask
              :feedback="false"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field
          name="rememberMe"
          v-slot="{ field, handleChange }"
          type="checkbox"
          :value="true"
          :unchecked-value="false"
        >
          <div class="form-group form-group--checkbox">
            <div class="checkbox-container">
              <Checkbox
                input-id="login-remember"
                :model-value="field.value"
                @update:model-value="handleChange"
                binary
              />
              <label for="login-remember" class="form-label form-label--checkbox">
                Beni Hatırla
              </label>
            </div>
          </div>
        </Field>

        <Button
          type="submit"
          label="Oturum Aç"
          class="form-button form-button--primary"
          :loading="isLoading"
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
          <router-link :to="{ name: 'Register' }" class="form-link"> Kayıt Ol </router-link>
          <a href="#" class="form-link" @click.prevent="handleForgotPassword"> Şifre Sıfırla </a>
        </div>
      </div>
    </Form>

    <div class="demo-users">
      <h4 class="demo-title">Demo Kullanıcılar:</h4>
      <div class="demo-user"><strong>omer@izimza.com</strong> / <code>123456</code></div>
      <div class="demo-user"><strong>test@izimza.com</strong> / <code>test123</code></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth'
import type { LoginCredentials } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const isLoading = ref(false)

const validationSchema = yup.object({
  email: yup
    .string()
    .required('E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi girin'),
  password: yup.string().required('Şifre gereklidir').min(6, 'Şifre en az 6 karakter olmalıdır'),
  rememberMe: yup.boolean(),
})

const handleLogin = async (values: Record<string, unknown>) => {
  isLoading.value = true

  try {
    const success = await authStore.login(values as unknown as LoginCredentials)

    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Giriş başarılı! Yönlendiriliyorsunuz...',
        life: 2000,
      })
      setTimeout(() => {
        router.push({ name: 'Dashboard' })
      }, 500)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'E-posta veya şifre hatalı',
        life: 3000,
      })
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Hata',
      detail: 'Giriş yapılırken bir hata oluştu',
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  toast.add({
    severity: 'info',
    summary: 'Bilgi',
    detail: 'Şifre sıfırlama özelliği yakında eklenecek',
    life: 3000,
  })
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
  gap: 1rem;
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
