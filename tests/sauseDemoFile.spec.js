import { test, expect } from '@playwright/test';
import data from '../test-Data/data.json';

import { LoginPage } from '../Pages/loginPage.js';
import { invalidPage } from '../Pages/invalidPage.js';
import { ProductsPage } from '../Pages/productPage.js';
import { CartPage } from '../Pages/cartPage.js';
import { CheckoutPage } from '../Pages/checkoutPage.js';
import { LogoutPage } from '../Pages/logoutPage.js';

test.describe('SauceDemo POM', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
       // await loginPage.goto();
        await page.goto('/');
    });

    test('Login with valid username and password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('Verify product page successfully load', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('Add a product to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await productsPage.addProductToCart();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('Remove a product from cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await productsPage.addProductToCart();
        await cartPage.openCart();
        await cartPage.removeProduct();

        await expect(page.locator('.inventory_item_name')).toBeHidden();
    });

    test('Checkout flow', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await productsPage.addProductToCart();
        await cartPage.openCart();
        await cartPage.goToCheckout();

        await checkoutPage.fillDetails(
            data.checkout.firstName,
            data.checkout.lastName,
            data.checkout.postalCode
        );

        await checkoutPage.finishCheckout();

        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');
    });

    test('Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const logoutPage = new LogoutPage(page);

        await loginPage.login(
            data.validUser.username,
            data.validUser.password
        );

        await logoutPage.logout();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('Invalid Login ', async ({ page }) => {
    const invalidLogin = new invalidPage(page);

    await invalidLogin.goto();

    await invalidLogin.invalidLogin(
        data.invalidUser.invalidUsername,
        data.invalidUser.invalidPassword
    );

    await invalidLogin.assertErrorMessage(
        data.invalidUser.errorMessage
    );
});


});
