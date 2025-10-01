<template>
  <div class="register-form">
    <h2 class="form-title">Kayıt Ol</h2>

    <Form
      @submit="handleRegister"
      :validation-schema="validationSchema"
      :validate-on-input="false"
      :validate-on-blur="true"
    >
      <div class="form">
        <Field name="name" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="register-name" class="form-label">Ad *</label>
            <InputText
              id="register-name"
              v-bind="field"
              autocomplete="given-name"
              placeholder="Adınızı girin"
              :class="{ 'p-invalid': errorMessage }"
              class="form-input"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field name="surname" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="register-surname" class="form-label">Soyad *</label>
            <InputText
              id="register-surname"
              v-bind="field"
              autocomplete="family-name"
              placeholder="Soyadınızı girin"
              :class="{ 'p-invalid': errorMessage }"
              class="form-input"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field name="email" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="register-email" class="form-label">E-Posta *</label>
            <InputText
              id="register-email"
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
            <label for="register-password" class="form-label">Şifre *</label>
            <Password
              input-id="register-password"
              v-bind="field"
              autocomplete="new-password"
              placeholder="Şifrenizi girin"
              :input-class="{ 'p-invalid': errorMessage }"
              class="form-input"
              toggleMask
              :feedback="true"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field name="passwordConfirm" v-slot="{ field, errorMessage }">
          <div class="form-group">
            <label for="register-password-confirm" class="form-label">Şifre Doğrulama *</label>
            <Password
              input-id="register-password-confirm"
              v-bind="field"
              autocomplete="new-password"
              placeholder="Şifrenizi tekrar girin"
              :input-class="{ 'p-invalid': errorMessage }"
              class="form-input"
              toggleMask
              :feedback="false"
            />
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Field
          name="acceptTerms"
          v-slot="{ field, errorMessage, handleChange }"
          type="checkbox"
          :value="true"
          :unchecked-value="false"
        >
          <div class="form-group form-group--checkbox">
            <div class="checkbox-container">
              <Checkbox
                input-id="register-terms"
                :model-value="field.value"
                @update:model-value="handleChange"
                binary
                :class="{ 'p-invalid': errorMessage }"
              />
              <label for="register-terms" class="form-label form-label--checkbox">
                İzimza Kullanım Şartları'nı kabul ediyorum. Aydınlatma Metni'ni okudum ve anladım. *
              </label>
            </div>
            <small v-if="errorMessage" class="form-error">{{ errorMessage }}</small>
          </div>
        </Field>

        <Button
          type="submit"
          label="Kayıt Ol"
          class="form-button form-button--primary"
          :loading="isLoading"
        />

        <div class="form-links">
          <router-link :to="{ name: 'Login' }" class="form-link form-link--back">
            ← Giriş'e geri dön
          </router-link>
        </div>
      </div>
    </Form>
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
import type { RegisterData } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const isLoading = ref(false)

// Validation schema with Yup
const validationSchema = yup.object({
  name: yup.string().required('Ad gereklidir'),
  surname: yup.string().required('Soyad gereklidir'),
  email: yup
    .string()
    .required('E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi girin'),
  password: yup.string().required('Şifre gereklidir').min(6, 'Şifre en az 6 karakter olmalıdır'),
  passwordConfirm: yup
    .string()
    .required('Şifre doğrulama gereklidir')
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor'),
  acceptTerms: yup
    .boolean()
    .required('Kullanım şartlarını kabul etmelisiniz')
    .oneOf([true], 'Kullanım şartlarını kabul etmelisiniz'),
})

const handleRegister = async (values: Record<string, unknown>) => {
  isLoading.value = true

  try {
    const success = await authStore.register(values as unknown as RegisterData)

    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Kayıt başarılı! Hoş geldiniz...',
        life: 2000,
      })
      setTimeout(() => {
        router.push({ name: 'Dashboard' })
      }, 500)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'Bu e-posta adresi zaten kullanılıyor',
        life: 3000,
      })
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Hata',
      detail: 'Kayıt olurken bir hata oluştu',
      life: 3000,
    })
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
  flex-direction: column;
  align-items: flex-start;
}

.checkbox-container {
  display: flex;
  align-items: center;
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
