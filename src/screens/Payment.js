import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
    Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { formatCurrency } from '../utils/formatCurrency';
import Button from '../components/Button';
import ModalPopup from '../components/Modal';
// Redux
import { resetState } from '../redux/reducers/cars';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../redux/reducers/user';
import { postOrder, selectOrder, updateOrder, orderReset } from '../redux/reducers/order';

export default function PaymentScreen({ route }) {
    const navigation = useNavigation();
    const { carDetails } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const [updated, setUpdated] = useState(false);
    const [isDriver, setIsDriver] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPromoApplied, setPromoApplied] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isReturnDatePickerVisible, setReturnDatePickerVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(carDetails.price);

    const [bankModal, setBankModal] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    // Go Back
    useEffect(() => {
        if (!carDetails) {
            navigation.goBack();
        }
    }, [carDetails]);

    // Handle Payment
    const handleNextPayment = async () => {
        const data = {
            car_id: carDetails.id,
            start_time: selectedDate,
            end_time: returnDate,
            is_driver: isDriver,
            payment_method: selectedBank
        };

        const updateData = {
            start_time: selectedDate,
            end_time: returnDate,
            is_driver: isDriver,
            payment_method: selectedBank
        };

        if (!order.data) {
            dispatch(postOrder({ form: data, token: user.token }))
            setUpdated(false)
        } else {
            dispatch(updateOrder({
                id: order.data.id,
                form: updateData,
                token: user.token
            }));
            setUpdated(true)
        }
    };

    // Navigate
    useFocusEffect(
        useCallback(() => {
            if (order.status === 'success') {
                setSuccessModalVisible(true);
                setTimeout(() => {
                    setSuccessModalVisible(false);
                    navigation.navigate('Upload', {
                        bank: selectedBank,
                        car: carDetails,
                        totalPrice: totalPrice,
                        startDate: selectedDate,
                        endDate: returnDate,
                        isDriver: isDriver,
                    });
                }, 1000);
            } else if (order.status === 'failed') {
                setErrorMessage(order.message);
            
                setSuccessModalVisible(true);
                setTimeout(() => {
                    setSuccessModalVisible(false);
                }, 1000);
            } else if (order.message === 'jwt expired') {
                setErrorMessage(order.message);
                setBankModal(true);
                dispatch(orderReset());
                dispatch(logout());
                dispatch(resetState());
                setTimeout(() => {
                    navigation.navigate('SignIn');
                    setSuccessModalVisible(false);
                }, 1000);
            }
        }, [order])
    );

    // Total Price
    const calculateTotalPrice = (startDate, endDate) => {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
        const total = days * carDetails.price;
        setTotalPrice(total);
    };
    // Date 
    const handleDateChange = (event, date) => {
        setDatePickerVisible(false);
        if (date) {
            setSelectedDate(date);
            calculateTotalPrice(date, returnDate);
        }
    };
    // Return Date
    const handleReturnDateChange = (event, date) => {
        setReturnDatePickerVisible(false);
        if (date) {
            setReturnDate(date);
            calculateTotalPrice(selectedDate, date);
        }
    };
    // Bank
    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
    };
    // Promo Code
    const applyPromoCode = () => {
        if (promoCode.trim().toLowerCase() === 'diskon50') {
            setTotalPrice((prevPrice) => prevPrice * 0.5);
            setPromoApplied(true);
        } else {
            alert('Kode promo tidak valid');
        }
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon size={32} name={'arrow-left'} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pembayaran</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Progres Step */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressStep}>
                        <View style={[styles.stepCircle, styles.activeStep]}>
                            <Text style={styles.stepNumber}>1</Text>
                        </View>
                        <Text style={styles.stepText}>Metode</Text>
                    </View>
                    <View style={styles.progressLine} />
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

                {/* Vehicle Card */}
                <View style={styles.vehicleCard}>
                    <Image
                        style={styles.carIconPlaceholder}
                        source={{ uri: carDetails.img }}
                    />
                    <View style={styles.vehicleDetails}>
                        <Text style={styles.vehicleName}>{carDetails.name}</Text>
                        <View style={styles.vehicleIcons}>
                            <View style={styles.iconContainer}>
                                <Icon size={14} name={'users'} color={'#8A8A8A'} />
                                <Text style={styles.iconText}>{carDetails.seat}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon size={14} name={'briefcase'} color={'#8A8A8A'} />
                                <Text style={styles.iconText}>{carDetails.baggage}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.price}>{formatCurrency.format(totalPrice)}</Text>
                </View>

                {/* Selected Date */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Tanggal Pemesanan</Text>
                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setDatePickerVisible(true)}
                    >
                        <Text style={styles.datePickerText}>{selectedDate.toDateString()}</Text>
                        <Icon name="calendar" size={20} color="#8A8A8A" />
                    </TouchableOpacity>
                    {isDatePickerVisible && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>

                {/* Return Date */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Tanggal Pengembalian</Text>
                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setReturnDatePickerVisible(true)}
                    >
                        <Text style={styles.datePickerText}>{returnDate.toDateString()}</Text>
                        <Icon name="calendar" size={20} color="#8A8A8A" />
                    </TouchableOpacity>
                    {isReturnDatePickerVisible && (
                        <DateTimePicker
                            value={returnDate}
                            mode="date"
                            display="default"
                            onChange={handleReturnDateChange}
                            minimumDate={selectedDate}
                        />
                    )}
                </View>

                {/* PICKER DRIVER */}
                <View>
                    <Text style={styles.driverTitle}>Supir</Text>
                    <View style={styles.isDriverToggle}>
                        <Picker
                            selectedValue={isDriver}
                            onValueChange={(itemValue) => setIsDriver(itemValue)}
                        >
                            <Picker.Item label="Dengan Supir" value={true} />
                            <Picker.Item label="Tidak Dengan Supir" value={false} />
                        </Picker>
                    </View>
                </View>

                {/* Selected Bank */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pilih Bank Transfer</Text>
                    <Text style={styles.sectionDescription}>
                        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking
                    </Text>
                    {['BCA', 'BNI', 'Mandiri'].map((bank) => (
                        <TouchableOpacity
                            key={bank}
                            style={[
                                styles.bankOption,
                                selectedBank === bank && styles.selectedBankOption,
                            ]}
                            onPress={() => handleBankSelect(bank)}
                        >
                            <View style={styles.bankTextContainer}>
                                <Text style={styles.bankText}>{bank}</Text>
                                <Text style={styles.bankSubtext}>{`${bank} Transfer`}</Text>
                            </View>
                            {selectedBank === bank && (
                                <Icon name="check" size={20} color="green" style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Promo*/}
                <View style={styles.promoSection}>
                    <Text style={styles.promoTitle}>% Pakai Kode Promo</Text>
                    <View style={styles.promoContainer}>
                        <TextInput
                            style={styles.promoInput}
                            placeholder="Tulis catatanmu di sini"
                            value={promoCode}
                            onChangeText={setPromoCode}
                        />
                        <TouchableOpacity
                            style={styles.promoButton}
                            onPress={applyPromoCode}
                            disabled={isPromoApplied}
                        >
                            <Text style={styles.promoButtonText}>
                                {isPromoApplied ? 'Terapkan ✓' : 'Terapkan'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Button Bottom */}
            <View style={styles.bottomSection}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>{formatCurrency.format(totalPrice)}</Text>
                </View>
                <Button
                    color="#4CAF50"
                    borderRadius={8}
                    onPress={() => {
                        if (!selectedBank) {
                            setBankModal(true);
                            setTimeout(() => {
                                setBankModal(false)
                            }, 1000)
                        } else {
                            handleNextPayment()
                        }
                    }}
                    title="Bayar"
                />
            </View>

            {/*  MODAL SUCCES */}
            <ModalPopup
                animationType="fade"
                transparent={true}
                visible={isSuccessModalVisible}>
                <View style={styles.modalContainer}>
                    {errorMessage !== null ? (
                        <>
                            <Icon size={13} name={'x-circle'} />
                            {Array.isArray(errorMessage) ? (
                                errorMessage.map(e => {
                                    return <Text>{e.message}</Text>;
                                })
                            ) : (
                                <Text> {errorMessage} </Text>
                            )}
                        </>
                    ) : updated ? (
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Berhasil</Text>
                            <Text style={styles.modalMessage}>
                                Pesanan Anda Telah Di Update
                            </Text>
                        </View>
                    ) :
                        (
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Berhasil</Text>
                                <Text style={styles.modalMessage}>
                                    Pesanan Anda berhasil dibuat
                                </Text>
                            </View>
                        )}
                </View>
            </ModalPopup>

            {/*  MODAL BANK */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={bankModal}
                onRequestClose={() => setBankModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Pilih Bank</Text>
                        <Text style={styles.modalMessage}>
                            Silakan pilih metode bank transfer sebelum melanjutkan pembayaran.
                        </Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setBankModal(false)
                            }
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            { }
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
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
    stepCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeStep: {
        backgroundColor: '#4CAF50',
    },
    stepNumber: {
        fontSize: 12,
        color: '#fff',
    },
    stepText: {
        fontSize: 12,
        color: '#666',
    },
    content: {
        flex: 1,
    },
    vehicleCard: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    carIconPlaceholder: {
        width: 80,
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    vehicleDetails: {
        flex: 1,
        marginLeft: 12,
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
    },
    section: {
        padding: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    driverTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        paddingLeft: 10
    },
    isDriverToggle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
    bankOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        marginBottom: 8,
    },
    bankTextContainer: {
        flex: 1,
    },
    bankText: {
        fontSize: 16,
        fontWeight: '500',
    },
    bankSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    checkIcon: {
        marginLeft: 8,
    },
    bottomSection: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    sectionDescription: {
        marginBottom: 9
    },
    totalContainer: {
        marginBottom: 6,
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
    },
    payButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    selectedBankOption: {
        borderColor: 'green',
    },
    promoSection: {
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        backgroundColor: '#fff',
        margin: 10
    },
    promoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    promoInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 8,
    },
    promoButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    promoButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    selectedBankOption: {
        borderColor: 'green',
    },
});
