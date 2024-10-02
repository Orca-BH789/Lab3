import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { logout } from '../store/slices/authSlice';

export const SettingScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [birthday, setBirthday] = useState(user?.birthday || '');
  const [address, setAddress] = useState(user?.address || '');

  useEffect(() => {
    // Nếu cần, bạn có thể tải lại dữ liệu người dùng từ Firebase Authentication
    const currentUser = auth().currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      // Lưu ý: birthday và address không được lưu trong Firebase Authentication
      // Bạn có thể lấy dữ liệu này từ Firestore nếu cần.
    }
  }, []);

  const handleSave = async () => {
    try {
      await auth().currentUser.updateProfile({ displayName });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    auth().signOut().catch(error => console.log('Error logging out: ', error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        label="Birthday"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
      <Button mode="outlined" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
});
