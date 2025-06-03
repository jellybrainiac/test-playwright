import { chromium } from 'playwright';
import cron from 'node-cron';

// --- Hàm tạo email ngẫu nhiên ---
function generateRandomEmail() {
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${randomStr}@gmail.com`;
}

async function runBot() {
  

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });

  const page = await browser.newPage();

  // --- Bước 1: Mở trang đăng nhập ---
  await page.goto('https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=myvUe1UZqVq4uSBGE26tSNWhZPljeJJGE2Zg1RIHS4E&code_challenge=4tA1XV_NzYeJG2Gi3VkcsM9Pbdr1PCAoWfHbn3gQ6UQ&code_challenge_method=S256');
  console.log('✅ Đã mở trang đăng nhập');

  // --- Bước 2: Nhấn nút "Đăng ký" ---
  await page.getByRole('link', { name: 'Đăng ký' }).click();
  console.log('✅ Đã nhấn nút "Đăng ký"');

  // --- Bước 3: Tạo email ngẫu nhiên và nhập ---
  const randomEmail = generateRandomEmail();
  await page.getByRole('textbox', { name: /Email/i }).fill(randomEmail);
  console.log(`✅ Đã nhập email: ${randomEmail}`);

  // --- Bước 4: Nhập mật khẩu ---
  await page.getByRole('textbox', { name: /Tạo mật khẩu/i }).fill('Kien@2025');
  console.log('✅ Đã nhập mật khẩu');

  // --- Bước 5: Nhấn nút "Tạo mới" ---
  await page.getByRole('button', { name: /Tạo mới/i }).click();
  console.log('✅ Đã nhấn nút "Tạo mới"');

  // --- Đợi thêm vài giây để quan sát kết quả ---
  await page.waitForTimeout(5000);

  await browser.close();
  

  // --- THOÁT chương trình hoàn toàn ---
  process.exit(0);
}

// --- NẾU MUỐN CHẠY NGAY ---
runBot().catch(err => {
  console.error('❌ Bot lỗi:', err);
  process.exit(1); // Thoát với mã lỗi
});
