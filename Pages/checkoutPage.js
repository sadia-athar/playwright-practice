export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';
        this.continueBtn = '#continue';
        this.finishBtn = '#finish';
        this.successMessage = '.complete-header';
    }

    async fillDetails(firstName, lastName, postalCode) {
        await this.page.fill(this.firstName, firstName);
        await this.page.fill(this.lastName, lastName);
        await this.page.fill(this.postalCode, postalCode);
        await this.page.click(this.continueBtn);
    }

    async finishCheckout() {
        await this.page.click(this.finishBtn);
    }
}
