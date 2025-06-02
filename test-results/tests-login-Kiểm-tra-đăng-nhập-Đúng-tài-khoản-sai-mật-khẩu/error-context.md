# Test info

- Name: Kiểm tra đăng nhập >> Đúng tài khoản & sai mật khẩu
- Location: D:\oryza\tests\login.spec.js:28:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText(/Invalid username or password|Không thể đăng nhập/i)
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText(/Invalid username or password|Không thể đăng nhập/i)

    at D:\oryza\tests\login.spec.js:34:87
```

# Page snapshot

```yaml
- paragraph: ORYZA SYSTEMS
- paragraph: ĐƠN GIẢN HOÁ CÔNG NGHỆ - KẾT NỐI THẾ GIỚI,
- paragraph: CHIA SẺ TƯƠNG LAI, NÂNG TẦM THƯƠNG HIỆU VIỆT.
- paragraph: ĐƠN GIẢN HOÁ CÔNG NGHỆ
- paragraph: Chúng tôi luôn mang đến cho khách hàng những sản phẩm với chất lượng tốt nhất và trang bị những công nghệ tiên tiến nhất.
- paragraph: DẪN ĐẦU VỀ PHÁT TRIỂN IOT
- paragraph: Được hơn hàng trăm tổ chức tin cậy, Oryza Systems đã và đang xây dựng các giải pháp giám sát an ninh bằng việc tích hợp các thiết bị ngoại vi liền mạch đằng sau một nền tảng phần mềm do chính chúng tôi xây dựng dựa trên công nghệ đám mây.
- banner:
  - heading "Đăng nhập" [level=1]
- paragraph: Vui lòng chọn hình thức đăng nhập
- radiogroup "method":
  - radio "Tài khoản đăng ký" [checked]
  - text: Tài khoản đăng ký
  - radio "Số điện thoại"
  - text: Số điện thoại
- text: Tên tài khoản
- textbox "Tên tài khoản": dangtrungkienk14@gmail.com
- paragraph: Tài khoản hoặc mật khẩu không chính xác
- text: Mật khẩu
- textbox "Mật khẩu"
- button "toggle password visibility"
- paragraph: Tài khoản hoặc mật khẩu không chính xác
- checkbox "Nhớ tài khoản"
- text: Nhớ tài khoản
- link "Quên mật khẩu?":
  - /url: /realms/oryza-systems/login-actions/reset-credentials?client_id=oryza-metadata&tab_id=f7_X53MtkWk&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6Im82cVNuSnA2bmo2UlZLdC00bGozNDBXNXFnWk9RS1hVWXg0dmNmX3NFRkUifQ
- button "Đăng nhập" [disabled]
- text: Bạn chưa có tài khoản?
- link "Đăng ký":
  - /url: /realms/oryza-systems/login-actions/registration?client_id=oryza-metadata&tab_id=f7_X53MtkWk&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6Im82cVNuSnA2bmo2UlZLdC00bGozNDBXNXFnWk9RS1hVWXg0dmNmX3NFRkUifQ
- separator: Hoặc
- list:
  - listitem:
    - link "Tiếp tục với Google":
      - /url: /realms/oryza-systems/broker/google/login?client_id=oryza-metadata&tab_id=f7_X53MtkWk&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6Im82cVNuSnA2bmo2UlZLdC00bGozNDBXNXFnWk9RS1hVWXg0dmNmX3NFRkUifQ&session_code=Awl_cbn3Pigit4Zbw90_ELdTwKLSfoE64lpcbZilr3M
- text: © 2025 Bản quyền thuộc Oryza JSC. Bảo lưu mọi quyền.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=abc&code_challenge=xyz&code_challenge_method=S256';
   4 |
   5 | test.describe('Kiểm tra đăng nhập', () => {
   6 |   test(' Đúng tài khoản & đúng mật khẩu', async ({ page }) => {
   7 |     await page.goto(loginUrl);
   8 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('dangtrungkienk14@gmail.com');
   9 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kien@2025');
  10 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  11 |
  12 |     
  13 |     await page.waitForLoadState('networkidle');
  14 |
  15 |     await expect(page).toHaveURL(/metadata\.oryza\.vn/);
  16 |   });
  17 |
  18 |   test(' Sai tài khoản & đúng mật khẩu', async ({ page }) => {
  19 |     await page.goto(loginUrl);
  20 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
  21 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Kien@2025');
  22 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  23 |
  24 |
  25 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  26 |   });
  27 |
  28 |   test('Đúng tài khoản & sai mật khẩu', async ({ page }) => {
  29 |     await page.goto(loginUrl);
  30 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('dangtrungkienk14@gmail.com');
  31 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('SaiPass@2025');
  32 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  33 |
> 34 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
     |                                                                                       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  35 |   });
  36 |
  37 |   test(' Sai tài khoản & sai mật khẩu', async ({ page }) => {
  38 |     await page.goto(loginUrl);
  39 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
  40 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('saiPassword123');
  41 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  42 |
  43 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  44 |   });
  45 | });
  46 |
```