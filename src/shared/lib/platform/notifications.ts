import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

// Конфигурация уведомлений для разных платформ
export const configureNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Настройка обработки уведомлений в зависимости от платформы
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: Platform.OS === 'ios', // Бейджи только для iOS
    }),
  });
};

// Запрос разрешений с учетом платформы
export const requestNotificationPermissions = async () => {
  if (!Device.isDevice) {
    return false;
  }

  let finalStatus;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  return true;
};

// Отправка локального уведомления
export const scheduleNotification = async ({
  title,
  body,
  data = {},
  trigger = null,
}: {
  title: string;
  body: string;
  data?: Record<string, unknown>;
  trigger?: Notifications.NotificationTriggerInput;
}) => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      throw new Error('No notification permission');
    }

    const notificationContent: Notifications.NotificationContentInput = {
      title,
      body,
      data,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    };

    if (Platform.OS === 'ios') {
      notificationContent.badge = 1;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
};

// Специфичные для платформы уведомления о скидках
export const scheduleDiscountNotification = async (productName: string, discount: number) => {
  const title = Platform.select({
    ios: '🎲 Специальное предложение!',
    android: 'Специальное предложение! 🎲',
    default: 'Специальное предложение',
  });

  const body = Platform.select({
    ios: `Скидка ${discount}% на игру "${productName}"! Успейте купить!`,
    android: `"${productName}" сейчас со скидкой ${discount}%! Tap to view`,
    default: `Скидка ${discount}% на "${productName}"`,
  });

  return scheduleNotification({
    title,
    body,
    data: {
      type: 'discount',
      productName,
      discount,
    },
  });
};
