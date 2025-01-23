import {beforeEach, describe, it, jest, expect} from "@jest/globals";

describe('Share Functionality', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should share product information when share button is pressed', async () => {
        // Arrange
        const productId = 'product1';
        const productTitle = 'Test Product';

        // Act
        await element(by.id('shareButton')).tap();

        // Assert
        // Проверяем, что вызывается функция shareProduct с правильными аргументами
        const shareProductMock = jest.spyOn(global, 'shareProduct');
        expect(shareProductMock).toHaveBeenCalledWith(productId, productTitle);

        // Проверяем, что вызывается hapticFeedback.medium()
        const hapticFeedbackMock = jest.spyOn(global, 'hapticFeedback')
            .mockImplementation(() => Promise.resolve());
        expect(hapticFeedbackMock).toHaveBeenCalledWith('medium');

        // Очищаем моки
        shareProductMock.mockRestore();
        hapticFeedbackMock.mockRestore();
    });
});
