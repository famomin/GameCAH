

 import React, { Component } from 'react';
 import { AppRegistry, StyleSheet, Modal, Image, Platform, Navigator, TouchableHighlight } from 'react-native';
 import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3, Form, Item, Input } from 'native-base';
 import { Col, Row, Grid } from 'react-native-easy-grid';

 export default class NewGame extends Component {
   // The press function takes in an argument (movie name) and pushes to the navigator the individual movie page
   // It also passes along the name of the movie which will be used fetch information from the OMDB API
  
   render() {
       return (
         <Image
           source={require('./images/cah.png')}
           style={styles.imageContainer}>

           <Grid>
           
              
             
              <Row></Row>
              <Container>

                <Form style={{backgroundColor:'#eeeeee'}}>
                    <Item>
                        <Input placeholder="Enter Code Here" />
                    </Item>
                </Form>
              <Row></Row>
              <Row>
                  <Button block success onPress={() => this.press('NewGame')}>
                     <Text>Start New Game</Text>
                  </Button>
              </Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              <Row></Row>
              </Container>
              </Grid>

        </Image>
       );
     }
   }
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
