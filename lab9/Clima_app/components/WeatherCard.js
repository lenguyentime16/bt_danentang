import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherCard({ weather, displayName }) {
    if (!weather) return null;

    const { name, main, weather: w } = weather;
    const temp = Math.round(main.temp);
    const desc = w[0].description;
    const mainCond = (w[0].main || '').toLowerCase();

    let iconName = 'weather-cloudy';
    let iconColor = '#cbd5e1';
    if (mainCond.includes('clear')) {
        iconName = 'weather-sunny';
        iconColor = '#ffd166';
    } else if (mainCond.includes('rain') || mainCond.includes('drizzle')) {
        iconName = 'weather-rainy';
        iconColor = '#4fa3f7';
    } else if (mainCond.includes('thunder')) {
        iconName = 'weather-lightning';
        iconColor = '#f97316';
    } else if (mainCond.includes('snow')) {
        iconName = 'weather-snowy';
        iconColor = '#7dd3fc';
    } else if (mainCond.includes('cloud')) {
        iconName = 'weather-cloudy';
        iconColor = '#cbd5e1';
    } else if (mainCond.includes('mist') || mainCond.includes('fog') || mainCond.includes('haze')) {
        iconName = 'weather-fog';
        iconColor = '#94a3b8';
    }

    return (
        <View style={styles.card}>
            <Text style={styles.city}>{displayName || name}</Text>
            <MaterialCommunityIcons name={iconName} size={120} color={iconColor} style={styles.icon} />
            <Text style={styles.temp}>{temp}°C</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#071029',
        padding: 18,
        borderRadius: 12,
        width: '100%',
        marginBottom: 12,
    },
    city: { color: '#fff', fontSize: 20, fontWeight: '700' },
    icon: { width: 150, height: 150 },
    temp: { color: '#fff', fontSize: 42, fontWeight: '700' },
    desc: { color: '#cbd5e1', fontSize: 16, textTransform: 'capitalize' },
});
