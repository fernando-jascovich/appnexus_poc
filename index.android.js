/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import AdClient from './modules/AdClient';
import Form from './modules/Form';

class appnexus_poc extends Component {
  render() {
    return (
      <View style={styles.root}>
        <ScrollView style={styles.scroll}>
          <Form onFormSubmit={(data) => { this.refs.ad.getAd(data); }} />
        </ScrollView>
        <View style={styles.content}>
          <AdClient ref={"ad"}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#666666',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  scroll: {
    flex: 1,
    marginBottom: -8
  },
  content: {
    justifyContent: "flex-end",
    alignItems: 'stretch'
  }
});

AppRegistry.registerComponent('appnexus_poc', () => appnexus_poc);
