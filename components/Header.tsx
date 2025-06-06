import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useMemo } from 'react';

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(500)}
      >
        <Text style={styles.greeting}>
          {greeting}
        </Text>
        <Text style={styles.name}>
          {name} <Text style={styles.emoji}>👋</Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: Platform.select({ ios: 0.5, default: 1 }),
    borderBottomColor: Platform.select({ ios: 'rgba(60,60,67,0.29)', default: '#e5e7eb' }),
  },
  content: {
    paddingTop: 8,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '400',
    color: '#98989f',
    marginBottom: 2,
  },
  name: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1c1c1e',
    letterSpacing: Platform.select({ ios: 0.41, default: 0 }),
  },
  emoji: {
    fontSize: 30,
  },
});