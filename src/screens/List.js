import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import {FlatList,SafeAreaView,useColorScheme} from 'react-native';

import CarList from '../components/CarList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCars, getCars, resetState } from '../redux/reducers/cars';
import { selectUser } from '../redux/reducers/user';


const COLORS = {
    primary: '#A43333',
    secondary: '#5CB85F',
    darker: '#121212',
    lighter: '#ffffff'
};

function List() {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const cars = useSelector(selectCars)
    const user = useSelector(selectUser)

    useFocusEffect(
        useCallback(() => {
            if(user.token) 
            dispatch(getCars(user.token))
            }, [user]) 
    );

    const backgroundStyle = {
        backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={COLORS.lighter}
            />
            {/* end banner */}
            <FlatList
                data={cars.data}
                renderItem={({ item }) =>
                    <CarList
                        key={item.id}
                        image={{ uri: item.img }}
                        carName={item.name}
                        passengers={item.seat}
                        baggage={item.baggage}
                        price={item.price}
                        onPress={() => navigation.navigate('Detail', {id: item.id})}
                    />
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default List;
