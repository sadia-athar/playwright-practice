import { test, expect } from '@playwright/test';

test.describe('SauceDemo E2E Tests', function () {
    test.beforeEach(async function ({ page }) {
        await page.goto('/');
        
    });
    async function login(page) {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    }

    test('Login with valid username and password', async function ({ page }) {
         await login(page); 
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('verify product page successfully load', async function ({ page }) {
        await login(page); 
        const products = page.locator('.inventory_list');
        await expect(products).toBeVisible();
    });

    test('Add a product to cart', async function ({ page }) {
        await login(page); 
        await page.click('#add-to-cart-sauce-labs-backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });


    test('Remove a product from cart', async function ({ page }) {
        await login(page); 
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('#remove-sauce-labs-backpack');
        const locator = page.locator('.inventory_item_name'); 
        await expect(locator).toBeHidden(); 

    
    });

    test('Checkout flow ', async function ({ page }) {
        await login(page); 
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await page.fill('#first-name', 'Sadia');
        await page.fill('#last-name', 'Arain');
        await page.fill('#postal-code', '023');
        await page.click('#continue');
        await page.click('#finish');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    test('Logout ', async function ({ page }) {
         await login(page); 
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('Login with wrong username or password', async function ({ page }) {
        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        const errormessage = page.locator('h3[data-test="error"]');
        await expect(errormessage).toContainText('Sorry, this user has been locked out.');
        
    });

});


