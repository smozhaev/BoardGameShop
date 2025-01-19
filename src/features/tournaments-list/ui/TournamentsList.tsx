import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@shared/constants';
import { Tournament } from '@entities/profile/model/types';

interface TournamentsListProps {
  title: string;
  tournaments: Tournament[];
  type: 'upcoming' | 'history';
}

export const TournamentsList: React.FC<TournamentsListProps> = ({
  title,
  tournaments,
  type,
}) => {
  const renderItem = ({ item }: { item: Tournament }) => (
    <View style={styles.tournamentCard}>
      <View style={styles.header}>
        <Text style={styles.gameName}>{item.game}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      {item.place && <Text style={styles.place}>Место проведения: {item.place}</Text>}
      {type === 'history' && item.result && (
        <Text style={styles.result}>Результат: {item.result}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={tournaments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
    color: Colors.light.text,
  },
  list: {
    paddingHorizontal: 16,
  },
  tournamentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameName: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  place: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  result: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: '500',
  },
});
