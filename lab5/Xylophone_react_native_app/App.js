import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

const notes = {
  1: require('./assets/sounds/note1.wav'),
  2: require('./assets/sounds/note2.wav'),
  3: require('./assets/sounds/note3.wav'),
  4: require('./assets/sounds/note4.wav'),
  5: require('./assets/sounds/note5.wav'),
  6: require('./assets/sounds/note6.wav'),
  7: require('./assets/sounds/note7.wav'),
};

const colors = {
  1: '#FF4B4B',
  2: '#FF884B',
  3: '#FFD54B',
  4: '#8BC34A',
  5: '#4BC0FF',
  6: '#7B61FF',
  7: '#FF4BD6',
};

export default function App() {
  async function playNote(n) {
    try {
      const { sound } = await Audio.Sound.createAsync(notes[n]);
      await sound.playAsync();
      // Unload sound when finished to free resources
      sound.setOnPlaybackStatusUpdate(async status => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  function renderKey(n) {
    return (
      <TouchableOpacity
        key={n}
        style={[styles.key, { backgroundColor: colors[n] }]}
        onPress={() => playNote(n)}
        activeOpacity={0.7}
        accessibilityLabel={`Play note ${n}`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xylophone</Text>
      <View style={styles.keysContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map(renderKey)}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220',
    paddingTop: 48,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  keysContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  key: {
    flex: 1,
    marginVertical: 6,
    borderRadius: 8,
  },
});
