export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addBackpackButton = '#add-to-cart-sauce-labs-backpack';
        
    }

    async addProductToCart() {
        await this.page.click(this.addBackpackButton);
    }
}
