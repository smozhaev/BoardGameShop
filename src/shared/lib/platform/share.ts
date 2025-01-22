import { Share, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface ShareOptions {
  title?: string;
  message: string;
  url?: string;
}

export const shareContent = async ({ title, message, url }: ShareOptions) => {
  try {
    if (Platform.OS === 'ios') {
      // iOS использует встроенный Share API
      await Share.share({
        title,
        message,
        url,
      });
    } else if (Platform.OS === 'android') {
      // Android может использовать как Share API, так и Sharing из Expo
      if (url && url.startsWith('http')) {
        // Для веб-ссылок используем Share API
        await Share.share({
          title,
          message: `${message}\n${url}`,
        });
      } else if (url && (url.startsWith('file://') || url.startsWith('content://'))) {
        // Для файлов используем Expo Sharing
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(url, {
            dialogTitle: title,
            mimeType: 'application/pdf', // Измените в зависимости от типа файла
            UTI: 'public.item', // Только для iOS
          });
        }
      } else {
        // Для простого текста используем Share API
        await Share.share({
          title,
          message,
        });
      }
    }
  } catch (error) {
    console.error('Error sharing content:', error);
    throw error;
  }
};

// Функция для шаринга продукта
export const shareProduct = async (productId: string, productName: string) => {
  const message = `Посмотри эту настольную игру: ${productName}`;
  const url = `https://boardgameshop.com/product/${productId}`;
  
  await shareContent({
    title: 'Поделиться игрой',
    message,
    url,
  });
};
