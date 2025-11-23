import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SearchBox({ apiKey, onSelectLocation, placeholder = 'Nhập tên thành phố' }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (!query || !query.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        // debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchSuggestions(query.trim());
        }, 400);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    async function fetchSuggestions(q) {
        if (!apiKey) return;
        setLoading(true);
        try {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=6&appid=${apiKey}`;
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([]);
            }
        } catch (err) {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    function renderItem({ item }) {
        const label = [item.name, item.state, item.country].filter(Boolean).join(', ');
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setQuery(label);
                    setResults([]);
                    if (onSelectLocation) onSelectLocation({ name: label, lat: item.lat, lon: item.lon });
                }}
            >
                <Text style={styles.itemText}>{label}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                value={query}
                onChangeText={setQuery}
            />
            {loading ? <ActivityIndicator style={styles.loading} size="small" color="#06b6d4" /> : null}
            {results.length > 0 ? (
                <View style={styles.dropdown}>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={results}
                        keyExtractor={(i, idx) => `${i.lat}-${i.lon}-${idx}`}
                        renderItem={renderItem}
                    />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    input: {
        backgroundColor: '#071029',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
    },
    loading: { position: 'absolute', right: 12, top: 12 },
    dropdown: { backgroundColor: '#071029', marginTop: 8, borderRadius: 8, maxHeight: 200 },
    item: { padding: 12, borderBottomColor: '#0b1220', borderBottomWidth: 1 },
    itemText: { color: '#cbd5e1' },
});
