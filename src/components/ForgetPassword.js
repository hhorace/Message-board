
import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {Container, Header, Form, Left, Right, Body, Icon, Button,Item, Label, Input, Toast, Content} from 'native-base';

import firebase from 'firebase';

export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
        <Container style={styles.bg}>

        <Content style={{marginTop:20}}>
            <Form>
                <Item floatingLabel>
                <Label style={{color:'white'}}>Your Email</Label>
                <Input value={this.state.email} onChangeText = { (text) => {this.setState({email: text})}} style={styles.input}/>
                </Item>
            </Form>
            <View style={styles.container}>
                <Button style={{backgroundColor: '#5cb85c'}} block Info onPress={this.handleSubmit}>
                    <Text style={styles.textBtn}>提交</Text>
                </Button>
            </View>
        </Content>

        </Container>
    );
  }

  handleSubmit(){
    var auth = firebase.auth();
    email = this.state.email;
    auth.useDeviceLanguage();
    auth.sendPasswordResetEmail(email).then(() => {
      Alert.alert(
        '變更密碼寄信成功!',
        '如未在5分鐘內收到信件請再重新點擊上方寄信!',
        [
          {text: '確定'}
        ],
        {cancelable: false}
      );
    }).catch(error => {
      alert(error);
    });
  }
}

const styles = StyleSheet.create({
  textBtn: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  input:{
    fontSize: 20,
    color: 'white'
  },
  header:{
    backgroundColor: '#2e2e2e',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#AAAAAA',
    borderBottomColor: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    justifyContent: "center", //垂直方向
    alignItems: 'center', //水平方向
    margin: 10,
    marginTop: 30
  },
  bg: {
    backgroundColor: '#2e2e2e'
  }
});
