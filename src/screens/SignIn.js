import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Link, useNavigation, useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import ModalPopup from '../components/Modal';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, resetState, selectUser } from '../redux/reducers/user';

const initialFormState = {
  email: '',
  password: '',
}

export default function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // (state) => state.user
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (val, name) => {
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async () => {
    await dispatch(postLogin(formData));
  };

  useFocusEffect(
    useCallback(() => {
      if (user.status === 'success') {
        setModalVisible(true);
        setErrorMessage(null);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('HomeTabs', { screen: 'Profile' });
        }, 1000);
      } else if (user.status === 'failed') {
        setModalVisible(true);
        dispatch(resetState())
        setErrorMessage(user.message);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000)
      }
    }, [user])
  )
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.authWrapper}>
        <ModalPopup visible={user.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>
        <View style={{ flex: 1 }}>
          <Image source={require('../assets/images/logo_tmmin.png')} />
          <View style={styles.iniContainer}>
          <Text style={styles.authTitle}>Welcome Back!</Text>
          <View>
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
              title={'Sign In'}
              color={'#5CB85F'}
            />
          </View>
          <View>
            <Text style={styles.authFooterText}>Don’t have an account? <Link screen="SignUp" >Sign Up for free</Link></Text>
          </View>
          <ModalPopup visible={modalVisible}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalBackground}>
              {errorMessage !== null ?
                <>
                  <Icon size={32} name={'x-circle'} color="red" style={styles.icon} />
                  {Array.isArray(errorMessage) ?
                    errorMessage.map((e, index) => {
                      return <Text key={index} style={styles.errorText}>{e.message}</Text>
                    })
                    :
                    <Text style={styles.errorText} > {errorMessage} </Text>
                  }
                </>
                :
                <>
                  <Icon size={32} name={'check-circle'}  style={styles.icon} />
                  <Text style={styles.successText} > Berhasil Login! </Text>
                </>
              }
              </View>
            </View>
          </ModalPopup>
        </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  authWrapper: {
    flex: 1,
    padding: 20
  },
  authTitle: {
    fontSize: 32,
    fontWeight: 700,
    textAlign: 'center',
    marginVertical: 20
  },
  iniContainer: {
    marginTop: 100
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center', // Memusatkan secara horizontal
    justifyContent: 'center', // Memusatkan secara vertikal
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
})
