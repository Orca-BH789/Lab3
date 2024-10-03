import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator ,Alert} from 'react-native';

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (name && department) {
      setLoading(true);
      try {
        await onUserAdded({ name, department });
        setName('');
        setDepartment('');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Name and department are required');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />
      <Button
        title="Add User"
        onPress={handleAddUser}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
