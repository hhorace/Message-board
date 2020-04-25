

import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Input, Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'firebase';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          name: '',
          password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      render() {
        return (
            <Container style={styles.bg}>

            <View style={{flex: 1, margin: 10}}>
              <View style={{flex:9}}>
                <ScrollView>
                  <Text style={styles.text}>Email</Text>
                  <Textarea rowSpan={2} bordered placeholder="Email" style={styles.input} value={this.state.email}
                  onChangeText = { (text) => {this.setState({email: text}) } }/>
                  <Text style={styles.text}>姓名</Text>
                  <Textarea rowSpan={2} bordered placeholder="姓名" style={styles.input} value={this.state.name}
                  onChangeText = { (text) => {this.setState({name: text}) } }/>
                  <Text style={styles.text}>Password(至少6碼)</Text>
                  <Textarea rowSpan={2} bordered placeholder="Password" style={styles.input} value={this.state.password}
                  onChangeText = { (text) => {this.setState({password: text}) } }/>
                  <Button warning block onPress={this.handleSubmit} style={{top:20,backgroundColor: '#5cb85c'}}>
                      <Text style={styles.input}>送出</Text>
                  </Button>
                  <Text/>
                </ScrollView>
              </View>
            </View>
            </Container>
        );
      }

      handleSubmit(){
        const {navigation} = this.props;
        var email = this.state.email;
        var name = this.state.name;
        var password = this.state.password;

        if(email!='' && name!='' && password!=''){
            firebase.auth().createUserWithEmailAndPassword(email,password).then(function(res){
                    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
                        var user = firebase.auth().currentUser;
                        var userId = user.uid;
                        var newuserRef = firebase.database().ref('user/' + userId);
                        newuserRef.set({
                            email: email,
                            name: name
                        });
                        user.updateProfile({
                          email: email,
                          displayName: name,
                        })
                        .then(function(){
                          navigation.navigate('Menu');
                        })
                        .catch(error => alert(error));
                    })
                    .catch(function(error) {
                        alert(error);
                    });
                })
                .catch(function(error) {
                    alert(error);
                });
        }
        else{
          alert('all textarea are required');
        }

        // clear textarea
        this.setState({email:'',name:'',password:''});
      }
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    height: 40,
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
    fontSize: 30,
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
  },
  bg: {
    backgroundColor: '#2e2e2e'
  }
});
