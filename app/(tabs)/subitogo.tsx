import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingActionButton from '@/components/FloatingActionButton';
import QRCodeModal from '@/components/QRCodeModal';

export default function SubitoGoScreen() {
  const [qrModalVisible, setQrModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>subitoGo</Text>
        <Text style={styles.subtitle}>Quick service features will appear here</Text>
      </View>

      <FloatingActionButton onPress={() => setQrModalVisible(true)} />
      
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});