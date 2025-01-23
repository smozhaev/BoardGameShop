import {beforeEach, describe, it, jest} from "@jest/globals";
import {device} from "detox";

jest.mock('@entities/cart/model/types')

describe('Cart functionality', () => {
    beforeEach(async () => {
        await device.launchApp({newInstance: true});
    });


    it('should add a product to the cart', async () => {
        // Arrange
        const productId = 'product1';
        const productName = 'Test Product';
        const productPrice = 10.99;

        // Act
        await element(by.id('addToCartButton')).tap();

        // Assert
        await expect(element(by.id('cartItemName'))).toHaveText(productName);
        await expect(element(by.id('cartItemPrice'))).toHaveText(`${productPrice.toFixed(2)}`);
        await expect(element(by.id('cartItemQuantity'))).toHaveText('1');
    });

    it('should update the quantity of a product in the cart', async () => {
        // Arrange
        const productId = 'product1';
        const initialQuantity = 1;
        const newQuantity = 3;

        // Act
        await element(by.id('increaseQuantityButton')).tap();
        await element(by.id('increaseQuantityButton')).tap();

        // Assert
        await expect(element(by.id('cartItemQuantity'))).toHaveText(`${newQuantity}`);
    });

    it('should remove a product from the cart', async () => {
        // Arrange
        const productId = 'product1';

        // Act
        await element(by.id('removeFromCartButton')).tap();

        // Assert
        await expect(element(by.id('cartItemName'))).toBeNotVisible();
    });
});


