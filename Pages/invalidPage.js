import { expect } from '@playwright/test';

export class invalidPage {
    constructor(page) {
        this.page = page;
        this.username = '#user-name';
        this.password = '#password';
        this.loginBtn = '#login-button';
        this.errorMessage = 'h3[data-test="error"]';
    }

    async goto() {
        await this.page.goto('/');
    }

    async invalidLogin(invalidUsername, invalidPassword) {
        await this.page.fill(this.username, invalidUsername);
        await this.page.fill(this.password, invalidPassword);
        await this.page.click(this.loginBtn);
    }

    async assertErrorMessage(expectedMessage) {
        await expect(this.page.locator(this.errorMessage))
            .toHaveText(expectedMessage);
    }
}
