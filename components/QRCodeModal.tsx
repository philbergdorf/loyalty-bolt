import { Modal, View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';

type QRCodeModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function QRCodeModal({ visible, onClose }: QRCodeModalProps) {
  // Generate a random Cumulus number for demo purposes
  const cumulusNumber = '1234567890123';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748b" />
          </TouchableOpacity>
          
          <View style={styles.qrContainer}>
            <Text style={styles.title}>Your Cumulus Code</Text>
            <View style={styles.qrCode}>
              <QRCode
                value={cumulusNumber}
                size={250}
                backgroundColor="white"
                color="#1e293b"
              />
            </View>
            <Text style={styles.codeText}>{cumulusNumber}</Text>
            <Text style={styles.helpText}>
              Show this code at the checkout
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }),
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 24,
  },
  qrCode: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  codeText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '500',
    color: '#1e293b',
    letterSpacing: 1,
  },
  helpText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});