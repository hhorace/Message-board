import React from "react";
import {StyleSheet, View, Text ,ScrollView, TouchableNativeFeedback, Image} from "react-native";
import {Container, Header, Left, Right, Body, Icon, Button, Footer, FooterTab,ListItem,List,Textarea} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'firebase';
import moment from "moment";

export default class MenuScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        postlist: [],
        content: '',
        postlist_time: [],
        edit_ttime: '',
        input_text: 'New content'
      };
      this.handleEdit = this.handleEdit.bind(this);
      this.handleNew = this.handleNew.bind(this);
    }
    componentDidMount(){
        const tmp_this = this;
        var postRef = firebase.database().ref('chat');
        postRef.on('value',(snapshot)=>{
          let postlist = [];
          let postlist_time = [];
          snapshot.forEach(function(p){

              postlist.push(p.val());
              postlist_time.push(p.key);
          });
          //console.log(postlist);
          //console.log(postlist_time);
          tmp_this.setState({postlist:postlist,postlist_time:postlist_time});
        });
    }

    render() {
      let postlist = [];
      //console.log('ttime: ',this.state.postlist_time);
      for(let i=0; i<this.state.postlist.length; i++){
            let ttime = this.state.postlist_time[i];
            postlist[i] =
                <TouchableNativeFeedback key={i} background={TouchableNativeFeedback.Ripple('red')} onPress={() => this.handleEdit(ttime)}>
                    <View style={{backgroundColor:'white',borderWidth:5, borderColor: '#2e2e2e',marginLeft: 5, marginRight: 5}}>
                        <Text style={{fontSize:20,marginLeft: 5,}}>{this.state.postlist[i].name}: {this.state.postlist[i].content}</Text>
                    </View>
                </TouchableNativeFeedback>;
      }
      return (
        <Container>
          <View style={styles.container}>
           <ScrollView>

            {postlist}
              <Textarea rowSpan={2} bordered placeholder={this.state.input_text} style={styles.input} value={this.state.content}
              onChangeText = { (text) => {this.setState({content: text}) } }/>
            <Button block primary style={styles.btn} onPress={this.handleNew}>
              <Text style={styles.textBtn}>送出</Text>
            </Button>
            <View style={{height:20}}></View>
           </ScrollView>
          </View>
        </Container>
      );
    }


    handleEdit(ttime){
        const tmp_this = this;
        console.log('enter edit');
        var name = firebase.auth().currentUser.displayName;
        var Ref = firebase.database().ref('chat/' + ttime);
        //console.log(Ref);
        Ref.once('value').then(function(p){
            //console.log('p: ',p.val().name);
            if(p.val().name!=name){
                alert('You can\'t edit others message!');
            }
            else{
                tmp_this.setState({edit_ttime:ttime, input_text:'Edit content. Remain empty to delet.'});
            }
        })
        .catch(error =>  console.log(error));
    }
    handleNew(){
      var content = this.state.content;
      var userId = firebase.auth().currentUser.uid;
      var name = firebase.auth().currentUser.displayName;
      var now = moment().format('MMMM-Do-YYYY-hh:mm:ss'); // December 13th 2018, 17:25:14
      const {navigation} = this.props;
       if(content!=''){
           if(this.state.edit_ttime!=''){ //edit content
               var newuserRef = firebase.database().ref('chat/' + this.state.edit_ttime);
               this.setState({edit_ttime:'', input_text:'New content'});
               newuserRef.set({
                    content: content,
                    name: name
                })
                .catch(error =>  console.log(error));
           }
           else{ //new content
               var newuserRef = firebase.database().ref('chat/' + now);
               newuserRef.set({
                    content: content,
                    name: name
                })
                .catch(error =>  console.log(error));
            }
       }
       else if(content==''&&this.state.edit_ttime!=''){ //delet
           console.log("deleting");
           var newuserRef = firebase.database().ref('chat/' + this.state.edit_ttime);
           this.setState({edit_ttime:'', input_text:'New content'});
           newuserRef.remove()
           .catch(error => console.log(error));
       }
       else{
           alert('all textarea are required');
       }
       this.setState({content:''});

    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderTopWidth: 5,
      borderTopColor: '#2e2e2e',
      backgroundColor: '#2e2e2e'
    },
    input:{
      fontSize: 20,
      color: 'white',
      marginLeft: 10,
      marginRight: 10
    },
    textBtn: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    btn: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#5cb85c'
    }
  });
