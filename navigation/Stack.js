import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";
import DetailContainer from "../screens/Detail";


const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator mode = 'modal'
  screenOptions = {{
    gestureEnabled:true,
    headerStyle: {
      backgroundColor:'black',
      borderBottomColor:'black',
      shadowColor: 'black'
    },
    headerTintColor:'white',
    headerBackTitleVisible:false
  }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Detail" component={DetailContainer} />
  </Stack.Navigator>
);