import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {

    static readonly PATH = '/playwright/ttacart/checkout-step-one.html';

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly errorBox: Locator;
    private readonly continueButton: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutStepOnePage');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.errorBox = page.locator('[data-test="error"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async open(): Promise<void> {
        this.log.info('Open checkout step one page');
        await this.goto(CheckoutStepOnePage.PATH);
    }

    async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        this.log.info(`Fill shipping info for ${firstName} ${lastName}`);
        await this.el.fill(this.firstNameInput, firstName);
        await this.el.fill(this.lastNameInput, lastName);
        await this.el.fill(this.postalCodeInput, postalCode);
    }

    async continue(): Promise<void> {
        this.log.info('Continue to checkout overview');
        await this.el.click(this.continueButton);
    }

    async cancel(): Promise<void> {
        this.log.info('Cancel checkout and return to cart');
        await this.el.click(this.cancelButton);
    }

    async getError(): Promise<string> {
        return this.el.getText(this.errorBox);
    }
}
