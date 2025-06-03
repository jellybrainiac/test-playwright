import { chromium } from 'playwright';

export async function loginBot() {
  const email = 'dangtrungkienk14@gmail.com';
  const password = 'Kien@2025';
  const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=FIgcOoLsqYx5vUQah7lSUof4EwBrRmjqh8fD1feb7uk&code_challenge=RAT7oXS6Vm05h4SW0Cz1pB5B7POcyS5lTGABbQwj0gA&code_challenge_method=S256';

  const startTime = Date.now();

  console.log('Đang mở trang đăng nhập');
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(loginUrl);
  console.log('Đã mở trang đăng nhập.');
 // await page.screenshot({ path: '1_login_page.png' });
  
  

  console.log(' Đang nhập tên tài khoản');
  await page.getByRole('textbox', { name: 'Tên tài khoản' }).fill(email);
  await page.screenshot({ path: '2_email_filled.png' });
  console.log(' Đã nhập tên tài khoản.');
  

  console.log(' Đang nhập mật khẩu');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill(password);
  console.log(' Đã nhập mật khẩu.');
  await page.screenshot({ path: '3_password_filled.png' });
 

  console.log(' Đang bấm nút "Đăng nhập"');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  console.log(' Đã bấm nút "Đăng nhập".');
 // await page.screenshot({ path: '4_clicked_login.png' });
  

  console.log('Đang chờ kết quả');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '5_after_login.png' });

  await browser.close();
  console.log('Bot hoàn thành và đã đóng trình duyệt.');
  const endTime = Date.now();
  const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`Tổng thời gian chạy bot: ${elapsedSeconds} giây.`);
  process.exit(0);
}

// --- CHẠY BOT ---
// loginBot().catch(() => process.exit(1));
