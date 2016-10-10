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
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';
import AdClient from './modules/AdClient';

class appnexus_poc extends Component {
    handleClick() {
        this.refs.ad.getAd(this.placementId,
                this.width,
                this.height);
    }
    render() {
        return (
          <View style={styles.root}>
            <TextInput
                keyboardType="numeric"
                placeholder="Enter placement id here"
                placeholderTextColor="#999999"
                underlineColorAndroid="#ffffff"
                style={styles.input}
                onChangeText={(text) => this.placementId = text} />
            <View style={styles.sizesContainer}>
                <TextInput
                    keyboardType="numeric"
                    placeholder="width"
                    placeholderTextColor="#999999"
                    underlineColorAndroid="#ffffff"
                    maxLength={4}
                    style={styles.inputSize}
                    onChangeText={(text) => this.width = text} />
                <Text style={{
                    width: 30,
                    textAlign: "center",
                    color: "#ffffff"
                }}>x</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder="height"
                    placeholderTextColor="#999999"
                    underlineColorAndroid="#ffffff"
                    maxLength={4}
                    style={styles.inputSize}
                    onChangeText={(text) => this.height = text} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => this.handleClick()}
                    style={styles.button}>
                    <Text style={{color:"#ffffff"}}>Refresh ad</Text>
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
        alignSelf: "center",
    },
    button: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 6,
        justifyContent: "center"
    },
    input: {
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 10
    },
    inputSize: {
        width: 100,
        textAlign: "center",
        color: "#ffffff"
    },
    sizesContainer: {
        flexDirection: 'row',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    }
});

AppRegistry.registerComponent('appnexus_poc', () => appnexus_poc);
