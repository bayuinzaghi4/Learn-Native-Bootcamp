/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Button from './src/components/Button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from './src/components/CarList';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff'
}

const CARS = [{
  name: 'Innova Zenix',
  image: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h1b/h8a/8846828240926/Thumbnail_Black_Zenix.png',
  price: 230000
},
{
  name: 'Yaris',
  image: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
  price: 150000
},
{
  name: 'Yaris',
  image: 'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
  price: 150000
}]

const ButtonIcon = ({ icon, title }) => (
  <Button style={styles.buttonIcon}>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </Button>
)

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>Hi, Nama</Text>
              <Text style={styles.headerTextLocation}>Your Location</Text>
            </View>
            <View >
              <Image style={styles.imageRounded} source={{ uri: "https://i.pravatar.cc/100" }} width={50} height={50} />
            </View>
          </View>
          {/* banner */}
          <View style={{
            ...styles.headerContainer,
            ...styles.bannerContainer
          }}>
            <View style={styles.bannerDesc}>
              <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
              <Button
                color={COLORS.secondary}
                title='Sewa Mobil'
              />
            </View>
            <View style={styles.bannerImage}>
              <Image source={require('./src/assets/images/img_car.png')} width={50} height={50} />
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <ButtonIcon icon="truck" title="Sewa Mobil"/>
          <ButtonIcon icon="box" title="Oleh-Oleh"/>
          <ButtonIcon icon="key" title="Penginapan"/>
          <ButtonIcon icon="camera" title="Wisata"/>
        </View>
        {/* end banner */}
        <FlatList
          data={CARS}
          renderItem={({item}) => 
            <CarList
              key={item.id}
              image={{ uri: item.image }}
              carName={item.name}
              passengers={5}
              baggage={4}
              price={item.price}
            />
          }
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    height: 130,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10
  },
  imageRounded: {
    borderRadius: 40,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 12
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontWeight: 700,
    fontSize: 14
  },
  bannerContainer: {
    borderRadius: 4,
    padding: 0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: -200
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc: {
    paddingHorizontal: 10,
    width: '40%'
  },
  iconContainer: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius:5,
    padding: 15
  },
  iconText:{
    color:'#fff',
    fontSize: 12,
    fontWeight: 700,
    minWidth: 65,
    marginTop: 5,
    textAlign:'center'
  }
});

export default App;
