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
     else if(Page === 'CardSlider'){
        this.props.navigator.push({
          id: 6,
        });
     }

   }

   render() {
       return (
         <Image
           source={require('./images/cah.png')}
           style={styles.container}>

           <View style={styles.row}>
           </View>
           <View style={styles.row}>
           </View>
           <View style={styles.row}>
           </View>
           <View style={styles.row}>
           </View>
           <View style={styles.row}>
           </View>
           <View style={styles.row}>
           </View>

           <View style={styles.row}>
             <Button block success onPress={() => this.press()}>
                <Text>Start New Game</Text>
             </Button>
           </View>

           <View style={styles.row}>
            <Button block danger onPress={() => this.press()}>
                <Text>Join Existing Game</Text>
            </Button>
           </View>

           <View style={styles.row}>
            <Button block danger onPress={() => this.press()}>
                <Text>Join Existing Game</Text>
            </Button>
           </View>

           <View style={styles.row}>
             <Button onPress={() => this.press()}>
                <Text>Page Get Code</Text>
             </Button>
           </View>

           <View style={styles.row}>
             <Button onPress={() => this.press()}>
                <Text>Page Enter Code</Text>
            </Button>
           </View>

           <View style={styles.row}>
             <Button onPress={() => this.press('AllPlayers')}>
                <Text>All Players</Text>
             </Button>
           </View>

           <View style={styles.row}>
             <Button onPress={() => this.press('GamePlay')}>
                <Text>Final Page</Text>
            </Button>
           </View>

           <View style={styles.row}>
             <Button onPress={() => this.press('CardSlider')}>
                <Text>CardSlider</Text>
            </Button>
           </View>

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

  row: {
    flex: 1,
    flexDirection: 'row'
  },
});
