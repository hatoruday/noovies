import React, {useEffect, useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MovieContainer from '../screens/Movies/MovieContainer';
import FavsContainer from '../screens/Favs/index';
import TvContainer from '../screens/Tv/TvContainer';
import { Ionicons } from "@expo/vector-icons";
import { Platform } from 'react-native';
import SearchContainer from '../screens/Search';
const Tabs = createBottomTabNavigator();


export default ({navigation, route}) => {
    useLayoutEffect(()=> {
        navigation.setOptions({
            title: route?.state?.routeNames[route.state.index]|| 'Movies'
        })
    }
    , [route]);
        
    return (
    <Tabs.Navigator 
    screenOptions = {({route}) => ({
        tabBarIcon: ({focused}) => {
            let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
            if(route.name === 'Movies') {
                iconName += 'film';
            } else if(route.name === 'TV') {
                iconName += 'tv';
            } else if(route.name === 'Search') {
                iconName += 'search';
            } else if(route.name === 'Favourites') {
                iconName += 'heart';
            }
            return (
                <Ionicons 
                name = {iconName}
                color = {focused ? 'white' : 'grey'}
                size = {26}
                />
            )
        }
    })}
    tabBarOptions = {{
        showLabel: false,
        style: {
            backgroundColor: 'black',
            borderTopColor: 'black'
        }
    }}>
        <Tabs.Screen name = 'Movies' component = {MovieContainer}/>
        <Tabs.Screen name = 'TV' component = {TvContainer}/>
        <Tabs.Screen name = 'Search' component = {SearchContainer}/>
        <Tabs.Screen name = 'Favourites' component = {FavsContainer}/>
    </Tabs.Navigator>
    )
}