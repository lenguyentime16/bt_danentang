import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import LoadingScreen from './components/LoadingScreen';
import WeatherCard from './components/WeatherCard';
import SearchBox from './components/SearchBox';

// Read API key from Expo config (app.config.js -> extra) or environment
const API_KEY =
  (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.OPENWEATHER_API_KEY) ||
  (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.OPENWEATHER_API_KEY) ||
  process.env.OPENWEATHER_API_KEY ||
  '';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      await fetchByLocation();
    })();
  }, []);

  async function fetchByLocation() {
    setLoading(true);
    setErrorMsg('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to get weather for your location.');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const { latitude, longitude } = loc.coords;
      // Try to get a human readable place name from device location
      try {
        const rev = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (Array.isArray(rev) && rev.length > 0) {
          const p = rev[0];
          const parts = [p.name, p.street, p.city, p.region, p.country].filter(Boolean);
          setDisplayName(parts.join(', '));
        }
      } catch (_) {
        // ignore reverse geocode errors
      }

      await fetchWeatherByCoords(latitude, longitude);
    } catch (err) {
      Alert.alert('Error', 'Could not get location: ' + err.message);
      setLoading(false);
    }
  }

  async function fetchWeatherByCoords(lat, lon, nameForDisplay) {
    if (!API_KEY) {
      Alert.alert('Missing API key', 'Please set OPENWEATHER_API_KEY in .env or app config.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        // if caller provided a display name (from device reverse geocode or suggestion), prefer it
        if (nameForDisplay) setDisplayName(nameForDisplay);
        setErrorMsg('');
      } else {
        // Detect invalid API key
        if (res.status === 401 || (data && /invalid api key/i.test(data.message || ''))) {
          const msg = 'Invalid API key. Please update OPENWEATHER_API_KEY in .env or app config.';
          setErrorMsg(msg);
          Alert.alert('Invalid API key', msg);
        } else {
          const msg = data.message || 'Failed to fetch weather';
          setErrorMsg(msg);
          Alert.alert('API Error', msg);
        }
        setWeather(null);
      }
    } catch (err) {
      Alert.alert('Network error', err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handler used by SearchBox when user selects a suggested location
  function handleSelectLocation({ name, lat, lon }) {
    setLoading(true);
    setErrorMsg('');
    // use the provided lat/lon to fetch weather; also set display name from suggestion
    fetchWeatherByCoords(lat, lon, name).finally(() => setLoading(false));
  }

  if (loading) return <LoadingScreen message="Lấy vị trí & thời tiết..." />;

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', marginTop: 24 }}>
        <SearchBox apiKey={API_KEY} onSelectLocation={handleSelectLocation} />
        <TouchableOpacity style={[styles.btn, styles.locBtn, { marginTop: 12 }]} onPress={fetchByLocation}>
          <Text style={styles.btnText}>Vị trí</Text>
        </TouchableOpacity>
      </View>

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <WeatherCard weather={weather} displayName={displayName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', padding: 16 },
  searchRow: { flexDirection: 'row', marginTop: 24, marginBottom: 12, alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: '#071029',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btn: { backgroundColor: '#06b6d4', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, marginRight: 8 },
  locBtn: { backgroundColor: '#7c3aed' },
  btnText: { color: '#04263a', fontWeight: '700' },
  errorText: { color: '#ff6b6b', marginVertical: 8, textAlign: 'center' },
});
