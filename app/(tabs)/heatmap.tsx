import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { usePortfolioStore } from '@/store/portfolioStore';

const { width } = Dimensions.get('window');
const BOX_SIZE = (width - 48) / 2;

export default function HeatMapScreen() {
  const { stocks } = usePortfolioStore();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Portfolio Heat Map</Text>
        <View style={styles.heatmap}>
          {stocks.map((stock) => (
            <View
              key={stock.symbol}
              style={[
                styles.box,
                {
                  backgroundColor: (stock.gainLossPercentage || 0) >= 0 ? '#32D74B' : '#FF453A',
                  opacity: Math.min(Math.abs((stock.gainLossPercentage || 0)) / 100 + 0.2, 1),
                },
              ]}>
              <Text style={styles.symbol}>{stock.symbol}</Text>
              <Text style={styles.percentage}>
                {(stock.gainLossPercentage || 0) >= 0 ? '+' : ''}
                {stock.gainLossPercentage?.toFixed(2)}%
              </Text>
              <Text style={styles.price}>
                ${stock.currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    padding: 16,
  },
  heatmap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
});