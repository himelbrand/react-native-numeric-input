/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
const calcSize = create(PREDEF_RES.iphone7.px)


export default class App extends Component {
  constructor(props) {
    console.log('fgfgf ')
    super(props)
    this.state = {
      value: 0,
      amount: 0,
      v1: 0,
      v2: 0,
      v3: 0,
      v4: 0,
      v5: 6,
      v6: 0,
      v7: 0,
      v8: 0,
      value1: 1
    }
    this.amount = 0
  }
  changeAmount(text) {
    this.amount = text
  }
  render() {
    return (
      <ScrollView style={{ paddingBottom: 200 }} contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>
          Numeric Input Examples
        </Text>
        <NumericInput
          value={this.state.value1}
          onChange={value1 => { this.setState({ value1 }); console.log(this.state.value1); }}
          onLimitReached={(isMin, msg) => console.log(isMin, msg)}
          totalWidth={80}
          totalHeight={30}
          iconSize={10}
          step={1}
          minValue={0}
          valueType="real"
          rounded editable={false}
          textColor="#B0228C"
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="#18c2ef"
          leftButtonBackgroundColor="#ff8080"
        />
        <NumericInput
          // initValue={this.state.v1}
          value={this.state.v1}
          onChange={(v1) => { this.setState({ v1 }); console.log(v1) }}
          totalWidth={150}
          totalHeight={35}
          minValue={0}
          maxValue={9999}
          onLimitReached={(isMAx, msg) => console.log(msg)}
          step={5}
          iconStyle={{ fontSize: 15, color: '#434A5E' }}
          inputStyle={{ fontSize: 18, color: '#434A5E' }}
          valueType='real'
          borderColor='#C7CBD6'
          rightButtonBackgroundColor='#C7CBD6'
          leftButtonBackgroundColor='#C7CBD6'
        />
        <Text style={styles.instructions}>
          Basic Numeric Input - no limits
        </Text>
        <NumericInput
          initValue={this.state.v2}
          value={this.state.v2}
          onChange={(v2) => this.setState({ v2 })} />
        <View style={styles.seprator} />
        <Text style={styles.instructions}>
          Rounded Numeric Input - with minValue of 0
        </Text>
        <NumericInput
          value={this.state.v3}
          onChange={(v3) => this.setState({ v3 })} rounded minValue={0} onLimitReached={(isMax, msg) => console.log(isMax, msg)} />
        <View style={styles.seprator} />

        <Text style={styles.instructions}>
          Basic Numeric Input - with step of 0.5 and valueType real
        </Text>
        <NumericInput initValue={this.state.v4}
          value={this.state.v4}
          onChange={(v4) => this.setState({ v4 })} type='up-down' valueType='real' step={0.5} />
        <View style={styles.seprator} />

        <Text style={styles.instructions}>
          Rounded Numeric Input - with minValue of 0 and maxValue of 5
        </Text>
        <NumericInput initValue={this.state.value} value={this.state.value} onChange={value => this.setState({ value })} rounded type='up-down' minValue={0} validateOnBlur maxValue={5} onLimitReached={(isMax, msg) => console.log(isMax, msg)} />
        <View style={styles.seprator} />

        <Text style={styles.instructions}>
          Rounded Numeric Input - with styling and initial value of 6
        </Text>
        <NumericInput
          value={this.state.v5}
          onChange={(v5) => this.setState({ v5 })} rounded type='up-down' textColor='#26547C' iconStyle={{ color: 'green' }} upDownButtonsBackgroundColor='#06D6A0' />
        <View style={styles.seprator} />

        <Text style={styles.instructions}>
          Rounded Numeric Input with styling
        </Text>
        <NumericInput initValue={this.state.v6}
          value={this.state.v6}
          onChange={(v6) => this.setState({ v6 })} rounded textColor='#59656F' iconStyle={{ color: 'white' }} rightButtonBackgroundColor='#AC9FBB' leftButtonBackgroundColor='#DDBDD5' />
        <View style={styles.seprator} />


        <Text style={styles.instructions}>
          Rounded Numeric Input with custom width
        </Text>
        <NumericInput
          initValue={this.state.v7}
          value={this.state.v7}
          onChange={(v7) => this.setState({ v7 })}
          totalWidth={200}
          rounded
          textColor='#103900'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#0FFF95'
          leftButtonBackgroundColor='#06BA63' />
        <View style={styles.seprator} />


        <Text style={styles.instructions}>
          Rounded Numeric Input with custom width and height
        </Text>
        <NumericInput
          initValue={this.state.v8}
          value={this.state.v8}
          onChange={(v8) => this.setState({ v8 })}
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
    height: null,
    width: null,
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
  seprator: {
    height: 10,
    width: 200,
    margin: 10,
  }
});
