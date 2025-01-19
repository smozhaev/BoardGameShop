import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { Tournament } from '@entities/tournament/model/types';
import { FontAwesome } from '@expo/vector-icons';

interface TournamentCardProps {
  tournament: Tournament;
  onPress?: () => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onPress }) => {
  const isSpacesAvailable = tournament.currentParticipants < tournament.maxParticipants;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: tournament.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {tournament.title}
          </Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(tournament.status) }
          ]}>
            <Text style={styles.statusText}>
              {getStatusText(tournament.status)}
            </Text>
          </View>
        </View>

        <Text style={styles.gameTitle}>
          <FontAwesome name="gamepad" size={14} color={Colors.light.text} /> {tournament.gameTitle}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <FontAwesome name="calendar" size={14} color={Colors.light.text} /> {tournament.date}
          </Text>
          <Text style={styles.infoText}>
            <FontAwesome name="clock-o" size={14} color={Colors.light.text} /> {tournament.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <FontAwesome name="users" size={14} color={Colors.light.text} />
            <Text> {tournament.currentParticipants}/{tournament.maxParticipants}</Text>
          </Text>
          <Text style={styles.infoText}>
            <FontAwesome name="map-marker" size={14} color={Colors.light.text} /> {tournament.location}
          </Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Взнос:</Text>
            <Text style={styles.price}>
              <Text>{tournament.entryFee}</Text>
              <Text> ₽</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.prizeLabel}>Призовой фонд:</Text>
            <Text style={styles.prizePool}>
              <Text>{tournament.prizePool}</Text>
              <Text> ₽</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStatusColor = (status: Tournament['status']) => {
  switch (status) {
    case 'upcoming':
      return Colors.light.tint;
    case 'in-progress':
      return '#ffd700';
    case 'completed':
      return '#666';
  }
};

const getStatusText = (status: Tournament['status']) => {
  switch (status) {
    case 'upcoming':
      return 'Скоро';
    case 'in-progress':
      return 'Идет';
    case 'completed':
      return 'Завершен';
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameTitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  prizeLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  prizePool: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
