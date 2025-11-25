import { test, expect } from '@playwright/test'

const baseURL = process.env.BASE_URL || 'http://localhost:3000'
const email = process.env.TEST_EMAIL
const password = process.env.TEST_PASSWORD

test('login, view todo, logout', async ({ page }) => {
  test.skip(!email || !password, 'TEST_EMAIL/TEST_PASSWORD not set')

  await page.goto(`${baseURL}/login`)
  await page.getByPlaceholder('メールアドレス').fill(email as string)
  await page.getByPlaceholder('パスワード').fill(password as string)
  await page.getByRole('button', { name: 'ログイン' }).click()

  await page.waitForURL(`${baseURL}/`)
  await expect(page.getByRole('heading', { name: 'TODO' })).toBeVisible()

  await page.getByRole('button', { name: 'ログアウト' }).click()
  await page.waitForURL(`${baseURL}/login`)
  await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible()
})
