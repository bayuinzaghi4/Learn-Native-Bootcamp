import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Text,
  ActivityIndicator,
} from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { selectUser, logout } from '../redux/reducers/user';
import { getMyOrder, postOrder } from '../redux/reducers/order/api';
import { orderReset, selectOrder } from '../redux/reducers/order';
import { useSelector, useDispatch } from 'react-redux';
import ModalPopup from '../components/Modal';
import Icon from 'react-native-vector-icons/Feather';
import OrderList from '../components/OrderList';
import axios from 'axios';
const Colors = {
  primary: '#A43333',
  secondary: '#SCB85F',
  darker: '#121212',
  lighter: '#ffffff',
  button: '#5CB85F',
};

export default function Order() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const [modalVisibile, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const isDarkMode = useColorScheme() === 'dark';

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyOrder(user.token))
    }, [user.token])
  )

  useFocusEffect(
    React.useCallback(() => {
      if (order.message === 'jwt expired' || order.message === 'jwt malformed') {
        dispatch(logout())
        setModalVisible(true);
        setErrorMessage(order.message)
        setTimeout(() => {
          navigation.navigate('SignIn')
          setModalVisible(false);
        }, 1000)
      }
    }, [order])
  );

  const CancelOrder = async id => {
    try {
      const cancel = await axios.put(`http://192.168.1.31:3000/api/v1/order/${id}/cancel`, {
        headers: {
          Content: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getMyOrder(user.token));
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />
      <ModalPopup visible={order.status === 'loading'}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator />
        </View>
      </ModalPopup>
      <FlatList
        data={order.data}
        renderItem={({ item }) => {
          const startTime = new Date(item.start_time).getTime(); // Konversi ke milidetik
          const endTime = new Date(item.end_time).getTime(); // Konversi ke milidetik
          const totalDays = Math.round((endTime - startTime) / (1000 * 60 * 60 * 24)); // Konversi ke hari
          const startDate = new Date(item.start_time).toLocaleDateString(
            'id-ID',
          );
          const isDisabled = item.status === 'canceled' || item.status === 'paid'


          return (
            <OrderList
              key={item.toString()}
              image={{ uri: item.cars.img }}
              carName={item.cars.name}
              status={`Status : ${item.status}`}
              startDate={`Tanggal Sewa : ${startDate}`}
              endDate={`waktu sewa : ${totalDays} Hari`} // total sewa hari
              price={item.total}
              CancelOrder={() => CancelOrder(item.id)}
              onPress={() => !isDisabled && dispatch(getOrderDetail({ id: item.id, token: user.token }))}
              disabled={isDisabled} // Disable button if canceled
            />
          )
        }
        }
        keyExtractor={item => item.id}
      />
      <ModalPopup visible={modalVisibile}>
        <View style={styles.modalBackground}>
          <>
            <Icon size={13} name={'x-circle'} />
            <Text> {errorMessage} </Text>
          </>
        </View>
      </ModalPopup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: '90%',
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
  },
})