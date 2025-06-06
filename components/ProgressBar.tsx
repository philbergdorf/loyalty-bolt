import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  FadeIn 
} from 'react-native-reanimated';
import { useEffect } from 'react';

type ProgressBarProps = {
  current: number;
  target: number;
  title: string;
  subtitle: string;
};

export default function ProgressBar({ 
  current, 
  target, 
  title,
  subtitle 
}: ProgressBarProps) {
  const progress = useSharedValue(0);
  const percentage = Math.min(100, Math.round((current / target) * 100));
  
  useEffect(() => {
    progress.value = withTiming(percentage / 100, { duration: 1000 });
  }, [current, target]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(600).delay(400)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
      
      <View style={styles.valuesContainer}>
        <Text style={styles.valueLabel}>0.-</Text>
        <Text style={styles.valueLabel}>{target / 2}.-</Text>
        <Text style={styles.valueLabel}>{target}.-</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  progressContainer: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f97316',
    borderRadius: 6,
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  valueLabel: {
    fontSize: 12,
    color: '#64748b',
  },
});