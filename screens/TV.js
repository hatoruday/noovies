
import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { tvApi } from '../api';

export default () => {
    const [show, setShow] = useState({
        today: [],
        topRated:[],
        thisWeek:[],
        popular:[],
        todayError:null ,
        topRatedError:null,
        thisWeekError:null,
        popularError:null
    });

    const getData = async() => {
        const [today, todayError] =await  tvApi.today();
        const [topRated, topRatedError] = await tvApi.topRated();
        const [thisWeek, thisWeekError] = await tvApi.thisWeek();
        const [popular, popularError] =await  tvApi.popular();
        setShow({
            today,
            topRated,
            thisWeek,
            popular,
            todayError,
            topRatedError,
            thisWeekError,
            popularError,
        })
    }
    useEffect(()=> {
        getData();
    }, [])
    return (
    <View>
        <Text style= {{
            color: 'black'
        }}>{show.today?.length}</Text>
    </View>
    )
    }

