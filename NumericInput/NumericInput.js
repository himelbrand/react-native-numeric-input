import React, { Component } from 'react'
import { View, TextInput, StyleSheet,Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import  Button  from '../Button'
import { calcSize } from '../utils'
import PropTypes from 'prop-types'

export default class NumericInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.initValue
        }
    }
    inc = () => {
        let value =  this.props.value ? this.props.value : this.state.value
        if ( this.props.maxValue === null || (value < this.props.maxValue)) {
            value+=this.props.step
            this.setState({ value })
        }
        if (value !== this.props.value)
            this.props.onChange && this.props.onChange(value)

    }
    dec = () => {
        let value = this.props.value ? this.props.value : this.state.value
        if ( this.props.minValue === null || (value > this.props.minValue)) {
            value-=this.props.step
            this.setState({ value })
        }
        if (value !== this.props.value)
            this.props.onChange && this.props.onChange(value)
    }
    onChange = (value) => {
        this.setState({ value: this.props.valueType === 'real' ? parseFloat(value) : parseInt(value) })
        this.props.onChange &&  this.props.onChange(this.props.valueType === 'real' ? parseFloat(value) : parseInt(value))
    }
    render() {

        const sepratorWidth =  this.props.sepratorWidth 
        const iconSize = this.props.iconSize 
        const borderColor = this.props.borderColor 
        const iconStyle = [style.icon, this.props.iconStyle]
        const totalWidth = this.props.totalWidth 
        const totalHeight = this.props.totalHeight ? this.props.totalHeight : (totalWidth * 0.4)
        const inputWidth = this.props.type === 'up-down' ? (totalWidth * 0.6) : (totalWidth * 0.45)
        const paddingRight = totalWidth * 0.18
        const borderRadiusTotal = totalHeight*0.18
        const fontSize = totalHeight*0.38
        const textColor = this.props.textColor 
        const inputContainerStyle = this.props.type === 'up-down' ?
            [style.inputContainerUpDown,{width:totalWidth,height:totalHeight, borderColor: borderColor } ,this.props.rounded ? { borderRadius: borderRadiusTotal } : {}, this.props.containerStyle] :
            [style.inputContainerPlusMinus,{width:totalWidth,height:totalHeight,borderColor: borderColor } ,this.props.rounded ? { borderRadius: borderRadiusTotal } : {}, this.props.containerStyle]
        const inputStyle = this.props.type === 'up-down' ?
            [style.inputUpDown,{width:inputWidth,height:totalHeight,fontSize:fontSize,color:textColor,borderRightWidth:2,borderRightColor:borderColor} ,this.props.inputStyle] :
            [style.inputPlusMinus,{width:inputWidth,fontSize:fontSize,color:textColor} ,this.props.inputStyle]
        const sepratorStyle = [style.seprator, { backgroundColor: borderColor, width: sepratorWidth,height:totalHeight}]
        const upDownStyle= [{ alignItems: 'center',width:totalWidth-inputWidth,backgroundColor:this.props.upDownButtonsBackgroundColor,borderRightWidth:1,borderRightColor:borderColor},this.props.rounded ? {borderTopRightRadius:borderRadiusTotal,borderBottomRightRadius:borderRadiusTotal} : {}]
        const rightButtonStyle = [{height:totalHeight-2,justifyContent:'center',alignItems:'center',borderLeftWidth:sepratorWidth,borderRightWidth:1,borderRightColor:borderColor,borderLeftColor:borderColor,backgroundColor:this.props.rightButtonBackgroundColor,width:(totalWidth-inputWidth)/2},this.props.rounded ? {borderTopRightRadius:borderRadiusTotal,borderBottomRightRadius:borderRadiusTotal} : {}]
        const leftButtonStyle = [{height:totalHeight-2,justifyContent:'center',alignItems:'center',borderRightWidth:sepratorWidth,borderRightColor:borderColor,backgroundColor:this.props.leftButtonBackgroundColor,width:(totalWidth-inputWidth)/2},this.props.rounded ? {borderTopLeftRadius:borderRadiusTotal,borderBottomLeftRadius:borderRadiusTotal} : {}]        
        const value = typeof this.props.value === 'number' ? this.props.value : this.state.value

        if (this.props.type === 'up-down')
            return (
                <View style={inputContainerStyle}>
                    <TextInput keyboardType='numeric' value={value.toString()} onChangeText={this.onChange} style={inputStyle} />
                    {/* <View style={sepratorStyle} /> */}
                    <View style={upDownStyle}>
                        <Button onPress={this.inc} style={{flex:1,width:'100%',alignItems:'center'}}>
                            <Icon name='ios-arrow-up' size={fontSize} style={iconStyle} />
                        </Button>
                        <Button onPress={this.dec} style={{flex:1,width:'100%',alignItems:'center'}}>
                            <Icon name='ios-arrow-down' size={fontSize} style={iconStyle} />
                        </Button>
                    </View>
                </View>)
        else return (
            <View style={inputContainerStyle}>
                <Button onPress={this.dec} style={leftButtonStyle}>
                    <Icon name='md-remove' size={fontSize} style={iconStyle} />
                </Button>
                {/* <View style={sepratorStyle} /> */}
                <TextInput keyboardType='numeric' value={value.toString()} onChangeText={this.onChange} style={inputStyle} />
                {/* <View style={sepratorStyle} /> */}
                <Button onPress={this.inc} style={rightButtonStyle}>
                    <Icon name='md-add' size={fontSize} style={iconStyle} />
                </Button>
            </View>)


    }
}

const style = StyleSheet.create({
    seprator: {
        backgroundColor: 'grey',
        height: calcSize(80),
    },
    inputContainerUpDown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      
        borderColor: 'grey',
        borderWidth: 1
    },
    inputContainerPlusMinus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',        
        borderColor: 'grey',
        borderWidth: 1
    },
    inputUpDown: {
        textAlign: 'center',
    },
    inputPlusMinus: {
        textAlign: 'center',
    },
    icon: {
        fontWeight: '900'
    },
    upDown: {
        alignItems: 'center',
        paddingRight: calcSize(15)
    }
})
NumericInput.propTypes = {
    iconSize:PropTypes.number,
    borderColor:PropTypes.string,
    iconStyle:Text.propTypes.style,
    totalWidth:PropTypes.number,
    totalHeight:PropTypes.number,
    sepratorWidth:PropTypes.number,
    type:PropTypes.oneOf(['up-down','plus-minus']),
    valueType:PropTypes.oneOf(['real','integer']),
    rounded:PropTypes.any,
    textColor:PropTypes.string,
    containerStyle:View.propTypes.style,
    inputStyle:TextInput.propTypes.style,
    initValue:PropTypes.number,
    onChange:PropTypes.func.isRequired,
    value:PropTypes.any,
    minValue:PropTypes.number,
    maxValue:PropTypes.number,
    step:PropTypes.number,
    upDownButtonsBackgroundColor:PropTypes.string,
    rightButtonBackgroundColor:PropTypes.string,
    leftButtonBackgroundColor:PropTypes.string,




}
NumericInput.defaultProps = {
    iconSize:calcSize(30),
    borderColor:'#d4d4d4',
    iconStyle:{},
    totalWidth:calcSize(220),
    sepratorWidth:1,
    type:'plus-minus',
    rounded:false,
    textColor:'black',
    containerStyle:{},
    inputStyle:{},
    initValue:0,
    valueType:'integer',
    value:null,
    minValue:null,
    maxValue:null,
    step:1,
    upDownButtonsBackgroundColor:'white',
    rightButtonBackgroundColor:'white',
    leftButtonBackgroundColor:'white',

}