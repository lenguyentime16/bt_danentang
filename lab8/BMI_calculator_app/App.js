import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [weight, setWeight] = useState(''); // kg
  const [height, setHeight] = useState(''); // cm
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  function calculateBMI() {
    const w = parseFloat(weight.replace(',', '.'));
    const hcm = parseFloat(height.replace(',', '.'));
    if (!w || !hcm || w <= 0 || hcm <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập cân nặng và chiều cao hợp lệ.');
      return;
    }
    const hm = hcm / 100; // convert cm to meters
    const value = w / (hm * hm);
    const rounded = Math.round(value * 10) / 10;
    setBmi(rounded);
    setCategory(getCategory(value));
    Keyboard.dismiss();
  }

  function getCategory(value) {
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Normal';
    if (value < 30) return 'Overweight';
    return 'Obese';
  }

  function reset() {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Cân nặng (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        returnKeyType="done"
      />

      <TextInput
        style={styles.input}
        placeholder="Chiều cao (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Tính BMI</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.reset]} onPress={reset}>
        <Text style={[styles.buttonText, styles.resetText]}>Đặt lại</Text>
      </TouchableOpacity>

      {bmi !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>BMI: {bmi}</Text>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1724',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#06b6d4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#04263a', fontSize: 18, fontWeight: '700' },
  reset: { backgroundColor: '#334155' },
  resetText: { color: '#fff' },
  resultBox: { marginTop: 20, alignItems: 'center' },
  resultText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  categoryText: { color: '#cbd5e1', fontSize: 18, marginTop: 6 },
});
