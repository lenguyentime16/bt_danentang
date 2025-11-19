import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const balls = {
  1: require('./assets/ball1.png'),
  2: require('./assets/ball2.png'),
  3: require('./assets/ball3.png'),
  4: require('./assets/ball4.png'),
  5: require('./assets/ball5.png'),
};

export default function App() {
  const [index, setIndex] = useState(1);

  function shakeBall() {
    const next = Math.floor(Math.random() * 5) + 1; // 1..5
    setIndex(next);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Magic 8 Ball</Text>

        <TouchableOpacity onPress={shakeBall} style={styles.ballContainer} accessibilityLabel="Shake Ball">
          <Image source={balls[index]} style={styles.ball} />
        </TouchableOpacity>

        <Text style={styles.hint}>Nhấn vào quả bóng để lắc</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1220' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 20 },
  ballContainer: { alignItems: 'center', justifyContent: 'center' },
  ball: { width: 260, height: 260, resizeMode: 'contain' },
  hint: { color: '#cbd5e1', marginTop: 18 }
});
