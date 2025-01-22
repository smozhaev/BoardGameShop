import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { useActiveFilters } from '../model/useActiveFilters';

export const ActiveFilters: React.FC = () => {
  const { categoriesCount } = useActiveFilters();

  return (
    <View style={styles.activeFilters}>
      <Text style={styles.activeFiltersText}>
        Выбрано категорий: {categoriesCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activeFilters: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  activeFiltersText: {
    fontSize: 12,
    color: Colors.light.tint,
  },
});
