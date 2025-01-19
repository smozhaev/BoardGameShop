import React from 'react';
import { ScrollView, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '@shared/constants';
import { RootState } from '@app/store/types';
import {
  toggleCategory,
  setInStock,
  setSortBy,
  resetFilters,
} from '@app/store/filterSlice';
import { FilterButton } from './FilterButton';
import { FilterSection } from './FilterSection';
import { FilterHeader } from './FilterHeader';
import { CATEGORIES, SORT_OPTIONS } from '../model/constants';

interface FilterPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const { categories: selectedCategories, inStock, sortBy } = useSelector(
    (state: RootState) => state.filter
  );

  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleReset = () => {
    dispatch(resetFilters());
    onClose();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { transform: [{ translateY }] }
      ]}
    >
      <FilterHeader onClose={onClose} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <FilterSection title="Категории:">
          {CATEGORIES.map((category) => (
            <FilterButton
              key={category}
              label={category}
              isActive={selectedCategories.includes(category)}
              onPress={() => dispatch(toggleCategory(category))}
            />
          ))}
        </FilterSection>

        <FilterSection title="Сортировка:">
          {SORT_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              label={option.label}
              isActive={sortBy === option.value}
              onPress={() => dispatch(setSortBy(option.value))}
            />
          ))}
        </FilterSection>

        <FilterSection title="Наличие:">
          <FilterButton
            label="В наличии"
            isActive={inStock === true}
            onPress={() => dispatch(setInStock(inStock === true ? null : true))}
          />
        </FilterSection>

        <FilterButton
          label="Сбросить"
          isActive={false}
          onPress={handleReset}
          style={styles.resetButton}
        />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollView: {
    maxHeight: 400,
  },
  container: {
    padding: 16,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ff6b6b',
    alignSelf: 'center',
    marginTop: 16,
  },
});
