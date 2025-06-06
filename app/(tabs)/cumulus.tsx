import { ScrollView, StyleSheet, Alert, TouchableOpacity, Text, View, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import PointsCard from '@/components/PointsCard';
import ProgressBar from '@/components/ProgressBar';
import CouponsList from '@/components/CouponsList';
import EarnPointsCard from '@/components/EarnPointsCard';
import BenefitsCard from '@/components/BenefitsCard';
import AccountCard from '@/components/AccountCard';
import QRCodeModal from '@/components/QRCodeModal';
import FloatingActionButton from '@/components/FloatingActionButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeIn, 
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

// Mock data
const COUPONS = [
  {
    id: '1',
    discount: '20x',
    title: 'Coupon title and text goes here',
    image: 'https://images.pexels.com/photos/4312860/pexels-photo-4312860.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    discount: '10x',
    title: 'Save on coffee and tea products',
    image: 'https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    discount: '15%',
    title: 'Fresh fruits and vegetables discount',
    image: 'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const TASKS = [
  {
    id: '1',
    title: 'Become a Cumulus member',
    points: 200,
    completed: true,
  },
  {
    id: '2',
    title: 'Show your Cumulus code 10 times',
    points: 200,
    completed: true,
  },
  {
    id: '3',
    title: 'Subscribe to the Migros Newsletter',
    description: '→ Subscribe',
    points: 200,
    completed: false,
    actionLabel: 'Subscribe',
    actionLink: '/subscribe',
  },
  {
    id: '4',
    title: 'Make your first online order',
    points: 200,
    completed: false,
  },
];

export default function CumulusScreen() {
  const [userName] = useState('Hans-Peter');
  const [points] = useState(2394);
  const [chfValue] = useState(23);
  const [spent] = useState(50);
  const [targetSpend] = useState(100);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const scrollY = useSharedValue(0);
  
  const handleRedeem = useCallback(() => {
    Alert.alert(
      'Redeem Points',
      'Would you like to redeem your points for CHF 23.00?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Redeem', onPress: () => Alert.alert('Success', 'Points redeemed successfully!') }
      ]
    );
  }, []);
  
  const handleHelp = useCallback(() => {
    Alert.alert(
      'How Points Work',
      'For every CHF 1 you spend, you earn 1 Cumulus point. 100 points equals CHF 1 in value.'
    );
  }, []);
  
  const handleActivateCoupon = useCallback((id: string) => {
    const coupon = COUPONS.find(c => c.id === id);
    Alert.alert(
      'Activate Coupon',
      `Would you like to activate the ${coupon?.discount} coupon?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Activate', onPress: () => Alert.alert('Success', 'Coupon activated successfully!') }
      ]
    );
  }, []);
  
  const handleViewAllCoupons = useCallback(() => {
    Alert.alert('All Coupons', 'Showing all available coupons');
  }, []);
  
  const handleCompleteTask = useCallback((id: string) => {
    Alert.alert('Task Completed', `Task ${id} marked as completed`);
  }, []);
  
  const handleTaskAction = useCallback((task: any) => {
    if (task.actionLink) {
      Alert.alert('Action', `Navigating to ${task.actionLink}`);
    }
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header name={userName} />
      
      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <PointsCard 
          points={points} 
          value={chfValue} 
          onRedeem={handleRedeem}
          onHelp={handleHelp}
        />
        
        <ProgressBar 
          current={spent}
          target={targetSpend}
          title="Get your next 2× Coupon!"
          subtitle="For every CHF 100.– you spend, you get a 2× Coupon"
        />
        
        <CouponsList 
          coupons={COUPONS}
          onActivate={handleActivateCoupon}
          onViewAll={handleViewAllCoupons}
        />
        
        <EarnPointsCard 
          tasks={TASKS}
          onCompleteTask={handleCompleteTask}
          onTaskAction={handleTaskAction}
        />
        
        <BenefitsCard 
          title="More exclusive benefits"
          description="Partner benefits, events etc."
        />
        
        <AccountCard 
          title="Your Cumulus Account"
          description="Info about the account, link to edit, add household member etc."
        />
      </Animated.ScrollView>

      <FloatingActionButton 
        onPress={() => setQrModalVisible(true)} 
        scrollY={scrollY}
      />
      
      <QRCodeModal 
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: Platform.select({
      ios: 120, // Account for tab bar height (85) + safe area bottom inset + extra padding
      android: 110, // Account for tab bar height (85) + extra padding
      default: 110,
    }),
  },
});