import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { TournamentCard } from '@features/tournament-card/ui/TournamentCard';
import { Tournament } from '@entities/tournament/model/types';
import { useRouter } from 'expo-router';

// Временные данные для демонстрации
const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Турнир по Манчкин',
    gameTitle: 'Манчкин',
    imageUrl: 'https://cf.geekdo-images.com/pWe2QlvyVXkpV6isRXoQJA__imagepage/img/jDxEEgIJHVWrJFryIj3cKFDFhQo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6595698.jpg',
    date: '25 января 2025',
    time: '15:00',
    maxParticipants: 16,
    currentParticipants: 12,
    entryFee: 500,
    prizePool: 6000,
    description: 'Приглашаем всех любителей Манчкина на наш турнир! Сражайтесь, получайте уровни и побеждайте монстров!',
    location: 'Зал 1',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Чемпионат по Каркассон',
    gameTitle: 'Каркассон',
    imageUrl: 'https://cf.geekdo-images.com/6_SwAs0Frz_A8o8jc6P6Nw__imagepage/img/7-qy-YfrTc1YgTkC70WBBxeW4Wk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6544250.jpg',
    date: '26 января 2025',
    time: '12:00',
    maxParticipants: 32,
    currentParticipants: 28,
    entryFee: 700,
    prizePool: 15000,
    description: 'Постройте средневековый город и станьте чемпионом!',
    location: 'Главный зал',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Турнир по Колонизаторам',
    gameTitle: 'Колонизаторы',
    imageUrl: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__imagepage/img/C9IXz6dB-mXXL_PoQq9KFpqvr7c=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2419375.jpg',
    date: '19 января 2025',
    time: '14:00',
    maxParticipants: 24,
    currentParticipants: 24,
    entryFee: 1000,
    prizePool: 18000,
    description: 'Колонизируйте остров Катан и станьте лучшим поселенцем!',
    location: 'Зал 2',
    status: 'in-progress'
  }
];

export default function TournamentsPage() {
  const router = useRouter();

  const handleTournamentPress = (tournamentId: string) => {
    // В будущем здесь будет навигация на детальную страницу турнира
    console.log('Tournament pressed:', tournamentId);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Турниры</Text>
          <Text style={styles.subtitle}>
            Участвуйте в турнирах и выигрывайте призы!
          </Text>
        </View>

        <View style={styles.content}>
          {mockTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onPress={() => handleTournamentPress(tournament.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 16,
  },
});