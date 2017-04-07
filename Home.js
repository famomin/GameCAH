/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import { AppRegistry, StyleSheet, Modal, Image, Platform, Navigator, TouchableHighlight } from 'react-native';
 import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3 } from 'native-base';

 export default class Home extends Component {
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
     
   }

   render() {
       return (
         <Image
           source={require('./images/mainbackground.jpeg')}
           style={styles.container}>
           <Text style={styles.welcome}>
             Welcome to {'\n'}CARDS AGAINST HUMANITY!
           </Text>
           <Text style={styles.instructions}>
             To get started, please enter your name:
           </Text>
           <Text style={styles.instructions}>
             Select Start to start new game,{'\n'}
             or Join an existing game.
           </Text>
           <Button onPress={() => this.press()}>
              <Text>Start New Game</Text>
           </Button>
           <Button onPress={() => this.press()}>
              <Text>Join Existing Game</Text>
          </Button>
          <Button onPress={() => this.press()}>
             <Text>Page Get Code</Text>
          </Button>
          <Button onPress={() => this.press()}>
             <Text>Page Enter Code</Text>
         </Button>
         <Button onPress={() => this.press('AllPlayers')}>
            <Text>All Players</Text>
         </Button>
         <Button onPress={() => this.press('GamePlay')}>
            <Text>Final Page</Text>
        </Button>
        </Image>
       );
     }
   }

   const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
});
