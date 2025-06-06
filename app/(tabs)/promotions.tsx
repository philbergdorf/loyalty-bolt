import { View, Text } from 'react-native';

export default function PromotionsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-purple-600">Promotions</Text>
      <Text className="text-gray-600 mt-2">Special offers and deals</Text>
    </View>
  );
}