/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';

import Button from './src/components/Button';
import Icon from 'react-native-vector-icons/Feather';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  darker: '#121212',
  lighter: '#ffffff'
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    overflow: 'visible',
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>Hi, Nama</Text>
              <Text style={styles.headerTextLocation}>Your Location</Text>
            </View>
            <View >
              <Image style={styles.imageRounded} source={{uri: "https://i.pravatar.cc/100"}} width={50} height={50}/>
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
              <Image source={require('./src/assets/images/img_car.png')} width={50} height={50}/>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Button>
            <Icon name="truck" size={30} color="#fff" />
          </Button>
          <Button>
            <Icon name="box" size={30} color="#fff" />
          </Button>
          <Button>
            <Icon name="key" size={30} color="#fff" />
          </Button>
          <Button>
            <Icon name="camera" size={30} color="#fff" />
          </Button>
        </View>
        {/* end banner */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: COLORS.primary,
    height: 130,
  },
  headerContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // posisi horizontal
    alignItems: 'center', // posisi
    padding: 10
  },
  imageRounded:{
    borderRadius: 40,
  },
  headerText:{
    color: COLORS.lighter,
    fontWeight:700,
    fontSize: 12
  },
  headerTextLocation:{
    color: COLORS.lighter,
    fontWeight:700,
    fontSize: 14
  },
  bannerContainer:{
    borderRadius: 4,
    padding:0,
    backgroundColor: '#AF392F',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom:-200
  },
  bannerText:{
    fontSize:16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerDesc:{
    paddingHorizontal: 10,
    width:'40%'
  },
  iconContainer:{
    marginTop: 50
  }
});

export default App;
