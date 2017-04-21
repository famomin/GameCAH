/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, Modal, Image, Platform, Navigator, TouchableHighlight, AlertIOS, ListView } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3, Form, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//import * as firebase from 'firebase';

import firebase from './firebase';

var rootRef = firebase.ref();

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      playerName: null,
      index: null,
    };

    this.itemsRef = this.getRef().child('/Room1');
    //this.itemsRef = rootRef.child('items');
    rootRef.update({
      Room1: {
        roomfull: false,
        state: true,
        // player1: {
        //   name: "",
        //   score: 0,
        //   judge: false,
        //   cards: {
        //     "1": "playerCard1",
        //     "2": "playerCard2",
        //     "3": "playerCard3",
        //     // "4": "playerCard4",
        //     // "5": "playerCard5",
        //     // "6": "playerCard6",
        //     // "7": "playerCard7",
        //   }
        // },
        USEDwhiteCards: [
          {
            "title": "USEDwCard",

          },
          {
            "title": "USEDwCard",

          },
          {
            "title": "USEDwCard",

          },
          {
            "title": "USEDwCard",

          },
          {
            "title": "USEDwCard",

          }],
        USEDblackCards: [
          {
            "title": "USEDbCard",

          },
          {
            "title": "USEDbCard",

          },
          {
            "title": "USEDbCard",

          },
          {
            "title": "USEDbCard",

          },
          {
            "title": "USEDbCard",

          }],
      }
    });
  }

  async storePlayerName(name) {
    try {
      var test = AsyncStorage.setItem('playerName', name);
    } catch (error) {
      console.log('error');
    }
  }

  playerIndex() {
    firebase.ref('/Room1/allPlayers/').once('value').then((snapshot) => {
      index = snapshot.val();
      console.log('index length' + index.length);
      console.log('index value' + index);
      this.setState({
        index: index
      });
    });
  }

  addplayer(pname) {
    var playerArray = 0;
    this.storePlayerName(pname);
    //console.log("text: " + text)
    this.itemsRef.child("allPlayers").child(pname).set({
      //roomfull: false,
      // state: true,
      player: {
        name: pname,
        score: 0,
        judge: false,
        cards: [
          {
            "title": "playerCard1"
          },
          {
            "title": "playerCard2"
          },
          {
            "title": "playerCard3"
          },
        ]
      },
      //title: playerName
    }).then(() => {
      this.playerIndex();
      let index = this.state.index;
      if (index == 0) {
        //this.UpdateJudge();
        this.press('JudgeView');
      }
      else () => {
        this.press('CardSlider');
      }
    });
  }

  getRef() {
    return firebase.ref();
  }
  // The press function takes in an argument (movie name) and pushes to the navigator the individual movie page
  // It also passes along the name of the movie which will be used fetch information from the OMDB API
  press(Page) {
    //  if(Page === 'GamePlay'){
    //     this.props.navigator.push({
    //       id: 4,
    //     });
    //  }
    //  else if(Page === 'AllPlayers'){
    //     this.props.navigator.push({
    //       id: 3,
    //     });
    //  }
    if (Page === 'CardSlider') {
      this.props.navigator.push({
        id: 6,
      });
    }
    else if (Page === 'NewGame') {
      this.props.navigator.push({
        id: 2,
      });
    }
    else if (Page === 'JoinGame') {
      this.props.navigator.push({
        id: 5,
      });
    }
    else if (Page === 'JudgeView') {
      this.props.navigator.push({
        id: 7,
      });
    }
  }

  render() {
    let playerName = this.state.playerName;
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

          {/*<Form style={{backgroundColor:'#eeeeee'}}>
                        <Item>
                            <Input placeholder="Enter your name"  />
                        </Item>
                      </Form>*/}

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
    )
  };

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
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'Cancel' },
        {
          text: 'Enter',
          onPress: (playerName) => {
            this.addplayer(playerName);
            this.setState({
              playerName: playerName,
            })
            rootRef.once("value").then((snapshot) => {
              for (var i = 0; i < 3; i++) {
                console.log(this);
                //this.itemRef = this.getRef().child('/Room1/allPlayers/michelle/player/cards');
                //this.itemRef[i].update({
                //"title":snapshot.val().whiteCards[i].title
              }
            })
            //this.firstButtonPress.bind(this);
          }
        },
      ],
      'plain-text'
    );
  }
}



// rootRef.on("value", function(snapshot){
//     console.log(snapshot.val().blackCards)
//   })

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
