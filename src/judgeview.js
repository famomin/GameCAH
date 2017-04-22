import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, StatusBar, AsyncStorage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Footer, Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { sliderWidth, itemWidth } from 'GameCAH/src/styles/SliderEntry.style';
import SliderEntry from 'GameCAH/src/components/SliderEntry';
import styles from 'GameCAH/src/styles/index.style';
import styles1 from 'GameCAH/src/styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from 'GameCAH/src/static/entries';
import homejs from '../Home'

import firebase from '../firebase';

var rootRef = firebase.ref();

export default class GameCAH extends Component {
  constructor(props) {
          super(props);
          this.state = {
              pwc: null,
              bc: null,
          }
          this._carousel = 0;
          this.playerName = null;
      }
  // static propTypes = {
  //     playerName: PropTypes.string.isRequired,
  // };

    getSlides (entries) {
        if (!entries) {
            return false;
        }

        return entries.map((entry, index) => {
            return (
                <SliderEntry
                  key={`carousel-entry-${index}`}
                  //Remove below code to force all white cards
                  //even={(index + 1) % 2 === 0}
                  {...entry}
                />
            );
        });
    }

    get example1 () {
        let pwc = this.state.pwc;
        console.log(pwc);
        return (
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            >
                { this.getSlides(pwc) }
            </Carousel>
        );
    }

    async getPlayerName() {
        await AsyncStorage.getItem('playerName', (err, result) => {
            this.playerName = result;
        });
    }

    async componentWillMount() {
      await this.getPlayerName();

        // rootRef.once("value").then((snapshot) => {
        //     pwc = snapshot.val().Room1.playedCards;
        //     console.log("pwc in firebaseWVC" + pwc);
        //     this.setState({
        //         pwc: pwc,
        //     });
        // });
        firebase.ref('/Room1/playedCards/faras').once(this.playerName).then((snapshot) => {
            pwc = snapshot.val();
            console.log(pwc);
            this.setState({
                pwc: pwc
            });

        });
        firebase.ref('/blackCards').once('value').then((snapshot) => {
            bc = snapshot.val()[0].title;
            this.setState({
                bc: bc
            });
        });
    }

    /*get example2 () {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={2500}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
              >
                  { this.getSlides(ENTRIES2) }
              </Carousel>
        );
    }*/

    render () {
      let bc = this.state.bc;

        const { title, subtitle, illustration, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ title.toUpperCase() }</Text>
        ) : false;

        return (
            <Grid>
                <View style={styles.colorsContainer}>
                        <View style={styles.color1} />
                        <View style={styles.color2} />
                </View>
                <Row size={5}></Row>
                <Row size={10}>
                    <Col>
                        <Text style={styles1.topGameBar}>{this.playerName}</Text>
                    </Col>

                    <Col>
                        <Text style={styles1.topGameBar}>Time Left</Text>
                    </Col>

                    <Col>
                        <Text style={styles1.topGameBar}>Score</Text>
                    </Col>
                </Row>

                <Row size={35} style={styles1.centerC}>
                    <View style={styles1.singleCard}>
                        <Text style={styles1.whiteTitle}>{(`'${bc}'`)}</Text>
                    </View>
                </Row>

                <Row size={40}>
                    <StatusBar
                        translucent={true}
                        backgroundColor={'rgba(0, 0, 0, 0.3)'}
                        barStyle={'light-content'}
                    />
                    <View style={styles.colorsContainer}>
                        <View style={styles.color1} />
                        <View style={styles.color2} />
                    </View>
                    <ScrollView
                        style={styles.scrollview}
                        indicatorStyle={'white'}
                        scrollEventThrottle={200}
                    >
                    { this.example1 }
                    </ScrollView>

                </Row>
            </Grid>
        );
    }
}
