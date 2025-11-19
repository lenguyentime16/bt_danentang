import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function QuestionText({ text, small }) {
    return (
        <Text style={[styles.text, small && styles.small]}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 12,
    },
    small: {
        fontSize: 20,
        marginHorizontal: 6,
    }
});
