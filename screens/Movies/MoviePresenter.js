import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import Slide from '../../components/Movies/Slide';
import Title from '../../components/Title';
import Vertical from '../../components/Vertical';
import Horizontal from '../../components/Horizontal';
import ScrollContainer from '../../components/ScrollContainer';
import HorizontalSlider from '../../components/HorizontalSlider';
import List from '../../components/List';
import SlideContainer from '../../components/SlideContainer';


const {width:WIDTH, height: HEIGHT} = Dimensions.get('window');


const Container = styled.View`

`;


export default ({loading, nowPlaying, popular, upcoming, refreshFn}) => (
    <ScrollContainer loading = {loading} refreshFn = {refreshFn}>
        <>
            <SlideContainer>
                {nowPlaying.map(movie=> (
                    <Slide
                    key = {movie.id}
                    id={movie.id}
                    title = {movie.original_title}
                    overview = {movie.overview}
                    votes = {movie.vote_average}
                    backgroundImage={movie.backdrop_path}
                    poster = {movie.poster_path}
                    />
                    ))}
            </SlideContainer>
            <Container>
                <HorizontalSlider title = {'Popular Movies'}>
                    {popular.map(movie => (
                        <Vertical 
                        id = {movie.id}
                        key = {movie.id}
                        poster= {movie.poster_path}
                        title= {movie.title}
                        votes= {movie.vote_average}
                        />
                    ))}
                </HorizontalSlider>
                <List title = 'comming soon'>
                {upcoming.map(movie => (
                    <Horizontal
                    key = {movie.id}
                    id= {movie.id}
                    title = {movie.title}
                    poster = {movie.poster_path}
                    releaseDate = {movie.release_date}
                    overview = {movie.overview}
                    />
                ))}
                 </List>
            </Container>
        </>
    </ScrollContainer>
)