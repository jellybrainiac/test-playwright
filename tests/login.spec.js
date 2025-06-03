import { test, expect } from '@playwright/test';

const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=abc&code_challenge=xyz&code_challenge_method=S256';

test.describe('Kiểm tra đăng nhập', () => {
  test(' Đúng tài khoản & đúng mật khẩu', async ({ page }) => {
    await page.goto(loginUrl);
    await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('dangtrungkienk14@gmail.com');
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kien@2025');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/metadata\.oryza\.vn/);
  });

  test(' Sai tài khoản & đúng mật khẩu', async ({ page }) => {
    await page.goto(loginUrl);
    await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kien@2025');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();


    await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  });

  test('Đúng tài khoản & sai mật khẩu', async ({ page }) => {
    await page.goto(loginUrl);
    await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('dangtrungkienk14@gmail.com');
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('SaiPass@2025');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  });

  test(' Sai tài khoản & sai mật khẩu', async ({ page }) => {
    await page.goto(loginUrl);
    await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('saiPassword123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  });
});
