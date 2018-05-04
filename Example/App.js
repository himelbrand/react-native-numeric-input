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
import NumericInput, {calcSize} from 'react-native-numeric-input'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
  }
  render() {
    return (
      <ScrollView style={{paddingBottom:200}} contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>
          Numeric Input Examples
        </Text>
        <Text style={styles.instructions}>
          Basic Numeric Input - no limits
        </Text>
        <NumericInput onChange={value => console.log(value)} />
        <View style={styles.seprator}/>
        <Text style={styles.instructions}>
          Rounded Numeric Input - with minValue of 0
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded minValue={0}/>
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Basic Numeric Input - with step of 0.5 and valueType real
        </Text>
        <NumericInput onChange={value => console.log(value)} type='up-down' valueType='real' step={0.5}/>
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input - with minValue of 0 and maxValue of 5
        </Text>
        <NumericInput value={this.state.value} onChange={value => this.setState({value})} rounded type='up-down' minValue={0} maxValue={5}/>
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input - with styling and initial value of 6
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded type='up-down' initValue={6} textColor='#26547C' iconStyle={{ color: 'green' }} upDownButtonsBackgroundColor='#06D6A0' />
        <View style={styles.seprator}/>

        <Text style={styles.instructions}>
          Rounded Numeric Input with styling
        </Text>
        <NumericInput onChange={value => console.log(value)} rounded textColor='#59656F' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#AC9FBB' leftButtonBackgroundColor='#DDBDD5' />
        <View style={styles.seprator}/>


        <Text style={styles.instructions}>
          Rounded Numeric Input with costum width
        </Text>
        <NumericInput 
        onChange={value => console.log(value)} 
        totalWidth={200} 
        rounded 
        textColor='#103900' 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#0FFF95' 
        leftButtonBackgroundColor='#06BA63' />
        <View style={styles.seprator}/>


        <Text style={styles.instructions}>
          Rounded Numeric Input with costum width and height
        </Text>
        <NumericInput 
        onChange={value => console.log(value)} 
        totalWidth={calcSize(500)} 
        totalHeight={calcSize(100)} 
         
        textColor='#B0228C' 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#EA3788' 
        leftButtonBackgroundColor='#E56B70' />
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
