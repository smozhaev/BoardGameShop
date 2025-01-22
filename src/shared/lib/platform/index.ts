import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export * from './haptics';
export * from './share';
export * from './notifications';
