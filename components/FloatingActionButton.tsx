import { TouchableOpacity, StyleSheet, View, Text, Platform } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring, interpolate, Extrapolate } from 'react-native-reanimated';
import { QrCode } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FloatingActionButtonProps = {
  onPress: () => void;
  scrollY?: Animated.SharedValue<number>;
};

export default function FloatingActionButton({ onPress, scrollY }: FloatingActionButtonProps) {
  const insets = useSafeAreaInsets();
  
  const fabStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};

    const width = interpolate(
      scrollY.value,
      [0, 50],
      [180, 48],
      Extrapolate.CLAMP
    );

    return {
      width: withSpring(width, {
        damping: 20,
        stiffness: 200,
      }),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    if (!scrollY) return { opacity: 1 };

    const opacity = interpolate(
      scrollY.value,
      [0, 30],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: withSpring(opacity),
      marginLeft: 12,
      flex: 1,
    };
  });

  return (
    <Animated.View 
      entering={FadeIn.duration(600).delay(1400)}
      style={[
        styles.fabContainer,
        {
          bottom: Platform.select({
            ios: 24 + (insets.bottom > 0 ? 85 + insets.bottom : 95),
            android: 24 + 85,
            default: 24 + 85
          })
        }
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.fab, fabStyle]}>
          <Animated.View style={styles.fabContent}>
            <View style={styles.iconContainer}>
              <QrCode size={24} color="white" strokeWidth={2} />
            </View>
            <Animated.Text style={[styles.fabText, textStyle]} numberOfLines={1}>
              Cumulus code
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 24,
    zIndex: 1000,
  },
  fab: {
    height: 48,
    width: 180,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    height: '100%',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
});