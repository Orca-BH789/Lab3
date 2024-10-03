import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Button, StyleSheet } from 'react-native';

const services = [
  { id: 1, name: 'Service A', price: 100000 },
  { id: 2, name: 'Service B', price: 200000 },
  { id: 3, name: 'Service C', price: 300000 },
];

export default function ServiceSelectionModal({ visible, onClose, onSelect, selectedServices = [] }) {
  const [localSelection, setLocalSelection] = useState(selectedServices);

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
          <Text style={styles.modalTitle}>Select Services</Text>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.serviceItem,
                  localSelection.some(s => s.id === item.id) && styles.selectedService
                ]}
                onPress={() => toggleService(item)}
              >
                <Text>{item.name} - {item.price.toLocaleString('vi-VN')}đ</Text>
                <View style={styles.checkbox}>
                  {localSelection.some(s => s.id === item.id) && <View style={styles.checked} />}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} />
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  selectedService: {
    backgroundColor: '#e6f7ff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#4caf50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
