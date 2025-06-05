import { test, expect } from '@playwright/test';

const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=abc&code_challenge=xyz&code_challenge_method=S256';

// Test data
const validEmail = 'testuser' + Date.now() + '@gmail.com';
const validPassword = 'TestPass@2025';
const existingEmail = 'dangtrungkien14d@gmail.com';
const invalidEmail = 'invalid-email';
const weakPassword = '123';

// Run tests in parallel
test.describe.configure({ mode: 'parallel' });

// Helper để fill form đăng ký
async function fillRegistrationForm(page, email, password, confirmPassword) {
  await page.getByRole('textbox', { name: /email|tên tài khoản/i }).type(email, { delay: 0 });
  await page.locator('input[type="password"]').nth(0).type(password, { delay: 0 });
  await page.locator('input[type="password"]').nth(1).type(confirmPassword, { delay: 0 });
}

test.describe('Kiểm tra đăng ký tài khoản', () => {

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(15000);
  });

  test(' Đăng ký thành công với thông tin hợp lệ', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await fillRegistrationForm(page, validEmail, validPassword, validPassword);
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/đăng ký thành công|tài khoản đã được tạo|registration successful/i)).toBeVisible({ timeout: 8000 });
  });

  test(' Đăng ký thất bại với email đã tồn tại', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await fillRegistrationForm(page, existingEmail, validPassword, validPassword);
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/email đã tồn tại|email already exists|user exists/i)).toBeVisible({ timeout: 8000 });
  });

  test(' Đăng ký thất bại với email không hợp lệ', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await fillRegistrationForm(page, invalidEmail, validPassword, validPassword);
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/email không hợp lệ|invalid email|email format/i)).toBeVisible({ timeout: 8000 });
  });

  test(' Đăng ký thất bại với mật khẩu yếu', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await fillRegistrationForm(page, validEmail, weakPassword, weakPassword);
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/mật khẩu quá yếu|password too weak|minimum.*characters/i)).toBeVisible({ timeout: 8000 });
  });

  test('Đăng ký thất bại với mật khẩu không khớp', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await fillRegistrationForm(page, validEmail, validPassword, 'DifferentPass@2025');
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/mật khẩu không khớp|passwords do not match|password mismatch/i)).toBeVisible({ timeout: 8000 });
  });

  test('Đăng ký thất bại khi bỏ trống các trường bắt buộc', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/email.*bắt buộc|email.*required/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/mật khẩu.*bắt buộc|password.*required/i)).toBeVisible({ timeout: 5000 });
  });

  test(' Đăng ký thất bại khi chỉ điền email', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /đăng ký/i }).click({ force: true });

    await page.getByRole('textbox', { name: /email|tên tài khoản/i }).type(validEmail, { delay: 0 });
    await page.getByRole('button', { name: /tạo mới|đăng ký/i }).click({ force: true });

    await expect(page.getByText(/mật khẩu.*bắt buộc|password.*required/i)).toBeVisible({ timeout: 5000 });
  });

});
