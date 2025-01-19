import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.buttonActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.textActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  buttonActive: {
    backgroundColor: Colors.light.tint,
  },
  text: {
    fontSize: 14,
    color: Colors.light.text,
  },
  textActive: {
    color: '#fff',
  },
});
