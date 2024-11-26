import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Markdown from 'react-native-markdown-display';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { statusChange } from '../redux/reducers/order';
import Button from '../components/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { getCarDetails, resetState } from '../redux/reducers/cars';

const md = `## Include
- Apa saja yang termasuk dalam paket misal durasi max 12 jam
- Sudah termasuk bensin selama 12 jam
- Sudah termasuk Tiket Wisata
- Sudah termasuk pajak
- Sudah Termasuk Snack
- Sudah Termasuk Minum  

## Exclude
- Tidak termasuk biaya makan sopir Rp 75.000/hari
- Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
- Tidak termasuk akomodasi penginapan
- Tidak Termasuk Bensin
- Tidak Termasuk Driver`.toString();

export default function Detail({ route }) {
    const navigation = useNavigation();
    const { id } = route.params;
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await dispatch(getCarDetails(id));
                    setData(response.payload);
                } catch (error) {
                    console.error('Error fetching car details:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }, [id, dispatch])
    );

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon size={32} name="arrow-left" color="#000" />
                </Button>
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Icon size={14} name="users" color="#000" />
                        <Text style={styles.infoText}>{data.seat}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon size={14} name="briefcase" color="#000" />
                        <Text style={styles.infoText}>{data?.baggage || 'N/A'}</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.heading}>
                    <Image
                        style={styles.image}
                        source={{ uri: data?.img || 'https://via.placeholder.com/150' }}
                        resizeMode="contain"
                    />
                </View>
                <Markdown style={styles.details}>{md}</Markdown>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.price}>{formatCurrency.format(data?.price || 0)} </Text>
                <Button
                    borderRadius={8}
                    color="#4CAF50"
                    title="Lanjutkan Pembayaran"
                    onPress={() => {
                        if (data) {
                            navigation.navigate('Payment', { carDetails: data }, );
                        } else {
                            alert('Data tidak tersedia. Coba lagi nanti.');
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center', // Center all elements horizontally
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        position: 'absolute',
        left: 5,
        top: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10, // Jarak antar info item
        paddingBottom: 6
    },
    infoText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginLeft: 5,
    },
    contentContainer: {
        padding: 20,
    },
    heading: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    details: {
        body: {
            fontSize: 16,
            marginBottom: 10,
        },
        bullet_list: {
            marginBottom: 10,
            marginLeft: 10,
        },
        heading2: {
            marginBottom: 10,
            fontSize: 18,
            fontFamily: 'PoppinsBold',
        },
    },
    price: {
        fontFamily: 'PoppinsBold',
        fontSize: 20,
        marginBottom: 10,
    },
    footer: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginTop: 10,
    },
});
