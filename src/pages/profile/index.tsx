import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@shared/constants';
import { PointsCard } from '@widgets/profile/ui/PointsCard';
import { TournamentsList } from '@features/tournaments-list/ui/TournamentsList';
import { Profile } from '@entities/profile/model/types';

// Временные данные для примера
const mockProfile: Profile = {
  id: '1',
  name: 'Игрок',
  points: 1250,
  tournaments: [
    {
      id: '1',
      title: 'Турнир по Манчкин',
      date: '25 января 2025',
      game: 'Манчкин',
      place: 'Игровой клуб "Два кубика"',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Чемпионат по Каркассон',
      date: '15 января 2025',
      game: 'Каркассон',
      place: 'Игровой клуб "Два кубика"',
      status: 'finished',
      result: '2 место',
    },
    {
      id: '3',
      title: 'Турнир по Колонизаторам',
      date: '5 января 2025',
      game: 'Колонизаторы',
      place: 'Игровой клуб "Два кубика"',
      status: 'finished',
      result: 'Участник',
    },{
      id: '4',
      title: 'Турнир по Колонизаторам',
      date: '5 января 2025',
      game: 'Колонизаторы',
      place: 'Игровой клуб "Два кубика"',
      status: 'finished',
      result: 'Участник',
    },{
      id: '5',
      title: 'Турнир по Колонизаторам',
      date: '5 января 2025',
      game: 'Колонизаторы',
      place: 'Игровой клуб "Два кубика"',
      status: 'finished',
      result: 'Участник',
    },{
      id: '6',
      title: 'Турнир по Колонизаторам',
      date: '5 января 2025',
      game: 'Колонизаторы',
      place: 'Игровой клуб "Два кубика"',
      status: 'finished',
      result: 'Участник',
    },
  ],
};

export default function ProfilePage() {
  const upcomingTournaments = mockProfile.tournaments.filter(
    (t) => t.status === 'upcoming'
  );
  const pastTournaments = mockProfile.tournaments.filter(
    (t) => t.status === 'finished'
  );

  return (
    <ScrollView style={styles.container}>
      <PointsCard points={mockProfile.points} />
      <TournamentsList
        title= {["Предстоящие турниры", "История"]}
        tournaments={upcomingTournaments}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});