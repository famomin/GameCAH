import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from 'GameCAH/src/styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        even: PropTypes.bool
    };

    render () {
        const { title, subtitle, illustration, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ title.toUpperCase() }</Text>
        ) : false;

        return (
          <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
          }}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
            <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${title}'`); }}
                >
                  {/*<View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                      <Image
                        source={{ uri: illustration }}
                        style={styles.image}
                      />
                      <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                  </View>*/}
                  <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                      {/*{ uppercaseTitle }*/}
                      <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={10}>{ uppercaseTitle }</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}
