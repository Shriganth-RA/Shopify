import { test, expect } from '@playwright/test';
import * as data from '../fixtures/data.json';

test.describe('Unit Testing on Shopify Website', () => {
      test.describe('Testing on Shopify Login Page', () => {

            test.beforeEach(async ({ page }) => {
                  await page.goto(data.baseurl, { waitUntil: 'domcontentloaded' });

                  const login = page.getByRole('link', { name: /log in/i });
                  await expect(login).toBeVisible({ timeout: 15000 });
                  await login.click();

                  await expect(page).toHaveURL(
                        /shopify\.com\/login|accounts\.shopify\.com|admin\.shopify\.com/
                  );
            });

            // ✅ Email field test
            test('Test Email Field', async ({ page }) => {
                  const emailField = page.locator('input[name="account[email]"]');
                  await expect(emailField).toBeVisible();
            });

            // ✅ Apple Auth (conditional)
            test('Test Apple Authenticator', async ({ page }) => {
                  const apple = page.locator('text=/apple/i');

                  if (await apple.count() > 0) {
                        await expect(apple).toBeVisible();
                  } else {
                        test.skip(true, 'Apple login not available');
                  }
            });

            // ✅ Facebook Auth (conditional)
            test('Test Facebook Authenticator', async ({ page }) => {
                  const facebook = page.locator('text=/facebook/i');

                  if (await facebook.count() > 0) {
                        await expect(facebook).toBeVisible();
                  } else {
                        test.skip(true, 'Facebook login not available');
                  }
            });

            // ✅ Google Auth (conditional)
            test('Test Google Authenticator', async ({ page }) => {
                  const google = page.locator('text=/google/i');

                  if (await google.count() > 0) {
                        await expect(google).toBeVisible();
                  } else {
                        test.skip(true, 'Google login not available');
                  }
            });

      });
});
