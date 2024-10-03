import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { QrCode, CreditCard, Trash2 } from 'lucide-react-native'; 

const UserList = ({ 
  users, 
  loading, 
  onDeleteUser, 
  onUpdateUser,
  onSelectServices,
  onOpenPayment 
}) => {
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDepartment, setUpdatedDepartment] = useState('');

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
          <View style={styles.buttonContainer}>
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
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDetail}>Phòng: {item.department}</Text>
          </View>
          <View style={styles.buttonContainer}>           
            <TouchableOpacity 
              style={[styles.button, styles.iconButton]} 
              onPress={() => onSelectServices(item)}
            >
              <QrCode size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.iconButton]} 
              onPress={() => onOpenPayment(item)}
            >
              <CreditCard size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]} 
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải...</Text>
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  userItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#2196F3',
    padding: 8,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editForm: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
});

export default UserList;