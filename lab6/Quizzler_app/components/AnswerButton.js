import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AnswerButton({ text, color, onPress }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 8,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    }
});
