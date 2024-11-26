
import { startCountdown, decrementCountdown, resetCountdown } from '../redux/reducers/timer/actionCreator';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from 'react-native-countdown-component'; // Menggunakan Countdown Component

const OrderCountdown = ({ order }) => {
  const dispatch = useDispatch();
  const countdownTime = useSelector(state => state.countdowns[order.id]); // Mengambil waktu countdown berdasarkan order.id

  // Memulai countdown saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(startCountdown(order.id, order.startTime));

    // Set interval untuk mengurangi countdown setiap detik
    const interval = setInterval(() => {
      dispatch(decrementCountdown(order.id));
    }, 1000);

    // Cleanup interval saat komponen tidak digunakan lagi
    return () => clearInterval(interval);
  }, [dispatch, order.id, order.startTime]);

  // Reset countdown saat waktu habis
  useEffect(() => {
    if (countdownTime === 0) {
      dispatch(resetCountdown(order.id));
    }
  }, [countdownTime, dispatch, order.id]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>Order ID: {order.id}</Text>
      <Text>Waktu Tersisa:</Text>
      {/* Menggunakan countdown component */}
      <Countdown
        until={countdownTime} // Waktu tersisa dari Redux state
        onFinish={() => dispatch(resetCountdown(order.id))} // Reset setelah countdown selesai
        size={30}
        digitStyle={{ backgroundColor: '#1CC625' }} // Styling untuk digit
        digitTxtStyle={{ color: '#FFF' }} // Warna teks
        timeToShow={['H', 'M', 'S']} // Menampilkan jam, menit, dan detik
        timeLabelStyle={{ color: 'black', fontWeight: 'bold' }} // Styling label waktu
      />
      {countdownTime === 0 && <Text>Pesanan Kadaluarsa</Text>}
    </View>
  );
};

export default OrderCountdown;
