import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=FIgcOoLsqYx5vUQah7lSUof4EwBrRmjqh8fD1feb7uk&code_challenge=RAT7oXS6Vm05h4SW0Cz1pB5B7POcyS5lTGABbQwj0gA&code_challenge_method=S256');
  await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('d');
  await page.getByRole('textbox', { name: 'Tên tài khoản' }).click();
  await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('dangtrungkienk14@gmail.com');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kien@2025');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
});