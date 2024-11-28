import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { selectOrder, payment } from '../redux/reducers/order';
import { selectUser } from '../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function PaymentConfirmation() {
    const [image, setImage] = useState(null);
    const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };
    
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                const imageData = `data:${selectedImage.type};base64,${selectedImage.base64}`;
                setImage(imageData);
                
            } else {
                console.log('No image selected or assets are undefined');
            }
        });
    };
    

    const handlePayment = () => {
        if (image && order.data) {
            dispatch(payment({
                id: order.data.id,
                receipt: image,
                token: user.token
            }));
        } else {
            console.log('Order data is not available');
        }
    };
    useFocusEffect(
        useCallback(() => {
            if (order.status === 'success') {
                navigation.navigate('HomeTabs', { screen: 'Order' });
            }
        }, [order.status])
    )
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Konfirmasi Pembayaran</Text>

            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.
                </Text>
            </View>

            <View style={styles.uploadSection}>
                <Text style={styles.uploadTitle}>Upload Bukti Pembayaran</Text>
                <Text style={styles.uploadSubtitle}>
                    Untuk membantu kami lebih cepat melakukan pengecekan, Kamu bisa upload bukti bayarmu
                </Text>

                <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Image
                                // source={require('./assets/placeholder-icon.png')}
                                style={styles.placeholderIcon}
                            />
                            <Text>Pick an image</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handlePayment}
                style={[
                    styles.uploadButton,
                    !image && styles.uploadButtonDisabled,
                ]}
                disabled={!image}
            >
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.viewOrderButton} onPress={() => navigation.navigate('HomeTabs', { screen: 'Order' })}>
                <Text style={styles.viewOrderText}>Lihat Daftar Pesanan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    messageContainer: {
        marginBottom: 24,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 24,
    },
    timer: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF0000',
    },
    uploadSection: {
        marginBottom: 24,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    uploadSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    uploadButtonDisabled: {
        backgroundColor: '#cccccc',
        borderColor: '#999999',
    },

    imagePickerContainer: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        overflow: 'hidden',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderIcon: {
        width: 24,
        height: 24,
        opacity: 0.5,
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    uploadButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    viewOrderButton: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    viewOrderText: {
        color: '#4CAF50',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});