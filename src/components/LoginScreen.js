
import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {Container, Header, Content, Title, Left, Right, Body, Icon, Button,Item, Label, Input, Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      waiting: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
      let tmp = (this.state.waiting)? <ActivityIndicator size="large" color="#0000ff" /> : <View/>;
    return (
        <Container style={styles.bg}>
        {tmp}
        <View style={{flex:1}}></View>
        <View style={{flex: 4, margin: 10}}>
            <Text style={styles.text}>Email</Text>
            <Textarea rowSpan={2} bordered placeholder="Email" style={styles.input} value={this.state.email}
             onChangeText = { (text) => {this.setState({email: text}) } }/>
            <Text style={styles.text}>Password</Text>
            <Textarea secureTextEntry={true} rowSpan={2} bordered placeholder="Password" style={styles.input} value={this.state.password}
            onChangeText = { (text) => {this.setState({password: text}) } }/>
            <Button warning block onPress={this.handleSubmit} style={{top:20,backgroundColor: '#5cb85c'}}>
                <Text style={styles.textBtn}>登入</Text>
            </Button>
            <Grid>
              <Col style={styles.center}>
                <Button  bordered success block onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                  <Text style={styles.textBtn}>忘記密碼</Text>
                </Button>
              </Col>
              <Col style={styles.center}>
                <Button  bordered success block onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.textBtn}>註冊</Text>
                </Button>
              </Col>
            </Grid>
        </View>
        </Container>
    );
  }

  handleSubmit(){
    const tmp_this=this;
    const {navigation} = this.props;
    let email = this.state.email;
    let password = this.state.password;
    this.setState({email:'',password:''});

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      console.log("now navigate");
      tmp_this.setState({waiting: false});
      navigation.navigate('Menu');
    })
    .catch(function(error) {
        alert(error);
    });
    console.log("waiting");
    tmp_this.setState({waiting: true});
  }
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    justifyContent:'center',
  },
  textBtn: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  input:{
    fontSize: 20,
    color: 'white'
  },
  text:{
    fontSize: 40,
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    justifyContent: "center", //垂直方向
    alignItems: 'center', //水平方向
  },
  bg: {
    backgroundColor: '#2e2e2e'
  }
});
