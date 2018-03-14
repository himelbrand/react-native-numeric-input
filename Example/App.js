/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NumericInput from 'react-native-numeric-input'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Numeric Input Example App!
        </Text>
        <Text style={styles.instructions}>
          Basic Numeric Input
        </Text>
        <NumericInput onChange={value=>console.log(value)}/>
        <Text style={styles.instructions}>
          Rounded Numeric Input
        </Text>
        <NumericInput onChange={value=>console.log(value)} rounded/>
        <Text style={styles.instructions}>
          Basic Numeric Input - up {'&'} down
        </Text>
        <NumericInput onChange={value=>console.log(value)} type='up-down'/>
        <Text style={styles.instructions}>
          Rounded Numeric Input - up {'&'} down
        </Text>
        <NumericInput onChange={value=>console.log(value)} rounded type='up-down'/>
        <Text style={styles.instructions}>
          Rounded Numeric Input - up {'&'} down with textColor:red iconColor:green
        </Text>
        <NumericInput onChange={value=>console.log(value)} rounded type='up-down' textColor='red' iconStyle={{color:'green'}} upDownButtonsBackgroundColor='red'/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
