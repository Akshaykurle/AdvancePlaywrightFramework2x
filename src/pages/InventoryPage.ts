import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    static readonly PATH = '/playwright/ttacart/inventory.html';

    private readonly sortSelect: Locator;
    private readonly inventoryItems: Locator;
    private readonly cartLink: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page, 'InventoryPage');
        this.sortSelect = page.locator('#product-sort-container');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async open(): Promise<void> {
        this.log.info('Open inventory page');
        await this.goto(InventoryPage.PATH);
    }

    async addItemToCart(productId: string): Promise<void> {
        this.log.info(`Add to cart: ${productId}`);
        await this.el.click(`[data-test="add-to-cart-${productId}"]`);
    }

    async removeItemFromCart(productId: string): Promise<void> {
        this.log.info(`Remove from cart: ${productId}`);
        await this.el.click(`[data-test="remove-${productId}"]`);
    }

    async openItemByName(itemName: string): Promise<void> {
        this.log.info(`Open item detail: ${itemName}`);
        const titleLink = this.inventoryItems
            .filter({ hasText: itemName })
            .locator('a[data-test$="-title-link"]');
        await this.el.click(titleLink);
    }

    async openCart(): Promise<void> {
        this.log.info('Open cart from header');
        await this.el.click(this.cartLink);
    }

    async sortBy(sortValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        this.log.info(`Sort products by: ${sortValue}`);
        await this.el.selectByValue(this.sortSelect, sortValue);
    }

    async getItemNames(): Promise<string[]> {
        return this.el.getAllTexts(this.inventoryItems.locator('[data-test="inventory-item-name"]'));
    }

    async getItemCount(): Promise<number> {
        return this.el.count(this.inventoryItems);
    }

    async getCartBadgeCount(): Promise<number> {
        const text = await this.el.getText(this.cartBadge);
        return Number.parseInt(text, 10);
    }
}
