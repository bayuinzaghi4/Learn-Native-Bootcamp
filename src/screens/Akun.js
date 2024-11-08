import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import Button from '../components/Button';

export default function Akun() {
    const navigation = useNavigation();

    const isLogin = false;
    return (
        <View>
            {
                !isLogin &&
                <View>
                    <Image source={require('../assets/images/akun_bg.png')} />
                    <Text>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
                    <Button
                        onPress={() => navigation.navigate('SignUp')}
                        title={'Register'}
                        color={'#5CB85F'}
                    />
                </View>
            }
        </View>
    )
}
