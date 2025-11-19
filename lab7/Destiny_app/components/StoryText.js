import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoryText({ title, text }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20, alignItems: 'center' },
    title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
    text: { color: '#d1d5db', fontSize: 16, textAlign: 'center' },
});
