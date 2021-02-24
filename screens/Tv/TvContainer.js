
import React, { useEffect, useState } from 'react';
import { tvApi } from '../../api';
import TvPresenter from './TvPresenter';

export default () => {
    const [shows, setShows] = useState({
        loading: true,
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
        setShows({
            loading:false,
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
    <TvPresenter refreshFn = {getData} {...shows}/>
    )
    }

