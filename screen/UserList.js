import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { QrCode, CreditCard, Trash2, Edit2, X } from 'lucide-react-native';
import { UserRole, usePermissions } from '../store/slices/auth-types';
const UserList = ({ 
  users, 
  loading, 
  onDeleteUser, 
  onUpdateUser,
  onSelectServices,
  onOpenPayment,
  currentUserRole, 
}) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');
  const permissions = usePermissions(currentUserRole);
  const handleUpdatePress = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedDepartment(user.department);
  };

  const handleUpdateSubmit = () => {
    onUpdateUser(editingUser.id, {
      name: updatedName,
      department: updatedDepartment
    });
    setEditingUser(null);
  };

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      {editingUser && editingUser.id === item.id ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={updatedName}
            onChangeText={setUpdatedName}
            placeholder="Tên"
          />
          <TextInput
            style={styles.input}
            value={updatedDepartment}
            onChangeText={setUpdatedDepartment}
            placeholder="Phòng"
          />
          <View style={styles.editButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleUpdateSubmit}
            >
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setEditingUser(null)}
            >
              <X size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDetail}>Phòng: {item.department}</Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.qrButton]} 
              onPress={() => onSelectServices(item)}
            >
              <QrCode size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.paymentButton]} 
              onPress={() => onOpenPayment(item)}
            >
              <CreditCard size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]} 
              onPress={() => handleUpdatePress(item)}
            >
              <Edit2 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]} 
              onPress={() => onDeleteUser(item.id)}
            >
              <Trash2 size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

export default UserList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200EE',
  },
  listContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  userItem: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    color: '#666666',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    backgroundColor: '#4CAF50',
  },
  paymentButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  editForm: {
    marginTop: 12,
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 4,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    width: 40,
    minWidth: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

