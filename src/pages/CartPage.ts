import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    static readonly PATH = '/playwright/ttacart/cart.html';

    private readonly cartItems: Locator;
    private readonly emptyMessage: Locator;
    private readonly continueShoppingLink: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page, 'CartPage');
        this.cartItems = page.locator('#cart-contents-container [data-test="inventory-item"]');
        this.emptyMessage = page.locator('[data-test="cart-empty"]');
        this.continueShoppingLink = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async open(): Promise<void> {
        this.log.info('Open cart page');
        await this.goto(CartPage.PATH);
    }

    async getItemNames(): Promise<string[]> {
        return this.el.getAllTexts(this.cartItems.locator('[data-test="inventory-item-name"]'));
    }

    async getItemCount(): Promise<number> {
        return this.el.count(this.cartItems);
    }

    async isEmpty(): Promise<boolean> {
        return this.el.isVisible(this.emptyMessage);
    }

    async removeItem(productId: string): Promise<void> {
        this.log.info(`Remove item from cart: ${productId}`);
        await this.el.click(`[data-test="remove-${productId}"]`);
    }

    async checkout(): Promise<void> {
        this.log.info('Proceed to checkout');
        await this.el.click(this.checkoutButton);
    }

    async continueShopping(): Promise<void> {
        this.log.info('Continue shopping back to inventory');
        await this.el.click(this.continueShoppingLink);
    }
}
