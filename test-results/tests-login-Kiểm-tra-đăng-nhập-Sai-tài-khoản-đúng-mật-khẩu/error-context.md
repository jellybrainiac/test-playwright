# Test info

- Name: Kiểm tra đăng nhập >>  Sai tài khoản & đúng mật khẩu
- Location: D:\oryza\tests\login.spec.js:17:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText(/Invalid username or password|Không thể đăng nhập/i)
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText(/Invalid username or password|Không thể đăng nhập/i)

    at D:\oryza\tests\login.spec.js:23:87
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
- textbox "Tên tài khoản": saiuser@gmail.com
- paragraph: Tài khoản hoặc mật khẩu không chính xác
- text: Mật khẩu
- textbox "Mật khẩu"
- button "toggle password visibility"
- paragraph: Tài khoản hoặc mật khẩu không chính xác
- checkbox "Nhớ tài khoản"
- text: Nhớ tài khoản
- link "Quên mật khẩu?":
  - /url: /realms/oryza-systems/login-actions/reset-credentials?client_id=oryza-metadata&tab_id=b2NpSybGBRU&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6ImZybFRKM1d6UWtuWExJUnFzc0VqQ3dKSTNIWUhVSWM0TU10OFF2M3AxN2sifQ
- button "Đăng nhập" [disabled]
- text: Bạn chưa có tài khoản?
- link "Đăng ký":
  - /url: /realms/oryza-systems/login-actions/registration?client_id=oryza-metadata&tab_id=b2NpSybGBRU&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6ImZybFRKM1d6UWtuWExJUnFzc0VqQ3dKSTNIWUhVSWM0TU10OFF2M3AxN2sifQ
- separator: Hoặc
- list:
  - listitem:
    - link "Tiếp tục với Google":
      - /url: /realms/oryza-systems/broker/google/login?client_id=oryza-metadata&tab_id=b2NpSybGBRU&client_data=eyJydSI6Imh0dHBzOi8vbWV0YWRhdGEub3J5emEudm4vYXBpL2F1dGgvY2FsbGJhY2sva2V5Y2xvYWsiLCJydCI6ImNvZGUiLCJzdCI6ImZybFRKM1d6UWtuWExJUnFzc0VqQ3dKSTNIWUhVSWM0TU10OFF2M3AxN2sifQ&session_code=vWbNHMDfCIFqtwcESBxynrxgJRygdXZUUmjOWYHn3io
- text: © 2025 Bản quyền thuộc Oryza JSC. Bảo lưu mọi quyền.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { email, password } from '../botlogin.js'; // Lấy tài khoản và mật khẩu từ botlogin.js
   3 |
   4 | const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=abc&code_challenge=xyz&code_challenge_method=S256';
   5 |
   6 | test.describe('Kiểm tra đăng nhập', () => {
   7 |   test(' Đúng tài khoản & đúng mật khẩu', async ({ page }) => {
   8 |     await page.goto(loginUrl);
   9 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill(email);
  10 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill(password);
  11 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  12 |
  13 |     await page.waitForNavigation({ waitUntil: 'networkidle' });
  14 |     await expect(page).toHaveURL(/metadata\.oryza\.vn/);
  15 |   });
  16 |
  17 |   test(' Sai tài khoản & đúng mật khẩu', async ({ page }) => {
  18 |     await page.goto(loginUrl);
  19 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
  20 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill(password);
  21 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  22 |
> 23 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
     |                                                                                       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  24 |   });
  25 |
  26 |   test(' Đúng tài khoản & sai mật khẩu', async ({ page }) => {
  27 |     await page.goto(loginUrl);
  28 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill(email);
  29 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('SaiPass@2025');
  30 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  31 |
  32 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  33 |   });
  34 |
  35 |   test(' Sai tài khoản & sai mật khẩu', async ({ page }) => {
  36 |     await page.goto(loginUrl);
  37 |     await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill('saiuser@gmail.com');
  38 |     await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('saiPassword123');
  39 |     await page.getByRole('button', { name: 'Đăng nhập' }).click();
  40 |
  41 |     await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  42 |   });
  43 |   test('Không nhập tài khoản và mật khẩu', async ({ page }) => {
  44 |   await page.goto(loginUrl);
  45 |   await page.getByRole('button', { name: 'Đăng nhập' }).click();
  46 |   await expect(page.getByText(/Tên tài khoản không được bỏ trống|Mật khẩu không được bỏ trống/i)).toBeVisible();
  47 |
  48 |   await expect(page.getByText(/Invalid username or password|Không thể đăng nhập/i)).toBeVisible();
  49 | });
  50 |
  51 | });
  52 |
```