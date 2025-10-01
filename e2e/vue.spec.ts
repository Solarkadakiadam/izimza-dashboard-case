import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/auth/login')

    await expect(page.locator('.form-title')).toHaveText('Giriş Yap')

    await page.fill('input[type="email"]', 'omer@izimza.com')
    await page.fill('input[type="password"]', '123456')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('.welcome-title')).toContainText('Merhaba')
  })

  test('should register new user', async ({ page }) => {
    await page.goto('/auth/register')

    await expect(page.locator('.form-title')).toHaveText('Kayıt Ol')

    await page.fill('input[name="name"]', 'Test')
    await page.fill('input[name="surname"]', 'User')
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'test123456')
    await page.fill('input[name="passwordConfirm"]', 'test123456')

    await page.click('input[type="checkbox"]')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
  })

  test('should navigate between login and register', async ({ page }) => {
    await page.goto('/auth/login')

    await page.click('text=Kayıt Ol')
    await expect(page).toHaveURL('/auth/register')

    await page.click("text=Giriş'e geri dön")
    await expect(page).toHaveURL('/auth/login')
  })

  test('should show validation errors', async ({ page }) => {
    await page.goto('/auth/login')

    await page.click('button[type="submit"]')

    await expect(page.locator('text=E-posta adresi gereklidir')).toBeVisible()
    await expect(page.locator('text=Şifre gereklidir')).toBeVisible()
  })
})
