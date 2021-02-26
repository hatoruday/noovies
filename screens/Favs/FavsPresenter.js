import React from 'react';
import { useEffect } from 'react';
import {PanResponder, Dimensions, Animated} from 'react-native';
import { useState } from 'react/cjs/react.development';
import styled from "styled-components/native";
import { apiImage } from '../../api';


const {width:WIDTH, height:HEIGHT} = Dimensions.get("window");


const styles = {
    top: 80,
    height: HEIGHT / 1.5,
    width: "90%",
    position: "absolute"
}
const Poster = styled.Image`
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const Container = styled.View`
    padding-top:50px;
    flex: 1;
    background-color: black;
    align-items: center;
`;


export default ({results}) => {
    const [topIndex, setTopIndex] = useState(0);
    const nextCard = () => setTopIndex(currentValue => currentValue + 1);
    // setTopIndex(topIndex + 1) 하는 것보다 이것이 state함수의 currentvalue를 가져와서 작업하는 것이기 때문에 더 정확하다함. 사실 뭔소린진 모름.
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, {dx, dy}) => {// 두번째 인수로 받아오는 gesture는 dx와 dy를 key로서 가지고 있음.
            position.setValue({ x: dx, y:dy});
        },
        onPanResponderRelease: (evt, {dx, dy}) => {//터치를 뗄 때 실행되는 함수.
            if( dx >= 250) {
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 100,
                        y: dy
                    }
                }).start(nextCard)//애니메이션이 끝나고 실행되는 함수.
            } else if (dx <= -250) {
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH-100,
                        y: dy
                    }
                }).start(nextCard)
            } else {
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                    //bounciness: 29//튀어오르는 정도 혹은 friction으로 안튀어오르게 가능.
                    //두번째 인수에 configuration
                }).start()//첫번째 인수에 애니메이션을 넣고 싶은 값을 적는다.
            }
        }
    });

    const rotationValues = position.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ["-10deg", "0deg", "10deg"],
        extrapolate: "clamp"//clamp로 outputlange이상의 범위를 벗어나는 것을 제한시킬 수 있다. 안하면 초과가능
    })
    const secondCardOpacity = position.x.interpolate({
        inputRange: [-200, 0, 200 ],
        outputRange: [1, 0.2, 1],
        extrapolate: "clamp"
    })
    const secondCardScale = position.x.interpolate({
        inputRange: [-200, 0, 200 ],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp"
    });
    useEffect(() => {
        position.setValue({ x: 0, y: 0}, [topIndex]);
    })
    return (
        <Container>
            {results.map((result, index) => {
                if (index <topIndex) {
                    return null;
                } else if(index === topIndex) {
                    return (
                        <Animated.View 
                        key = {result.id}
                        {...panResponder.panHandlers}
                        style = {{
                            ...styles,
                            zIndex: 1,
                            transform: [
                                {rotate: rotationValues},
                                ...position.getTranslateTransform()
                            ]
                            //position의 x,y좌표들을 해당 view의 css표현으로 변환해주는 함수
                        }}
                        >
                            <Poster source = {{uri:apiImage(result.poster_path)}} />
                        </Animated.View>
                    );
                } else if ( index === topIndex + 1) {
                    return (
                        <Animated.View 
                        key = {result.id}
                        {...panResponder.panHandlers}
                        style = {{
                            ...styles,
                            zIndex: -index,
                            opacity: secondCardOpacity,
                            transform: [
                                {scale: secondCardScale}
                            ]
                        }}
                        >
                            <Poster source = {{uri:apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                } else {
                    return (
                        <Animated.View 
                        key = {result.id}
                        {...panResponder.panHandlers}
                        style = {{
                            ...styles,
                            zIndex: -index,
                            opacity: 0
                        }}
                        >
                            <Poster source = {{uri:apiImage(result.poster_path)}} />
                        </Animated.View>
                    )
                }
            })}
        </Container>
    )
}