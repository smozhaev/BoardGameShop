import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
