import { KeyboardAvoidingView, View, Text, Image, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { Link, useNavigation, useFocusEffect } from '@react-navigation/native';
import ModalPopup from '../components/Modal';
import Icon from 'react-native-vector-icons/Feather';
import { postRegister, resetState, selectUser } from '../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const initialFormState = {
    email: '',
    password: '',
};

export default function SignUp() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [formData, setFormData] = useState(initialFormState);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (val, name) => {
        setFormData({
            ...formData,
            [name]: val,
        });
    };

    const validateForm = () => {
        if (!formData.email.includes('@')) {
            setErrorMessage('Harap masukkan email yang valid');
            setModalVisible(true);
            return false;
        }
        if (formData.password.length < 6) {
            setErrorMessage('Password harus lebih dari 6 karakter');
            setModalVisible(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            await dispatch(postRegister(formData));
            setModalVisible(true);
        } catch (error) {
            setErrorMessage(error?.message || 'Terjadi kesalahan');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (modalVisible) {
                if (errorMessage === null) {
                    navigation.navigate('SignIn');
                    dispatch(resetState());
                }
                const timer = setTimeout(() => {
                    setModalVisible(false);
                    setFormData(initialFormState);
                    setErrorMessage(null);
                }, 1000);
                return () => clearTimeout(timer); // Bersihkan timer saat unmount
            }
        }, [modalVisible, errorMessage, dispatch, navigation])
    );

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.authWrapper}
            >
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/images/logo_tmmin.png')} />
                    <View style={styles.iniContainer}>
                        <Text style={styles.authTitle}>Sign Up</Text>
                        <View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Contoh: johndee@gmail.com"
                                    onChangeText={(text) => handleChange(text, 'email')}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    placeholder="6+ Karakter"
                                    onChangeText={(text) => handleChange(text, 'password')}
                                />
                            </View>
                            <Button
                                onPress={handleSubmit}
                                title={loading ? 'Loading...' : 'Sign Up'}
                                color="#5CB85F"
                                disabled={loading}
                            />
                        </View>
                        <View>
                            <Text style={styles.authFooterText}>
                                Already have an account? <Link screen="SignIn">Sign In here</Link>
                            </Text>
                        </View>
                        <ModalPopup visible={modalVisible} transparent animationType="fade">
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContainer}>
                                    {errorMessage !== null ? (
                                        <>
                                            <Icon size={48} name="x-circle" color="red" style={styles.icon} />
                                            {Array.isArray(errorMessage) ? (
                                                errorMessage.map((e, index) => (
                                                    <Text key={index} style={styles.errorText}>{e.message}</Text>
                                                ))
                                            ) : (
                                                <Text style={styles.errorText}>{errorMessage}</Text>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Icon size={48} name="check-circle" color="green" style={styles.icon} />
                                            <Text style={styles.successText}>Berhasil Register!</Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        </ModalPopup>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    authWrapper: {
        flex: 1,
        padding: 20,
    },
    iniContainer: {
        marginTop: 100,
    },
    authTitle: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontWeight: '700',
    },
    input: {
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    authFooterText: {
        marginTop: 10,
        fontWeight: '500',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        fontSize: 16,
        textAlign: 'center',
    },
});
