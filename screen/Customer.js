import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { getUsers, addUser, deleteUser, updateUser } from '../store/slices/userService';
import AddUserForm from './AddUserForm';
import UserList from './UserList';
import ServiceSelectionModal from './ServiceSelectionModal';
import PaymentModal from './PaymentModal';

export const CustomerScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = async (userData) => {
    try {
      await addUser(userData);
      fetchUsers();
    } catch (error) {
      Alert.alert('Error', 'Failed to add user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleOpenServiceSelection = (user) => {
    setSelectedUser(user);
    setServiceModalVisible(true);
  };

  const handleOpenPayment = (user) => {
    setSelectedUser(user);
    setPaymentModalVisible(true);
  };

  const handleServiceSelection = (services) => {
    setSelectedServices({
      ...selectedServices,
      [selectedUser.id]: services
    });
    setServiceModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddUserForm onUserAdded={handleUserAdded} />
      <UserList 
        users={users}
        loading={loading}
        onDeleteUser={handleDeleteUser}
        onSelectServices={handleOpenServiceSelection}
        onOpenPayment={handleOpenPayment}
      />
      <ServiceSelectionModal
        visible={serviceModalVisible}
        onClose={() => setServiceModalVisible(false)}
        onSelect={handleServiceSelection}
        selectedServices={selectedUser ? selectedServices[selectedUser.id] : []}
      />
      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        user={selectedUser}
        services={selectedUser ? selectedServices[selectedUser.id] : []}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});