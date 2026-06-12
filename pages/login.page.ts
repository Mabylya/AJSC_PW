import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    constructor(page: Page){
        this.page=page; 
        this.emailField = this.page.locator('email');
        this.passwordField = this.page.locator('password');
    }
	async login(email: string, password: string): Promise<void> {
		await this.page.getByTestId('email').fill(email);
		await this.page.getByTestId('password').fill(password);
		//Click the Login button.
		await this.page.getByTestId('login-submit').click();
	}
    async goto() {
    await this.page.goto('/auth/login');
  }
}