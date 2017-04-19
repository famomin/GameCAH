import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Footer, Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { sliderWidth, itemWidth } from 'GameCAH/src/styles/SliderEntry.style';
import SliderEntry from 'GameCAH/src/components/SliderEntry';
import styles from 'GameCAH/src/styles/index.style';
import styles1 from 'GameCAH/src/styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from 'GameCAH/src/static/entries';

import firebase from '../firebase';

var rootRef = firebase.ref();

export default class GameCAH extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            wc: null,
        }
    }

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
        let wc = this.state.wc;
        console.log(wc);
        return (
            <Carousel
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
                { this.getSlides(wc) }
            </Carousel>
        );
    }

    componentWillMount() {
        rootRef.once("value").then((snapshot) => {
            wc = snapshot.val().whiteCards;
            console.log("wc in firebaseWVC" + wc);
            this.setState({
                wc: wc,
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
                        <Text style={styles1.topGameBar}>Name</Text>
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
                        <Text style={styles1.whiteTitle}>Hello</Text>
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