/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import { AppRegistry, StyleSheet, Modal, Image, Platform, Navigator, TouchableHighlight, AlertIOS, ListView } from 'react-native';
 import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3, Form, Item, Input } from 'native-base';
 import { Col, Row, Grid } from 'react-native-easy-grid';
 import * as firebase from 'firebase';


 const config = {
     apiKey: "AIzaSyCTKP5CD183HRaUy3NnS13iHAQNFJab8oo",
     authDomain: "project3database.firebaseapp.com",
     databaseURL: "https://project3database.firebaseio.com",
     storageBucket: "project3database.appspot.com",
   };
  const firebaseApp = firebase.initializeApp(config);
  
  var rootRef = firebase.database().ref();

 export default class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
    //this.itemsRef = rootRef.child('items');
    rootRef.set({
        blackCards: {
          "1": "bCard",
          "2": "bCard",
          "3": "bCard",
          "4": "bCard",
          "5": "bCard",
        },
        whiteCards: {
          "1": "wCard",
          "2": "wCard",
          "3": "wCard",
          "4": "wCard",
          "5": "wCard",
        },
        Room1: {
          roomfull: false,
          state: true,
          player1: {
            name: "",
            score: 0,
            judge: false,
            cards: {
              "1": "playerCard1",
              "2": "playerCard2",
              "3": "playerCard3",
              // "4": "playerCard4",
              // "5": "playerCard5",
              // "6": "playerCard6",
              // "7": "playerCard7",
            }
          },
          USEDwhiteCards: {
            "1": "USEDwCard",
            "2": "USEDwCard",
            "3": "USEDwCard",
            "4": "USEDwCard",
            "5": "USEDwCard",
          },
          USEDblackCards: {
            "1": "USEDbCard",
            "2": "USEDbCard",
            "3": "USEDbCard",
            "4": "USEDbCard",
            "5": "USEDbCard",
          },
          playedCards: {
            "player1": "some card"
          }
        }
      });
    }

  


  // constructor(props) {
  //   super(props);
    
  //   rootRef.set({
  //     title: "Hello World!",
  //     author: "Simon",
  //     location: {
  //       city: "Muenster",
  //       state: "Germany",
  //       zip: 48155
  //     }
  //   });
  // }

  getRef() {
    return firebaseApp.database().ref();
  }
   // The press function takes in an argument (movie name) and pushes to the navigator the individual movie page
   // It also passes along the name of the movie which will be used fetch information from the OMDB API
   press(Page) {
     if(Page === 'GamePlay'){
        this.props.navigator.push({
          id: 4,
        });
     }
     else if(Page === 'AllPlayers'){
        this.props.navigator.push({
          id: 3,
        });
     }
     else if(Page === 'CardSlider'){
        this.props.navigator.push({
          id: 6,
        });
     }
     else if(Page === 'NewGame'){
        this.props.navigator.push({
          id: 2,
        });
     }
     else if(Page === 'JoinGame'){
        this.props.navigator.push({
          id: 5,
        });
     }

   }

   render() {
       return (
         <Image
           source={require('./images/cah.png')}
           style={styles.imageContainer}>

           <Grid>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>

                <Form style={{backgroundColor:'#eeeeee'}}>
                    <Item>
                        <Input placeholder="Enter your name" />
                    </Item>
                </Form>

              <Row>
                  <Button block success onPress={() => this.press('NewGame')}>
                     <Text>Start New Game</Text>
                  </Button>
              </Row>

              <Row>
                 <Button block danger onPress={this._addItem.bind(this)}>
                     <Text>Join Existing Game</Text>
                 </Button>
              </Row>



              <Row>
                  <Button onPress={() => this.press('CardSlider')}>
                     <Text>CardSlider</Text>
                 </Button>
              </Row>

          </Grid>

        </Image>
       );
     }

      componentDidMount() {
         this.listenForItems(this.itemsRef);
      }

     listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

          // get children as an array
          var items = [];
          snap.forEach((child) => {
            items.push({
              //title: child.val().title,
              //_key: child.key,
            });
          });

          this.setState({
            //dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
            dataSource: this.state.dataSource.cloneWithRows(items)
          });

        });
      }



     _addItem() {
       AlertIOS.prompt(
         'Enter Your Name',
         null,
         [
           {text:'Cancel', onPress: () => console.log('Cancel Pressed'), style:'Cancel'},
           {
             text: 'Enter',
             onPress: (playerName) => {
               //console.log("text: " + text)
               this.itemsRef.child("player1").set({
                 //roomfull: false,
                   // state: true,
                    player: {
                      name: playerName,
                      score: 0,
                      judge: false,
                      cards: {
                        "1": "playerCard1",
                        "2": "playerCard2",
                        "3": "playerCard3",
                        // "4": "playerCard4",
                        // "5": "playerCard5",
                        // "6": "playerCard6",
                        // "7": "playerCard7",
                      }
                    },
                 //title: playerName
                },
               this.press('CardSlider'))
             }
           },
         ],
         'plain-text'
       );
     }
   }

rootRef.on("child_added", function(snapshot){
    console.log(snapshot.val());
  })

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor:'transparent',
    alignItems: 'center',
    marginTop: 200,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
});
