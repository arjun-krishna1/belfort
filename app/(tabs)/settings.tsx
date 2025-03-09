import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function SettingsScreen() {
  const { stocks, removeStock } = usePortfolioStore();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Portfolio</Text>
          {stocks.map((stock) => (
            <View key={stock.symbol} style={styles.stockItem}>
              <View>
                <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                <Text style={styles.stockShares}>{stock.shares} shares</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeStock(stock.symbol)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch value={true} disabled />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Real-time Updates</Text>
            <Switch value={true} disabled />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>Belfort</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Track your stock portfolio in real-time with beautiful visualizations and detailed analytics.
            </Text>
          </View>
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
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#FF453A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  aboutCard: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
});