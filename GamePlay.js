import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Spinner, Text, View, Content, Container, Header, Title, Button, Icon, InputGroup, Input, ListItem, List, Radio, CheckBox, Thumbnail, Card, CardItem, H3 } from 'native-base';
import cahImg from './images/cah.png';

export default class GamePlay extends Component {

  render() {
    return (
                  <Container>
                <Content>
                    <Button block>
                      <Text> Primary </Text>
                    </Button>
                    <Button block success>
                      <Text> Success </Text>
                    </Button>
                    <Button block info>
                      <Text> Info </Text>
                    </Button>
                    <Button block warning>
                      <Text> Warning </Text>
                    </Button>
                    <Button block danger>
                      <Text> Danger </Text>
                    </Button>
                    <Button dark full>
                      <Text> Dark </Text>
                    </Button>
                </Content>
            </Container>
    )
  }
}


