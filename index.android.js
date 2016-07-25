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
  TouchableHighlight
} from 'react-native';
import AdClient from './modules/AdClient';

class appnexus_poc extends Component {
    handleClick() {
        this.refs.ad.getAd();
    }
    render() {
        return (
          <View style={styles.root}>
            <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => this.handleClick()}
                    style={styles.button}>
                    <Text style={{color:"#ffffff"}}>Refresh</Text>
                </TouchableHighlight>
            </View>
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
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'stretch'
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 6,
        justifyContent: "center"
    }
});

AppRegistry.registerComponent('appnexus_poc', () => appnexus_poc);
