import { chromium } from 'playwright';
import readline from 'readline';

const email = 'dangtrungkienkk14@gmail.com';
const password = 'Kien@2025';

const loginUrl = 'https://sso.oryza.vn/realms/oryza-systems/protocol/openid-connect/auth?client_id=oryza-metadata&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fmetadata.oryza.vn%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=abc&code_challenge=xyz&code_challenge_method=S256';


// Hàm để đợi user input
function waitForUserInput(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

(async () => {
  let browser;
  
  try {
    // Khởi động browser
    browser = await chromium.launch({ 
      headless: false,
      slowMo: 500 // Làm chậm các thao tác để dễ theo dõi
    });
    
    const page = await browser.newPage();
    
    // Thiết lập timeout dài hơn
    page.setDefaultTimeout(30000);

    console.log('🚀 Đang mở trang đăng nhập...');
    await page.goto(loginUrl);

    // Đợi trang load xong
    await page.waitForLoadState('networkidle');

    console.log('📝 Tìm và click nút Đăng ký...');
    
    // Thử nhiều cách để tìm nút đăng ký
    try {
      // Thử tìm theo text
      await page.getByRole('link', { name: /đăng ký/i }).click({ timeout: 5000 });
    } catch (error) {
      console.log('⚠️ Không tìm thấy link "Đăng ký", thử tìm button...');
      try {
        await page.getByRole('button', { name: /đăng ký/i }).click({ timeout: 5000 });
      } catch (error2) {
        console.log(' Không tìm thấy button "Đăng ký", thử selector CSS...');
        await page.click('text=Đăng ký', { timeout: 5000 });
      }
    }

    // Đợi form đăng ký xuất hiện
    await page.waitForLoadState('networkidle');
    console.log(' Đã vào trang đăng ký');

    console.log(' Đang điền email...');
    // Tìm và điền email - thử nhiều cách
    try {
      await page.getByRole('textbox', { name: /email/i }).fill(email);
    } catch (error) {
      // Thử cách khác nếu không tìm thấy
      await page.fill('input[type="email"]', email);
    }

    console.log('🔐 Đang điền mật khẩu...');
    // Điền mật khẩu
    const passwordFields = await page.getByRole('textbox', { name: /mật khẩu|password/i }).all();
    
    if (passwordFields.length >= 1) {
      await passwordFields[0].fill(password); // Mật khẩu
    }
    
    if (passwordFields.length >= 2) {
      await passwordFields[1].fill(password); // Xác nhận mật khẩu
    }

    // Kiểm tra có fields nào khác cần điền không
    const allInputs = await page.locator('input[type="text"], input[type="email"], input[type="password"]').all();
    console.log(` Tìm thấy ${allInputs.length} input fields`);

    console.log(' Tìm nút submit...');
    // Click nút đăng ký/tạo mới
    try {
      await page.getByRole('button', { name: /tạo mới|đăng ký|register|submit/i }).click();
    } catch (error) {
      console.log('⚠️ Không tìm thấy nút submit, thử tìm bằng CSS selector...');
      await page.click('button[type="submit"], input[type="submit"]');
    }

    console.log('⏸ Vui lòng xác nhận email hoặc hoàn tất các bước thủ công...');
    await waitForUserInput('Nhấn Enter khi đã hoàn tất xác nhận: ');

    console.log(' Tiếp tục bot sau khi xác nhận...');

  } catch (error) {
    console.error(' Lỗi:', error.message);
  } finally {
    // Hỏi user có muốn đóng browser không
    const shouldClose = await waitForUserInput('Đóng trình duyệt? (y/n): ');
    
    if (shouldClose.toLowerCase() === 'y' && browser) {
      await browser.close();
      console.log('Đã đóng trình duyệt');
    }
  }
})();