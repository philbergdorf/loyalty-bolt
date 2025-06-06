import { View, Text } from 'react-native';

export default function ListScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-green-600">List</Text>
      <Text className="text-gray-600 mt-2">Your lists and items</Text>
    </View>
  );
}