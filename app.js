/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

// Importing scenes for our app
import Home from './Home';
import NewGame from './NewGame';
import JoinGame from './JoinGame';
import Splash from './Splash';
import GamePlay from './GamePlay';
import Root from './src/index';
import JudgeView from './src/judgeview.js';

// importing firebase
// import * as firebase from "firebase";
// import keys from "./keys.js";
// firebase.initializeApp(keys);

class GameCAH extends Component {

  // Our renderScene function will choose which scene to render based on the route id
  renderScene(route, navigator) {
    if (route.id === 1) {
      return <Home navigator={navigator} />
    }
    else if (route.id === 2) {
      return <NewGame navigator={navigator} />
    }
    else if (route.id === 3) {
      return <Splash navigator={navigator} />
    }
    else if (route.id === 4) {
      return <GamePlay navigator={navigator} />
    }
    else if (route.id === 5) {
      return <JoinGame navigator={navigator} />
    }
    else if (route.id === 6) {
      return <Root navigator={navigator} />
    }
    else if (route.id === 7) {
      return <JudgeView navigator={navigator} />
    }
  }

  // The configureScene function allows us to change the animation properties of a scene
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      // Our Navigator handles the transition between different scenes in our app
      <Navigator
        // The first page we are going to render
        initialRoute={{ id: 3 }}
        // Passing in our renderScene function
        renderScene={this.renderScene}
        // Passing in our configureScene function
        configureScene={this.configureScene}
      />
    );
  }

}

AppRegistry.registerComponent('GameCAH', () => GameCAH);
