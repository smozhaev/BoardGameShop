import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@shared/constants';
import { SearchBar } from '@shared/ui/SearchBar';
import { useSearch } from '../model/useSearch';

interface ShopHeaderProps {
  onFilterPress: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ onFilterPress }) => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <View style={styles.searchRow}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Поиск игр..."
        style={styles.searchBar}
      />
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <FontAwesome name="sliders" size={20} color={Colors.light.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
