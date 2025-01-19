import { StyleSheet } from 'react-native';
import { Text, View } from '@shared/ui/Themed';
import CartPage from '@pages/cart';

export default function CartScreen() {
  return (
    <>
      <CartPage />
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
