import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React, { useReducer } from 'react'
import Button from '../components/Button'
import { Link } from '@react-navigation/native'
import axios from 'axios'

const initialFormState = {
    fullname: '',
    email: '',
    password: '',
}

export default function SignUp() {
    const [formData, setFormData] = useReducer((state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    }, initialFormState)

    const handleChange = (val, name) => {
        setFormData({
            name: name,
            value: val,
        });
    }

    const handleSubmit = async () => {
        console.log(formData)
        try {
            const res = await axios.post("http://192.168.100.2:3000/api/v1/auth/signup",
                JSON.stringify(formData), {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
            )
            console.log(res)
        } catch (e) {
            console.log(e.response)
        }
    }

    return (
        <View style={styles.authWrapper}>
            <Image source={require('../assets/images/logo_tmmin.png')} />
            <Text style={styles.authTitle}>Welcome Back!</Text>
            <View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput style={styles.input} placeholder='Full Name' onChangeText={(text) => handleChange(text, 'fullname')} />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput style={styles.input} placeholder='Contoh: johndee@gmail.com' onChangeText={(text) => handleChange(text, 'email')} />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true}
                        placeholder='6+ Karakter' onChangeText={(text) => handleChange(text, 'password')} />
                </View>
                <Button
                    onPress={handleSubmit}
                    title={'Register'}
                    color={'#5CB85F'}
                />
            </View>
            <View>
                <Text style={styles.authFooterText}>Don’t have an account? <Link screen="SignIn">Sign Up for free</Link></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    authWrapper: {
        padding: 20
    },
    authTitle: {
        fontSize: 32,
        fontWeight: 700,
        textAlign: 'center',
        marginVertical: 20
    },
    inputWrapper: {
        marginBottom: 20
    },
    inputLabel: {
        fontWeight: 700,
    },
    input: {
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    authFooterText: {
        marginTop: 10,
        fontWeight: 500,
        textAlign: "center"
    }
})