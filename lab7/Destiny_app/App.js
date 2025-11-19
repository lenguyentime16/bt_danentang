import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StoryText from './components/StoryText';
import ChoiceButton from './components/ChoiceButton';
import storyData from './data/story';

export default function App() {
  const [nodeId, setNodeId] = useState('start');

  const node = storyData[nodeId];

  function choose(choiceIndex) {
    const nextId = node.choices[choiceIndex].next;
    if (!nextId) {
      Alert.alert('Kết thúc', 'Câu chuyện đã kết thúc.');
      return;
    }
    setNodeId(nextId);
  }

  return (
    <View style={styles.container}>
      <StoryText title={node.title} text={node.text} />

      {node.choices.map((c, i) => (
        <ChoiceButton key={i} text={c.label} onPress={() => choose(i)} />
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081229',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
