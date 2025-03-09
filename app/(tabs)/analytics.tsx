import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function AnalyticsScreen() {
  const { stocks, totalValue } = usePortfolioStore();

  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.shares * stock.averagePrice, 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + (stock.gainLoss || 0), 0);
  const totalGainLossPercentage = (totalGainLoss / totalInvestment) * 100;

  const bestPerformer = [...stocks].sort((a, b) => (b.gainLossPercentage || 0) - (a.gainLossPercentage || 0))[0];
  const worstPerformer = [...stocks].sort((a, b) => (a.gainLossPercentage || 0) - (b.gainLossPercentage || 0))[0];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio Overview</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Investment</Text>
              <Text style={styles.value}>
                ${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Value</Text>
              <Text style={styles.value}>
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Gain/Loss</Text>
              <Text style={[styles.value, { color: totalGainLoss >= 0 ? '#32D74B' : '#FF453A' }]}>
                {totalGainLoss >= 0 ? '+' : ''}$
                {totalGainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                {' ('}
                {totalGainLoss >= 0 ? '+' : ''}
                {totalGainLossPercentage.toFixed(2)}%{')'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          {bestPerformer && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Best Performer</Text>
              <Text style={styles.symbol}>{bestPerformer.symbol}</Text>
              <Text style={[styles.performance, { color: '#32D74B' }]}>
                +{bestPerformer.gainLossPercentage?.toFixed(2)}%
              </Text>
            </View>
          )}
          {worstPerformer && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Worst Performer</Text>
              <Text style={styles.symbol}>{worstPerformer.symbol}</Text>
              <Text style={[styles.performance, { color: '#FF453A' }]}>
                {worstPerformer.gainLossPercentage?.toFixed(2)}%
              </Text>
            </View>
          )}
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  cardTitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  symbol: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  performance: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
});