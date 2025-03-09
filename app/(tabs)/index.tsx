import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Plus } from 'lucide-react-native';

export default function PortfolioScreen() {
  const { stocks, totalValue, isLoading, addStock, updateStockPrices } = usePortfolioStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '', shares: '', averagePrice: '' });

  useEffect(() => {
    // Initial update
    updateStockPrices();

    // Set up interval for updates
    const interval = setInterval(updateStockPrices, 15000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleAddStock = () => {
    if (newStock.symbol && newStock.shares && newStock.averagePrice) {
      addStock({
        symbol: newStock.symbol.toUpperCase(),
        shares: Number(newStock.shares),
        averagePrice: Number(newStock.averagePrice),
      });
      setNewStock({ symbol: '', shares: '', averagePrice: '' });
      setShowAddForm(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Portfolio Value</Text>
          <Text style={styles.value}>
            ${isLoading ? '...' : totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        {stocks.map((stock) => (
          <View key={stock.symbol} style={styles.stockCard}>
            <View style={styles.stockHeader}>
              <Text style={styles.stockSymbol}>{stock.symbol}</Text>
              <Text style={styles.stockShares}>{stock.shares} shares</Text>
            </View>
            <View style={styles.stockDetails}>
              <Text style={styles.stockPrice}>
                ${stock.currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
              <Text
                style={[
                  styles.stockGainLoss,
                  { color: (stock.gainLoss || 0) >= 0 ? '#32D74B' : '#FF453A' },
                ]}>
                {(stock.gainLoss || 0) >= 0 ? '+' : ''}
                {stock.gainLossPercentage?.toFixed(2)}%
              </Text>
            </View>
          </View>
        ))}

        {showAddForm ? (
          <View style={styles.addForm}>
            <TextInput
              style={styles.input}
              placeholder="Symbol (e.g., AAPL)"
              placeholderTextColor="#8E8E93"
              value={newStock.symbol}
              onChangeText={(text) => setNewStock({ ...newStock, symbol: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of shares"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={newStock.shares}
              onChangeText={(text) => setNewStock({ ...newStock, shares: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Average price per share"
              placeholderTextColor="#8E8E93"
              keyboardType="numeric"
              value={newStock.averagePrice}
              onChangeText={(text) => setNewStock({ ...newStock, averagePrice: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddStock}>
              <Text style={styles.addButtonText}>Add Stock</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addStockButton} onPress={() => setShowAddForm(true)}>
            <Plus size={24} color="#32D74B" />
            <Text style={styles.addStockText}>Add Stock</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  value: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginTop: 8,
  },
  stockCard: {
    backgroundColor: '#1C1C1E',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockSymbol: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  stockShares: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  stockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockPrice: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  stockGainLoss: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addStockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  addStockText: {
    color: '#32D74B',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addForm: {
    backgroundColor: '#1C1C1E',
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  addButton: {
    backgroundColor: '#32D74B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});