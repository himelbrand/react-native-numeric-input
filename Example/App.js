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
  ScrollView,
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
      <ScrollView style={{paddingBottom:200}} contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>
          Numeric Input Examples
        </Text>
        <Text style={styles.instructions}>
          Basic Numeric Input
        </Text>
        <NumericInput onChange={value => console.log(value)} />
        <View style={styles.seprator}/>
        <Text style={styles.instructions}>
          Rounded Numeric Input
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded />
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Basic Numeric Input - up {'&'} down
        </Text>
        <NumericInput onChange={value => console.log(value)} type='up-down' />
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input - up {'&'} down
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded type='up-down' />
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input - up {'&'} down with styling
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded type='up-down' textColor='#26547C' iconStyle={{ color: 'green' }} upDownButtonsBackgroundColor='#06D6A0' />
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input with styling
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded textColor='#59656F' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#AC9FBB' leftButtonBackgroundColor='#DDBDD5' />
        <View style={styles.seprator}/>


        <Text style={styles.instructions}>
          Rounded Numeric Input with costum width
        </Text>
        <NumericInput onChange={value => console.log(value)} totalWidth={200} rounded textColor='#103900' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#0FFF95' leftButtonBackgroundColor='#06BA63' />
        <View style={styles.seprator}/>


        <Text style={styles.instructions}>
          Rounded Numeric Input with costum width and height
        </Text>
        <NumericInput onChange={value => console.log(value)} totalWidth={240} totalHeight={50} rounded textColor='#B0228C' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#EA3788' leftButtonBackgroundColor='#E56B70' />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:null,
    width:null,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 60,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
  seprator:{
    height:10,
    width:200,
    margin:10,
  }
});
