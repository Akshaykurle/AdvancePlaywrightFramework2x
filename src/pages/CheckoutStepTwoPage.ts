import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {

    static readonly PATH = '/playwright/ttacart/checkout-step-two.html';

    private readonly summaryItems: Locator;
    private readonly subtotalLabel: Locator;
    private readonly taxLabel: Locator;
    private readonly totalLabel: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutStepTwoPage');
        this.summaryItems = page.locator('#checkout-summary [data-test="inventory-item"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async open(): Promise<void> {
        this.log.info('Open checkout step two page');
        await this.goto(CheckoutStepTwoPage.PATH);
    }

    async getItemNames(): Promise<string[]> {
        return this.el.getAllTexts(this.summaryItems.locator('[data-test="inventory-item-name"]'));
    }

    async getSubtotalText(): Promise<string> {
        return this.el.getText(this.subtotalLabel);
    }

    async getTaxText(): Promise<string> {
        return this.el.getText(this.taxLabel);
    }

    async getTotalText(): Promise<string> {
        return this.el.getText(this.totalLabel);
    }

    async finish(): Promise<void> {
        this.log.info('Finish order');
        await this.el.click(this.finishButton);
    }

    async cancel(): Promise<void> {
        this.log.info('Cancel order and return to cart');
        await this.el.click(this.cancelButton);
    }
}
