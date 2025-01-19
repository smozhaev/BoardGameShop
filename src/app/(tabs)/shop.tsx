import { StyleSheet } from 'react-native';
import { View } from '@shared/ui/Themed';
import ShopPage from '@pages/shop';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <ShopPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
