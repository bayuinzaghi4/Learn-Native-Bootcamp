import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { HERE_API_KEY } from '@env';



export default function GeoLOC() {
    const getAddressFromCoordinates = async ({ latitude, longitude }) => {
        try {
            
            const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&limit=1&at=${latitude},${longitude}`;
            const res = await axios(url);
            const resJson = res.data;
            
            // The response has a 'data' key
            if (resJson?.items.length > 0) {
                const {address} = resJson.items[0];
                return `${address.street}, ${address.countryName}`;

            }
            return null;
        } catch (e) {
            console.log('Error in getAddressFromCoordinates', e);
        }
    };

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos) => {
                const address = getAddressFromCoordinates(pos.coords);
                setPosition(address);
            },
            (error) =>
                Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true }
        );
    };

    const [position, setPosition] = useState(null);

    useEffect(() => getCurrentPosition(), []);

    return (
        <View>
            <Text style={styles.title}>{position}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        color: '#fff'
    },
});
