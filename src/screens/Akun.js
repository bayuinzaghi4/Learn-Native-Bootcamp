import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Akun() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const getToken = async () => {
        try {
            const res = await AsyncStorage.getItem('token')
            console.log(res)
            setToken(res)
        } catch (e) {
            console.log(e)
        }
    }
    const logout = async () => {
        try {
            const res = await AsyncStorage.multiRemove(['token', 'user'])
            setToken(res)
            setIsLogin(false)
            setUser(null)
        } catch (e) {
            console.log(e)
        }
    }
    const getProfile = async () => {
        try {
            const res = await axios('http://192.168.100.2:3000/api/v1/auth/whoami', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.data.user)
            console.log(res.data.data.user)
            setIsLogin(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!token) getToken()
    }, [])

    useEffect(() => {
        console.log(token)
        if (token) {
            setIsLogin(true)
            getProfile()
        }
    }, [token])

    return (
        <View>
            {
                !isLogin ?
                    <View>
                        <Image source={require('../assets/images/akun_bg.png')} />
                        <Text>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
                        <Button
                            onPress={() => navigation.navigate('SignUp')}
                            title={'Register'}
                            color={'#5CB85F'}
                        />
                    </View> :
                    <View>
                        <Image height={50} width={50} source={{ uri: user?.avatar ? user.avatar : "https://i.pravatar.cc/100" }} />
                        <Text>Halo, {user?.fullname}</Text>
                        <Button
                            onPress={logout}
                            title={'Logout'}
                            color={'#A43333'}
                        />
                    </View>
            }
        </View>
    )
}
