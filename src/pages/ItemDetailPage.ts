import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ItemDetailPage extends BasePage {

    static readonly PATH = '/playwright/ttacart/inventory-item.html';

    private readonly addButton: Locator;
    private readonly removeButton: Locator;
    private readonly itemName: Locator;
    private readonly itemDesc: Locator;
    private readonly itemPrice: Locator;
    private readonly backButton: Locator;

    constructor(page: Page) {
        super(page, 'ItemDetailPage');
        this.addButton = page.locator('[data-test="add-to-cart"]');
        this.removeButton = page.locator('[data-test="remove"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.backButton = page.locator('[data-test="back-to-products"]');
    }

    async open(productId: string): Promise<void> {
        this.log.info(`Open item detail page for: ${productId}`);
        await this.goto(`${ItemDetailPage.PATH}?id=${productId}`);
    }

    async addToCart(): Promise<void> {
        this.log.info('Add item to cart from detail page');
        await this.el.click(this.addButton);
    }

    async removeFromCart(): Promise<void> {
        this.log.info('Remove item from cart from detail page');
        await this.el.click(this.removeButton);
    }

    async getName(): Promise<string> {
        return this.el.getText(this.itemName);
    }

    async getDescription(): Promise<string> {
        return this.el.getText(this.itemDesc);
    }

    async getPrice(): Promise<string> {
        return this.el.getText(this.itemPrice);
    }

    async backToProducts(): Promise<void> {
        this.log.info('Navigate back to products');
        await this.el.click(this.backButton);
    }
}
