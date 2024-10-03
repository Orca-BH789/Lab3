import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

export default function ServiceSelectionModal({ visible, onClose, onSelect, selectedServices = [] }) {
  const { services } = useSelector((state) => state.service);
  const [localSelection, setLocalSelection] = useState(selectedServices);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleService = (service) => {
    const isSelected = localSelection.some(s => s.id === service.id);
    if (isSelected) {
      setLocalSelection(localSelection.filter(s => s.id !== service.id));
    } else {
      setLocalSelection([...localSelection, service]);
    }
  };

  const handleSave = () => {
    onSelect(localSelection);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn dịch vụ</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm dịch vụ..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredServices}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.serviceItem,
                  localSelection.some(s => s.id === item.id) && styles.selectedService
                ]}
                onPress={() => toggleService(item)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.servicePrice}>
                    {item.price.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <View style={styles.checkbox}>
                  {localSelection.some(s => s.id === item.id) && <View style={styles.checked} />}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Xác Nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>

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
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  servicePrice: {
    color: '#666',
  },
  selectedService: {
    backgroundColor: '#e6f7ff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#4caf50',
    borderRadius: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    saveButton: {
      backgroundColor: '#4caf50',  // Màu xanh lá cây cho nút "Lưu"
    },
    cancelButton: {
      backgroundColor: '#f44336',  // Màu đỏ cho nút "Hủy"
    },
    buttonText: {
      color: '#fff',  // Màu chữ trắng
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
});