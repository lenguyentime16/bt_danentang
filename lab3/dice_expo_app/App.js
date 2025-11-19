import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const diceImages = {
  1: require('./assets/dice-1.png'),
  2: require('./assets/dice-2.png'),
  3: require('./assets/dice-3.png'),
  4: require('./assets/dice-4.png'),
  5: require('./assets/dice-5.png'),
  6: require('./assets/dice-6.png'),
};

export default function App() {
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(1);

  function roll() {
    const l = Math.floor(Math.random() * 6) + 1;
    const r = Math.floor(Math.random() * 6) + 1;
    setLeft(l);
    setRight(r);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Dice</Text>

        <View style={styles.diceRow}>
          <Image source={diceImages[left]} style={styles.dice} />
          <Image source={diceImages[right]} style={styles.dice} />
        </View>

        <TouchableOpacity style={styles.button} onPress={roll} accessibilityLabel="Roll Dice">
          <Text style={styles.buttonText}>Roll</Text>
        </TouchableOpacity>


      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1220' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { color: '#fff', fontSize: 32, marginBottom: 24, fontWeight: '700' },
  diceRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dice: { width: 140, height: 140, marginHorizontal: 12, resizeMode: 'contain' },
  button: { marginTop: 28, backgroundColor: '#1e90ff', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  resultText: { color: '#d1d9e6', marginTop: 18, fontSize: 18 }
});
