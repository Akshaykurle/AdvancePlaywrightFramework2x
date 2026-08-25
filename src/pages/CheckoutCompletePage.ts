import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {

    static readonly PATH = '/playwright/ttacart/checkout-complete.html';

    private readonly completeHeader: Locator;
    private readonly completeText: Locator;
    private readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutCompletePage');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async open(): Promise<void> {
        this.log.info('Open checkout complete page');
        await this.goto(CheckoutCompletePage.PATH);
    }

    async getConfirmationHeader(): Promise<string> {
        return this.el.getText(this.completeHeader);
    }

    async getConfirmationMessage(): Promise<string> {
        return this.el.getText(this.completeText);
    }

    async backHome(): Promise<void> {
        this.log.info('Navigate back home to inventory');
        await this.el.click(this.backHomeButton);
    }
}
