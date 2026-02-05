export class CartPage {
    constructor(page) {
        this.page = page;
        this.cart = '.shopping_cart_link';
        this.removeButton = '#remove-sauce-labs-backpack';
        this.checkoutButton = '#checkout';
    }

    async openCart() {
        await this.page.click(this.cart);
    }

    async removeProduct() {
        await this.page.click(this.removeButton);
    }

    async goToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}
