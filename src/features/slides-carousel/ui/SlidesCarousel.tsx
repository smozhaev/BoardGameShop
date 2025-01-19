import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@shared/constants';
import { Slide } from '@entities/slide/model/types';
import { slides } from '@entities/slide/model/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SlidesCarousel = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent']}
          style={styles.imageGradient}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.action && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (item.action === 'shop') {
                router.push('/(tabs)/shop');
              } else if (item.action === 'tournaments') {
                router.push('/(tabs)/tournaments');
              }
            }}
          >
            <LinearGradient
              colors={[Colors.light.tint, '#2980b9']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Перейти</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.carouselSection}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselSection: {
    height: screenHeight - 100,
    backgroundColor: Colors.light.background,
  },
  slide: {
    width: screenWidth,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    width: screenWidth * 0.85,
    height: screenWidth * 0.65,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.light.text,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.light.text,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: Colors.light.tint,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 35,
    minWidth: 150,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.tabIconDefault,
    marginHorizontal: 5,
    opacity: 0.5,
  },
  paginationDotActive: {
    backgroundColor: Colors.light.tint,
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
});
