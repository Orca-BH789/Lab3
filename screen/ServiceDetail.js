import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteServiceFromFirestore } from '../store/slices/serviceSlice';

const ServiceDetail = ({ route, navigation }) => {
  const { serviceId } = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const service = useSelector((state) => 
    state.service.services.find((s) => s.id === serviceId)
  );

  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            dispatch(deleteServiceFromFirestore(serviceId));
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!service) {
    return (
      <View style={styles.centered}>
        <Title>Service not found</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}> {service.name}</Title>
          <Paragraph style={styles.paragraph}>Description: {service.description}</Paragraph>
          <Paragraph style={styles.paragraph}>Price: {service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Paragraph>
          <Paragraph style={styles.paragraph}>Creator: {service.creator}</Paragraph>
          <Paragraph style={styles.paragraph}>Time: {service.time ? new Date(service.time).toLocaleString('vi-VN') : 'N/A'}</Paragraph>
          <Paragraph style={styles.paragraph}>Last Update: {service.finalUpdate ? new Date(service.finalUpdate).toLocaleString('vi-VN') : 'N/A'}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
          <Button 
              mode="contained" 
              onPress={() => navigation.navigate('AddNewService', { serviceId })}
              style={styles.editButton}
              contentStyle={styles.editButtonContent}
            >
              Update
            </Button>

            <Button 
              mode="outlined" 
              onPress={handleDelete} 
              style={styles.deleteButton}
              labelStyle={styles.deleteButtonLabel}
              loading={loading}
              disabled={loading}
            >
              Delete
    </Button>
      </View>
    </View>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',   
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 15, 
    elevation: 4, 
    backgroundColor: '#0a7efa', 
  },
  editButtonContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    borderRadius: 15, 
    borderWidth: 2,
    borderColor: '#f50062', 
    backgroundColor: 'transparent',
    elevation: 2,
  },
  deleteButtonLabel: {
    color: '#f50062', 
    fontWeight: 'bold',
  },
});
