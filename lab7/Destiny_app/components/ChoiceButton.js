import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ChoiceButton({ text, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: '#0ea5a6',
        borderRadius: 8,
        marginVertical: 8,
        alignItems: 'center',
    },
    text: {
        color: '#04263a',
        fontWeight: '700',
        fontSize: 16,
    }
});
