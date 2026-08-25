import { expect, Locator, Page } from '@playwright/test';
import { createLogger, type Logger } from '@src/utils/logger';

export const DEFAULT_ACTION_TIMEOUT_MS = 15_000;

/**
 * Flex - a selector can be a CSS string or an already-built Locator.
 */
export type Flex = string | Locator;

export class UtilElementLocator {
    private readonly page: Page;
    private readonly log: Logger;

    constructor(page: Page, scope: string = 'UtilElementLocator') {
        this.page = page;
        this.log = createLogger(scope);
    }

    private toLocator(target: Flex): Locator {
        return typeof target === 'string' ? this.page.locator(target) : target;
    }

    private describe(target: Flex): string {
        return typeof target === 'string' ? target : target.toString();
    }

    async click(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`click ${this.describe(target)}`);
        await loc.click({ timeout });
    }

    async doubleClick(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`doubleClick ${this.describe(target)}`);
        await loc.dblclick({ timeout });
    }

    async rightClick(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`rightClick ${this.describe(target)}`);
        await loc.click({ button: 'right', timeout });
    }

    async hover(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.hover({ timeout });
    }

    async fill(target: Flex, value: string, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.debug(`fill ${this.describe(target)}`);
        await loc.fill(value, { timeout });
    }

    async type(target: Flex, value: string, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.pressSequentially(value, { timeout });
    }

    async clear(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await loc.clear({ timeout });
    }

    async pressSequentially(
        target: Flex,
        value: string,
        timeout: number = DEFAULT_ACTION_TIMEOUT_MS,
    ): Promise<void> {
        const loc = this.toLocator(target);
        await loc.pressSequentially(value, { timeout });
    }

    async getText(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        const txt = (await loc.textContent()) ?? '';
        return txt.trim();
    }

    async getInnerText(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        return (await loc.innerText()).trim();
    }

    async getAllTexts(target: Flex): Promise<string[]> {
        const loc = this.toLocator(target);
        const texts = await loc.allTextContents();
        return texts.map((t) => t.trim());
    }

    async getAttr(target: Flex, name: string): Promise<string | null> {
        const loc = this.toLocator(target);
        return loc.getAttribute(name);
    }

    async getValue(target: Flex): Promise<string> {
        const loc = this.toLocator(target);
        return loc.inputValue();
    }

    async count(target: Flex): Promise<number> {
        const loc = this.toLocator(target);
        return loc.count();
    }

    async isVisible(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isVisible();
    }

    async isEnabled(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isEnabled();
    }

    async isChecked(target: Flex): Promise<boolean> {
        const loc = this.toLocator(target);
        return loc.isChecked();
    }

    async waitForVisible(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await expect(loc).toBeVisible({ timeout });
    }

    async waitForHidden(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        await expect(loc).toBeHidden({ timeout });
    }

    async waitForPageLoad(): Promise<void> {
        this.log.debug('waitForPageLoad');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle').catch(() => {
            // networkidle can time out on origins with background analytics calls
        });
    }

    async selectByText(target: Flex, text: string): Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ label: text });
    }

    async selectByValue(target: Flex, value: string): Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ value });
    }

    async selectByIndex(target: Flex, index: number): Promise<void> {
        const loc = this.toLocator(target);
        await loc.selectOption({ index });
    }
}
