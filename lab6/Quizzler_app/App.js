import React, { useState } from 'react';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QuestionText from './components/QuestionText';
import AnswerButton from './components/AnswerButton';
import questions from './data/questions';

export default function App() {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]); // array of 'correct'|'wrong'

  function handleAnswer(choice) {
    const correct = questions[index].answer === choice;
    setResults(prev => [...prev, correct ? 'correct' : 'wrong']);

    const next = index + 1;
    if (next >= questions.length) {
      // finished
      const correctCount = (results.filter(r => r === 'correct').length) + (correct ? 1 : 0);
      Alert.alert('Kết thúc', `Bạn trả lời đúng ${correctCount} trên ${questions.length} câu.`, [
        { text: 'Làm lại', onPress: resetQuiz },
      ]);
    } else {
      setIndex(next);
    }
  }

  function resetQuiz() {
    setIndex(0);
    setResults([]);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <QuestionText text={questions[index].question} />

        <AnswerButton text="True" color="#4CAF50" onPress={() => handleAnswer(true)} />
        <AnswerButton text="False" color="#F44336" onPress={() => handleAnswer(false)} />

        <View style={styles.scoreRow}>
          {results.map((r, i) => (
            <QuestionText key={i} small text={r === 'correct' ? '✔️' : '❌'} />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1724',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
  },
});
