import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const phone = '+84123456789';
  const email = 'youremail@example.com';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image

            source={{ uri: 'https://jbagy.me/wp-content/uploads/2025/03/hinh-anh-cute-avatar-vo-tri-3.jpg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Lê Công Nguyên</Text>
          <Text style={styles.job}>Fullstack Developer</Text>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Text style={styles.icon}>📞</Text>
            <Text style={styles.rowText}>{phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text style={styles.icon}>✉️</Text>
            <Text style={styles.rowText}>{email}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a0f1a' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#121827',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  job: {
    color: '#aab2c7',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a313b',
    alignSelf: 'stretch',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%'
  },
  icon: { fontSize: 18, width: 40, textAlign: 'center' },
  rowText: { color: '#dfe6ef', fontSize: 16 },
});
