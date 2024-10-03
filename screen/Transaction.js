import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getTransactions } from '../store/slices/transactionService';
import { Calendar, CreditCard, Wallet } from 'lucide-react-native';

export const TransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = (transactions) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.timestamp);
      switch (timeFilter) {
        case 'today':
          return transactionDate >= today;
        case 'week':
          return transactionDate >= lastWeek;
        case 'month':
          return transactionDate >= lastMonth;
        default:
          return true;
      }
    });
  };

  const getFilteredTransactions = () => {
    return filterTransactions(transactions);
  };

  const getTotalAmount = () => {
    return getFilteredTransactions().reduce((sum, transaction) => sum + transaction.total, 0);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.customerName}>{item.userName}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleDateString('vi-VN')}
        </Text>
      </View>
      
      <View style={styles.servicesList}>
        {item.services.map(service => (
          <Text key={service.id} style={styles.serviceItem}>
            {service.name}: {service.price.toLocaleString('vi-VN')}đ
          </Text>
        ))}
      </View>
      
      <View style={styles.transactionFooter}>
        <View style={styles.paymentMethod}>
          {item.paymentMethod === 'cash' ? (
            <Wallet size={20} color="#000" />
          ) : (
            <CreditCard size={20} color="#000" />
          )}
          <Text style={styles.paymentMethodText}>
            {item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
          </Text>
        </View>
        <Text style={styles.total}>
          {item.total.toLocaleString('vi-VN')}đ
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch sử giao dịch</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'all' && styles.activeFilter]}
            onPress={() => setTimeFilter('all')}
          >
            <Text style={[styles.filterText, timeFilter === 'all' && styles.activeFilterText]}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'today' && styles.activeFilter]}
            onPress={() => setTimeFilter('today')}
          >
            <Text style={[styles.filterText, timeFilter === 'today' && styles.activeFilterText]}>Hôm nay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'week' && styles.activeFilter]}
            onPress={() => setTimeFilter('week')}
          >
            <Text style={[styles.filterText, timeFilter === 'week' && styles.activeFilterText]}>Tuần này</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, timeFilter === 'month' && styles.activeFilter]}
            onPress={() => setTimeFilter('month')}
          >
            <Text style={[styles.filterText, timeFilter === 'month' && styles.activeFilterText]}>Tháng này</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryContent}>
          <Calendar size={24} color="#f50062" />
          <View style={styles.summaryText}>
            <Text style={styles.summaryLabel}>Tổng doanh thu</Text>
            <Text style={styles.summaryAmount}>{getTotalAmount().toLocaleString('vi-VN')}đ</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loading} />
      ) : (
        <FlatList
          data={getFilteredTransactions()}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#f50062',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  summary: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f50062',
  },
  listContainer: {
    padding: 16,
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#666',
  },
  servicesList: {
    marginBottom: 10,
  },
  serviceItem: {
    marginBottom: 5,
    color: '#444',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    marginLeft: 5,
    color: '#666',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});