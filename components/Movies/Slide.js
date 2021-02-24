import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types'
import { apiImage } from '../../api';
import Poster from '../Poster';
import { TouchableOpacity } from 'react-native';
import Votes from '../Votes';
import { trimText } from '../../utils';
import { useNavigation } from '@react-navigation/native';




const BG = styled.Image`
    width:100%;
    height:100%;
    opacity:0.7
    position: absolute
`;

const Content = styled.View`
    height:100%;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
`
const Data = styled.View`
    width:50%
    align-items:flex-start;
`

const Title = styled.Text`
    color:white;
    font-weight:bold;
    font-size:18px;
    margin-bottom:10px;
`
const VotesContainer = styled.View`
    margin-bottom:7px;
    
`
const Overview = styled.Text`
    color:rgb(230,230,230);
    color:white
    font-size:14px;
    font-weight:500;
`

const Container = styled.View`
    height:100%
    width:100%
`;

const Button = styled.View`
    border-radius:3px;
    margin-top:10px;
    background-color:#e74c3c
    padding:5px 10px;
`;

const ButtonText = styled.Text`
    color:white
`;


const Slide =  ({isTv= false, id, title, backgroundImage, votes, overview, poster}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate('Detail', {
            isTv,
            id,
            title,
            backgroundImage,
            votes,
            overview,
            poster
        })
    }
    return (
        <Container>
            <BG source = {{uri:apiImage(backgroundImage)}}/>
            <Content>
                <Poster url = {poster}/>
                <Data>
                    <Title>{trimText(title, 25)}</Title>
                    <VotesContainer>
                        <Votes votes = {votes}/>
                    </VotesContainer>
                    <Overview>{trimText(overview, 110)}</Overview>
                    <TouchableOpacity onPress = {goToDetail}>
                        <Button>
                            <ButtonText>View Details</ButtonText>
                        </Button>
                    </TouchableOpacity>
                </Data>
            </Content>
        </Container>
    )
}

Slide.propTypes = {
    id:PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired
}

export default Slide;