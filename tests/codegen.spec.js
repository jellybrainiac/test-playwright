import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=0W7o2oVAIXiXM_GKnqGEbcwy5ihIgp4U5himCBDwANg&code_challenge=VpeD7ozWgVQBoBhZVoi-XmDmnnk8SPFxMP-yc68GdO4&code_challenge_method=S256');
  await page.getByRole('textbox', { name: 'Tên tài khoản' }).click();
  await page.getByRole('link', { name: 'Đăng ký' }).click();
  await page.getByRole('textbox', { name: 'Email (✶)' }).click();
  await page.getByRole('textbox', { name: 'Email (✶)' }).fill('dangtrungkienq14@gmail.com');
  await page.getByRole('textbox', { name: 'Tạo mật khẩu (✶)' }).click();
  await page.getByRole('textbox', { name: 'Tạo mật khẩu (✶)' }).fill('Kien@2025');
  await page.getByRole('button', { name: 'Tạo mới' }).click();
});