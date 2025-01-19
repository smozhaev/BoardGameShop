import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@shared/constants';
import { SlidesCarousel } from '@features/slides-carousel/ui/SlidesCarousel';
import { WelcomeSection } from '@widgets/welcome-section/ui/WelcomeSection';


export default function HomePage() {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      <WelcomeSection />
      <SlidesCarousel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});