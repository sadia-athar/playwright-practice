export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.menuBtn = '#react-burger-menu-btn';
        this.logoutBtn = '#logout_sidebar_link';
        this.loginBtn = '#login-button';
    }

    async logout() {
        await this.page.click(this.menuBtn);
        await this.page.click(this.logoutBtn);
    }
}
