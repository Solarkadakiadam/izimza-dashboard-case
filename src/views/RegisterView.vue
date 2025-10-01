<template>
  <AuthLayout>
    <div class="register-form">
      <h2 class="form-title">Kayıt Ol</h2>

      <form @submit.prevent="handleRegister" class="form">
        <div class="form-group">
          <label for="name" class="form-label">Ad *</label>
          <InputText
            id="name"
            v-model="form.name"
            placeholder="Adınızı girin"
            :class="{ 'p-invalid': errors.name }"
            class="form-input"
          />
          <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
        </div>

        <div class="form-group">
          <label for="surname" class="form-label">Soyad *</label>
          <InputText
            id="surname"
            v-model="form.surname"
            placeholder="Soyadınızı girin"
            :class="{ 'p-invalid': errors.surname }"
            class="form-input"
          />
          <small v-if="errors.surname" class="form-error">{{ errors.surname }}</small>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">E-Posta *</label>
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
          <label for="password" class="form-label">Şifre *</label>
          <Password
            id="password"
            v-model="form.password"
            placeholder="Şifrenizi girin"
            :class="{ 'p-invalid': errors.password }"
            class="form-input"
            toggleMask
            :feedback="true"
          />
          <small v-if="errors.password" class="form-error">{{ errors.password }}</small>
        </div>

        <div class="form-group">
          <label for="passwordConfirm" class="form-label">Şifre Doğrulama *</label>
          <Password
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            placeholder="Şifrenizi tekrar girin"
            :class="{ 'p-invalid': errors.passwordConfirm }"
            class="form-input"
            toggleMask
            :feedback="false"
          />
          <small v-if="errors.passwordConfirm" class="form-error">{{
            errors.passwordConfirm
          }}</small>
        </div>

        <div class="form-group form-group--checkbox">
          <div class="checkbox-container">
            <Checkbox
              id="terms"
              v-model="form.acceptTerms"
              binary
              :class="{ 'p-invalid': errors.acceptTerms }"
            />
            <label for="terms" class="form-label form-label--checkbox">
              İzimza Kullanım Şartları'nı kabul ediyorum. Aydınlatma Metni'ni okudum ve anladım. *
            </label>
          </div>
          <small v-if="errors.acceptTerms" class="form-error">{{ errors.acceptTerms }}</small>
        </div>

        <Button
          type="submit"
          label="Kayıt Ol"
          class="form-button form-button--primary"
          :loading="isLoading"
          :disabled="!isFormValid"
        />

        <div class="form-links">
          <router-link to="/login" class="form-link form-link--back">
            ← Giriş'e geri dön
          </router-link>
        </div>
      </form>
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
import type { RegisterData } from '@/types/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<RegisterData>({
  name: '',
  surname: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: false,
})

const errors = ref<Record<string, string>>({})
const isLoading = ref(false)

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.surname &&
    form.value.email &&
    form.value.password &&
    form.value.passwordConfirm &&
    form.value.acceptTerms &&
    !Object.keys(errors.value).length
  )
})

const validateForm = (): boolean => {
  errors.value = {}

  if (!form.value.name) {
    errors.value.name = 'Ad gereklidir'
  }

  if (!form.value.surname) {
    errors.value.surname = 'Soyad gereklidir'
  }

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

  if (!form.value.passwordConfirm) {
    errors.value.passwordConfirm = 'Şifre doğrulama gereklidir'
  } else if (form.value.password !== form.value.passwordConfirm) {
    errors.value.passwordConfirm = 'Şifreler eşleşmiyor'
  }

  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = 'Kullanım şartlarını kabul etmelisiniz'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    const success = await authStore.register(form.value)

    if (success) {
      router.push({ name: 'Dashboard' })
    } else {
      errors.value.general = 'Bu e-posta adresi zaten kullanılıyor'
    }
  } catch {
    errors.value.general = 'Kayıt olurken bir hata oluştu'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-form {
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
  flex-direction: column;
  align-items: flex-start;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
}

.form-label--checkbox {
  margin: 0;
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.4;
  flex: 1;
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

.form-links {
  display: flex;
  justify-content: center;
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

.form-link--back {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-error {
  color: #dc3545;
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 480px) {
  .form-links {
    text-align: center;
  }
}
</style>
