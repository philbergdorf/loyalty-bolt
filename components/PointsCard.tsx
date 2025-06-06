import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';

type PointsCardProps = {
  points: number;
  value: number;
  onRedeem: () => void;
  onHelp: () => void;
};

export default function PointsCard({ 
  points, 
  value, 
  onRedeem, 
  onHelp 
}: PointsCardProps) {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(600).delay(200)}
    >
      <View style={styles.pointsRow}>
        <View>
          <Text style={styles.pointsValue}>{points.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>Punkte</Text>
        </View>
        
        <Animated.View entering={SlideInRight.duration(600).delay(400)}>
          <ArrowRight size={24} color="#64748b" />
        </Animated.View>
        
        <View>
          <Text style={styles.chfValue}>{value.toFixed(2)}</Text>
          <Text style={styles.chfLabel}>CHF</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.redeemButton} 
        onPress={onRedeem} 
        activeOpacity={0.8}
      >
        <Text style={styles.redeemButtonText}>Redeem now</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onHelp}>
        <Text style={styles.helpText}>How does this work?</Text>
      </TouchableOpacity>
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
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 2,
  },
  chfValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'right',
  },
  chfLabel: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  redeemButton: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  redeemButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  helpText: {
    color: '#f97316',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});