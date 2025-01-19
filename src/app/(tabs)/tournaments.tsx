import { StyleSheet } from 'react-native';
import { Text, View } from '@shared/ui/Themed';
import TournamentsPage from '@pages/tournaments';

export default function TournamentScreen() {
  return (
    <View style={styles.container}>
      <TournamentsPage/>
    </View>
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
