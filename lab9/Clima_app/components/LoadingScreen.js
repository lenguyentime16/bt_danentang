import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen({ message = 'Loading...' }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#06b6d4" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b1220',
        padding: 16,
    },
    text: {
        marginTop: 12,
        color: '#cbd5e1',
        fontSize: 16,
    },
});
