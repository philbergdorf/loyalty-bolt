import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { ChevronRight, Check } from 'lucide-react-native';
import { useState } from 'react';

type Coupon = {
  id: string;
  discount: string;
  title: string;
  image: string;
};

type CouponsListProps = {
  coupons: Coupon[];
  onActivate: (id: string) => void;
  onViewAll: () => void;
};

export default function CouponsList({ 
  coupons, 
  onActivate, 
  onViewAll 
}: CouponsListProps) {
  const [activeCoupons, setActiveCoupons] = useState<Set<string>>(new Set());

  const handleActivate = (id: string) => {
    setActiveCoupons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    onActivate(id);
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(600).delay(600)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Coupons</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Text style={styles.viewAllText}>See all coupons</Text>
          <ChevronRight size={16} color="#f97316" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {coupons.map((coupon, index) => {
          const isActive = activeCoupons.has(coupon.id);
          return (
            <View key={coupon.id} style={styles.couponCard}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{coupon.discount}</Text>
              </View>
              <Image
                source={{ uri: coupon.image }}
                style={styles.couponImage}
              />
              <View style={styles.couponContent}>
                <Text style={styles.couponTitle} numberOfLines={2}>
                  {coupon.title}
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.activateButton,
                    isActive && styles.activateButtonActive
                  ]}
                  onPress={() => handleActivate(coupon.id)}
                >
                  <View style={styles.activateButtonContent}>
                    {isActive ? (
                      <>
                        <Check size={16} color="#22c55e" />
                        <Text style={styles.activateTextActive}>Active</Text>
                      </>
                    ) : (
                      <Text style={styles.activateText}>Activate</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        
        <TouchableOpacity 
          style={styles.viewMoreCard}
          onPress={onViewAll}
        >
          <Text style={styles.viewMoreText}>View more coupons</Text>
          <ChevronRight size={24} color="#f97316" />
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#f97316',
    marginRight: 2,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
  },
  couponCard: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  discountBadge: {
    position: 'absolute',
    left: 8,
    top: 8,
    backgroundColor: '#2563eb',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  couponImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#e2e8f0',
  },
  couponContent: {
    padding: 12,
  },
  couponTitle: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 12,
    height: 40,
  },
  activateButton: {
    backgroundColor: '#f97316',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activateButtonActive: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  activateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activateText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  activateTextActive: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  viewMoreCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#f97316',
    textAlign: 'center',
    marginBottom: 8,
  },
});