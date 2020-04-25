
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import ForgetPassword from './components/ForgetPassword';
import Register from './components/Register';
import MenuScreen from './components/MenuScreen';
import firebase from 'firebase';
import {Container, Header, Left, Right, Body, Icon, Button, Footer, FooterTab,ListItem,List,Textarea} from 'native-base';
import { Root } from 'native-base';

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentWillMount(){
    var firebaseConfig = require('../firebaseConfig.js');
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig.firebaseConfig);
  }

  render() {
    console.disableYellowBox = true;
    return (
        <Root>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#1f8ab9' },
                    headerTitleAlign: 'center',
                    animationEnabled: false
                  }} >
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: 'Forget Password' }}/>
                <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }}/>
                <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Message Board' }}/>
              </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
  }
}
