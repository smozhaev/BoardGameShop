import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Тактильная обратная связь для разных платформ
export const hapticFeedback = {
  // Легкая вибрация для нажатия кнопок
  light: async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (Platform.OS === 'android') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  // Средняя вибрация для важных действий
  medium: async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (Platform.OS === 'android') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },

  // Сильная вибрация для критических действий
  heavy: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  // Успешное действие
  success: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  // Предупреждение
  warning: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },

  // Ошибка
  error: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
};
