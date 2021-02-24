import React from 'react';
import HorizontalSlider from '../../components/HorizontalSlider';
import List from '../../components/List';
import ScrollContainer from '../../components/ScrollContainer';
import Vertical from '../../components/Vertical';
import styled from 'styled-components/native';
import Horizontal from '../../components/Horizontal';
import SlideContainer from '../../components/SlideContainer';
import Slide from '../../components/Movies/Slide';

const Container = styled.View`
    margin-top: 20px;
`;
export default ({loading, popular, topRated, today, thisWeek, refreshFn}) => (
    <ScrollContainer
    loading = {loading}
    refreshFn = {refreshFn}
    >
        <Container>
            <HorizontalSlider title = 'Popular Shows'>
                {popular.map(show => <Vertical 
                isTv = {true}
                id = {show.id}
                key = {show.id}
                poster= {show.poster_path}
                title= {show.name}
                votes= {show.vote_average}
                />)}
            </HorizontalSlider>
            <SlideContainer>
                {thisWeek.map(show => <Slide
                    isTv = {true}
                    key = {show.id}
                    id={show.id}
                    title = {show.name}
                    overview = {show.overview}
                    votes = {show.vote_average}
                    backgroundImage={show.backdrop_path}
                    poster = {show.poster_path}
                />)}
            </SlideContainer>
            <HorizontalSlider title = 'Top Rated'>
                {topRated.map(show => <Vertical
                isTv = {true}
                id = {show.id}
                key = {show.id}
                poster= {show.poster_path}
                title= {show.name}
                votes= {show.vote_average}
                />)}
            </HorizontalSlider>
            <List title = 'Airing Today'>
                {today.map(show => (
                    <Horizontal
                    isTv = {true}
                        key={show.id}
                        id= {show.id}
                        title={show.name}
                        poster={show.poster_path}
                        overview={show.overview}
                    />
                ))}
            </List>
        </Container>
    </ScrollContainer>
)