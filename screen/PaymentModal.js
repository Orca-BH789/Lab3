import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Image } from 'react-native';


const BANK_INFO = {
  accountNo: "6504001775",      
  accountName: "TONG DUY TUAN",  
  acqId: "970418",              
};

export default function PaymentModal({ visible, onClose, user, services = [] }) {
  const total = services.reduce((sum, service) => sum + service.price, 0);


  const description = `Pay Service`;


  const qrUrl = `https://api.vietqr.io/image/${BANK_INFO.acqId}-${BANK_INFO.accountNo}-qr_only.jpg?amount=${total}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chi tiết thanh toán</Text>
          
          <View style={styles.bankInfo}>
            <Text style={styles.bankName}>BIDV Bank</Text>
            <Text>STK: {BANK_INFO.accountNo}</Text>
            <Text>Chủ TK: {BANK_INFO.accountName}</Text>
          </View>

          <Text style={styles.userName}>Khách hàng: {user?.name}</Text>
          
          <View style={styles.serviceList}>
            {services.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <Text>{service.name}</Text>
                <Text>{service.price.toLocaleString('vi-VN')}đ</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.total}>Tổng cộng: {total.toLocaleString('vi-VN')}đ</Text>
          
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: qrUrl }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.instruction}>
            Quét mã QR bằng ứng dụng ngân hàng để thanh toán
          </Text>
          
          <Button title="Đóng" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bankInfo: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  bankName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    marginBottom: 10,
  },
  serviceList: {
    width: '100%',
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrContainer: {
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});