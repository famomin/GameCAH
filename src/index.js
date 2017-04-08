import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, Footer } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { sliderWidth, itemWidth } from 'GameCAH/src/styles/SliderEntry.style';
import SliderEntry from 'GameCAH/src/components/SliderEntry';
import styles from 'GameCAH/src/styles/index.style';
import { ENTRIES1, ENTRIES2 } from 'GameCAH/src/static/entries';

export default class GameCAH extends Component {

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
                { this.getSlides(ENTRIES1) }
            </Carousel>
        );
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
        return (
          <Grid>
            <Row size={10}>
              <Col>
                <Text>Name</Text>
              </Col>

              <Col>
                <Text>Time Left</Text>
              </Col>

              <Col>
                <Text>Score</Text>
              </Col>
            </Row>

            <Row size={35}>
              <Text>Some Text</Text>
            </Row>

            <Row size={50}>
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
                      { this.example1 }
                      {/*<Text style={styles.title}>Example 2</Text>
                      <Text style={styles.subtitle}>Momentum | Autoplay</Text>
                      { this.example2 }*/}
                  </ScrollView>

            </Row>
            <Row size={10}>
              <Button block success onPress={() => this.press()}>
                 <Text>Submit</Text>
              </Button>
            </Row>
          </Grid>
        );
    }
}
