import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, StatusBar, AsyncStorage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Footer, Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { sliderWidth, itemWidth } from 'GameCAH/src/styles/SliderEntry.style';
import SliderEntry from 'GameCAH/src/components/SliderEntry';
import styles from 'GameCAH/src/styles/index.style';
import styles1 from 'GameCAH/src/styles/SliderEntry.style';
import homejs from '../Home'
import { ENTRIES1, ENTRIES2 } from 'GameCAH/src/static/entries';

import firebase from '../firebase';

var rootRef = firebase.ref();


export default class GameCAH extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wc: null,
            bc: null,
        }
        this._carousel = 0;
        this.playerName = null;
    }

    press(Page) {
        if (Page === 'JudgeView') {
            this.props.navigator.push({
                id: 7,
            });
        }
        var carouselIndex = this._carousel.currentIndex
        console.log(carouselIndex);
        this.updateCard(carouselIndex);
    }



    updateCard(card) {

        firebase.ref('/Room1/allPlayers/' + this.playerName + '/player/cards').once('value').then((snapshot) => {
            //object of the card that is being clicked on
            var submitCard = snapshot.val()[card].title;
            console.log("submit card: " + submitCard);

            rootRef.child('/Room1/playedCards').child(this.playerName).update({
                 'title': submitCard,
            })
        });

        // firebase.ref('/Room1/allPlayers/' + playerName + '/player/cards').once('value').then(function (snapshot) {
        //     var name = playerName;
        //     console.log(snapshot.val());
        //     console.log("player name " + name);
        // });

        // rootRef.on("value", function (snapshot) {
        //     console.log(snapshot.val().Room1.allPlayers.michelle.player.cards[card]);
        //     //var submitCard = snapshot.val().Room1.allPlayers.faras.player.cards[card];

        //     // rootRef.update({

        //     // })

        // });
    }

    getSlides(entries) {
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

    get example1() {
        let wc = this.state.wc;
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
                {this.getSlides(wc)}
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

        firebase.ref('/Room1/allPlayers/' + this.playerName + '/player/cards').once('value').then((snapshot) => {
            wc = snapshot.val();
            this.setState({
                wc: wc
            });

        });

        firebase.ref('/blackCards').once('value').then((snapshot) => {
            bc = snapshot.val()[0].title;
            this.setState({
                bc: bc
            });
        });

        firebase.ref('/Room1/allPlayers/').once('value').then((snapshot) => {
          index = snapshot.val();
          console.log('index length' + snapshot.numChildren());
          console.log('index value: ' + snapshot.toJSON());
          this.setState({
            index: index
          });
        });
    }

    render() {
        let bc = this.state.bc;
        const { title, subtitle, illustration, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{title.toUpperCase()}</Text>
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
                        <Text style={styles1.timerBar}>Time Left</Text>
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
                        {/*<Text style={styles.title}>Example 1</Text>
                        <Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>*/}
                        {this.example1}
                        {/*<Text style={styles.title}>Example 2</Text>
                        <Text style={styles.subtitle}>Momentum | Autoplay</Text>
                        { this.example2 }*/}
                    </ScrollView>

                </Row>
                <Row size={10} style={styles1.centerC}>
                    <Button full success onPress={() => this.press('JudgeView')}>
                        <Text>Submit</Text>
                    </Button>
                </Row>
            </Grid>
        );
    }
}
