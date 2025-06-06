import { Tabs } from 'expo-router';
import { Percent, List, User, Wallet } from 'lucide-react-native';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          {
            height: Platform.select({
              ios: 85 + (insets.bottom > 0 ? insets.bottom : 10),
              android: 85,
              default: 85
            }),
            paddingBottom: Platform.select({
              ios: insets.bottom > 0 ? insets.bottom : 10,
              android: 10,
              default: 10
            })
          }
        ],
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Migros',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.migrosIconContainer}>
              <Text style={[styles.migrosIcon, { color }]}>M</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          title: 'Promotions',
          tabBarIcon: ({ color, size }) => (
            <Percent size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color, size }) => (
            <List size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cumulus"
        options={{
          title: 'Cumulus',
          tabBarIcon: ({ color, size }) => (
            <Wallet size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subitogo"
        options={{
          title: 'subitoGo',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.subitoIconContainer}>
              <Text style={[styles.subitoIcon, { color }]}>sGO</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 5,
  },
  migrosIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  migrosIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  subitoIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subitoIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
});