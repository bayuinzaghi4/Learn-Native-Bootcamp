import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CountDown from 'react-native-countdown-component-maintained';
import { formatCurrency } from '../utils/formatCurrency'; // Pastikan fungsi formatCurrency Anda sudah diimport
import Button from '../components/Button';
import Clipboard from '@react-native-clipboard/clipboard';
import { statusChange, selectOrder } from '../redux/reducers/order';
import {useSelector, useDispatch} from 'react-redux';
import { startCountdown, decrementCountdown, resetCountdown } from '../redux/reducers/timer/actionCreator';


export default function PaymentDetailScreen({ route }) {
    const navigation = useNavigation();
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();
    const countdownTime = useSelector(state => state.countdowns[order.id]);


    const { bank, car, totalPrice, startDate, endDate, isDriver } = route.params; // Data yang diterima dari PaymentScreen
    useFocusEffect(
        React.useCallback(() => {
            if (order.status) dispatch(statusChange());
        }, [order.status]),
    );

    useFocusEffect(
        useCallback(() => {

        })
    )
    const handleCopyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert('Disalin', 'Nomor rekening telah disalin ke clipboard.');
    };

    const handleConfirmPayment = () => {
        // Logika untuk mengonfirmasi pembayaran
        Alert.alert('Pembayaran Dikonfirmasi', 'Kami akan memverifikasi pembayaran Anda.');
    };

    

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {/* Back Button */}
                    <Button style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon size={32} name={'arrow-left'} color={'black'} />
                    </Button>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>{bank} Transfer</Text>
                        <Text style={styles.orderId}>Order ID: </Text>
                    </View>
                </View>
            </View>


            {/* Progress Step */}
            <View style={styles.progressContainer}>
                <View style={styles.progressStep}>
                    <View style={[styles.stepCircle, styles.completedStep]}>
                        <Icon name="check" size={14} color="white" />
                    </View>
                    <Text style={styles.stepText}>Metode</Text>
                </View>
                <View style={styles.progressLine1} />
                <View style={styles.progressStep}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>2</Text>
                    </View>
                    <Text style={styles.stepText}>Bayar</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressStep}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>3</Text>
                    </View>
                    <Text style={styles.stepText}>Tiket</Text>
                </View>
            </View>

            <ScrollView>
                {/* Countdown Timer */}
                <Text style={styles.countdownText}>Selesaikan Pembayaran Sebelum</Text>
                <CountDown
                    until={23 * 60 * 60 + 55 * 60 + 9} // Total detik (contoh: 23 jam, 55 menit, 9 detik)
                    size={20}
                    digitStyle={styles.digitStyle}
                    digitTxtStyle={styles.digitTxtStyle}
                    timeLabelStyle={styles.timeLabelStyle}
                    separatorStyle={styles.separatorStyle}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ h: null, m: null, s: null }}
                />

                {/* Payment Information */}
                <Text style={styles.paymentDueDate}>Rabu, 19 Jun 2022 jam 13.00 WIB</Text>

                {/* Vehicle Details */}
                <View style={styles.vehicleCard}>
                    <Image
                        style={styles.carIconPlaceholder}
                        source={{ uri: car.img }}
                    />
                    <View style={styles.vehicleDetailss}>
                        <Text style={styles.vehicleName}>{car.name}</Text>
                        <View style={styles.vehicleIcons}>
                            <View style={styles.iconContainer}>
                                <Icon size={14} name={'users'} color={'#8A8A8A'} />
                                <Text style={styles.iconText}>{car.seat}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon size={14} name={'briefcase'} color={'#8A8A8A'} />
                                <Text style={styles.iconText}>{car.baggage}</Text>
                            </View>
                        </View>
                        <Text style={styles.price}>{formatCurrency.format(totalPrice)}</Text>
                    </View>
                </View>

                {/* Bank Information */}
                <View style={styles.PaymentTittle}>
                    <Text style={styles.sectionTitle}>Lakukan Transfer ke</Text>
                </View>
                <View style={styles.bankInfo}>
                    <View style={styles.bankRow}>
                        <Text style={styles.bankName}>BCA</Text>
                        <Text style={styles.bankDescription}>BCA Transfer</Text>
                    </View>
                    <View style={styles.bankRow}>
                        <Text style={styles.label}>Nomor Rekening</Text>
                        <TouchableOpacity
                            onPress={() => handleCopyToClipboard('1234-5678-91011')}
                            style={styles.copyButton}
                        >
                            <Text style={styles.copyText}>1234-5678-91011</Text>
                            <Icon name="copy" size={18} color="#4CAF50" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bankRow}>
                        <Text style={styles.label}>Total Bayar</Text>
                        <TouchableOpacity
                            onPress={() => handleCopyToClipboard(totalPrice)}
                            style={styles.copyButton}
                        >
                            <Text style={styles.copyText}>{formatCurrency.format(totalPrice)}</Text>
                            <Icon name="copy" size={18} color="#4CAF50" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Actions */}
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmPayment}
                >
                    <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.viewOrdersButton}
                    onPress={() => navigation.navigate('HomeTabs', { screen: 'Order' })}
                >
                    <Text style={styles.viewOrdersButtonText}>Lihat Daftar Pesanan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.viewOrdersButtonCancel}
                    onPress={() => navigation.navigate('HomeTabs', { screen: 'Order' })}
                >
                    <Text style={styles.viewOrdersButtonText}>Cancel Order</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontWeight: 700,
        fontSize: 17,
        textAlign: 'center',
    },
    PaymentTittle: {
        flex: 1,
    },
    header: {
        flexDirection: 'row', // Menyusun tombol back dan teks secara horizontal
        alignItems: 'flex-start', // Menyelaraskan ke kiri
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerLeft: {
        flexDirection: 'row', // Menyusun tombol back dan teks secara horizontal
        alignItems: 'center', // Menyelaraskan vertikal
        flex: 1, // Membuat ruang kiri lebih besar
    },
    backButton: {
        marginRight: 8, // Memberi jarak antara tombol back dan teks
    },
    headerTextContainer: {
        flexDirection: 'column', // Menata teks secara vertikal
        alignItems: 'flex-start', // Menyelaraskan teks ke kiri
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    vehicleDetailss: {
        marginLeft: 12,
    },
    carIconPlaceholder: {
        width: 150,
        height: 70,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4, // Memberi jarak antara "BCA Transfer" dan "Order ID"
        color: '#666',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    progressStep: {
        alignItems: 'center',
    },
    progressLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 8,
    },
    progressLine1: {
        flex: 1,
        height: 1,
        backgroundColor: '#4CAF50',
        marginHorizontal: 8,
    },
    stepCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    completedStep: {
        backgroundColor: '#4CAF50',
    },
    stepNumber: {
        fontSize: 12,
        color: '#666',
    },
    stepText: {
        fontSize: 12,
        color: '#666',
    },
    countdownText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    paymentDueDate: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    digitStyle: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    digitTxtStyle: {
        color: '#4CAF50',
    },
    separatorStyle: {
        color: '#4CAF50',
    },
    vehicleCard: {
        margin: 6,
        marginLeft: 25,
        marginRight: 25,
        paddingLeft: 14,
        paddingRight: 60,
        paddingTop: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: '600',
    },
    vehicleIcons: {
        flexDirection: 'row',
        marginTop: 4,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    iconText: {
        marginLeft: 4,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
        marginTop: 8,
    },
    bankInfo: {
        margin: 5,
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 18,
        marginBottom: 16,
        marginTop: 17
    },
    bankRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    copyText: {
        marginRight: 8,
        color: '#333',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 8,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 25
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    viewOrdersButton: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
    viewOrdersButtonCancel: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10
    },
    viewOrdersButtonText: {
        color: '#4CAF50',
        fontWeight: '600',
    },
});


