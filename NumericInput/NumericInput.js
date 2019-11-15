import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../Button'
import PropTypes from 'prop-types'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

let calcSize = create(PREDEF_RES.iphone7.px)

export default class NumericInput extends Component {
    constructor(props) {
        super(props)
        const noInitSent = props.initValue !== 0 && !props.initValue
        this.state = {
            value: noInitSent ? props.value ? props.value : 0 : props.initValue,
            lastValid: noInitSent ? props.value ? props.value : 0 : props.initValue,
            stringValue: (noInitSent ? props.value ? props.value : 0 : props.initValue).toString(),
        }
        this.ref = null
    }

    // this.props refers to the new props
    componentDidUpdate() {
        const initSent = !(this.props.initValue !== 0 && !this.props.initValue); 

        // compare the new value (props.initValue) with the existing/old one (this.state.value)
        if (this.props.initValue !== this.state.value && initSent) {
            this.setState({
                value: this.props.initValue,
                lastValid: this.props.initValue,
                stringValue: this.props.initValue.toString()
            });
        }
    }
    
    updateBaseResolution = (width, height) => {
        calcSize = create({ width, height })
    }
    inc = () => {
        let value = this.props.value && (typeof this.props.value === 'number') ? this.props.value : this.state.value
        if (this.props.maxValue === null || (value + this.props.step < this.props.maxValue)) {
            value = (value + this.props.step).toFixed(12)
            value = this.props.valueType === 'real' ? parseFloat(value) : parseInt(value)
            this.setState({ value, stringValue: value.toString() })
        } else if (this.props.maxValue !== null) {
            this.props.onLimitReached(true, 'Reached Maximum Value!')
            value = this.props.maxValue
            this.setState({ value, stringValue: value.toString() })

        }
        if (value !== this.props.value)
            this.props.onChange && this.props.onChange(Number(value))
    }
    dec = () => {
        let value = this.props.value && (typeof this.props.value === 'number') ? this.props.value : this.state.value
        if (this.props.minValue === null || (value - this.props.step > this.props.minValue)) {
            value = (value - this.props.step).toFixed(12)
            value = this.props.valueType === 'real' ? parseFloat(value) : parseInt(value)
        } else if (this.props.minValue !== null) {
            this.props.onLimitReached(false, 'Reached Minimum Value!')
            value = this.props.minValue
        }
        if (value !== this.props.value)
            this.props.onChange && this.props.onChange(Number(value))
        this.setState({ value, stringValue: value.toString() })
    }
    isLegalValue = (value, mReal, mInt) => value === '' || (((this.props.valueType === 'real' && mReal(value)) || (this.props.valueType !== 'real' && mInt(value))) && (this.props.maxValue === null || (parseFloat(value) <= this.props.maxValue)) && (this.props.minValue === null || (parseFloat(value) >= this.props.minValue)))

    realMatch = (value) => value && value.match(/-?\d+(\.(\d+)?)?/) && value.match(/-?\d+(\.(\d+)?)?/)[0] === value.match(/-?\d+(\.(\d+)?)?/).input

    intMatch = (value) => value && value.match(/-?\d+/) && value.match(/-?\d+/)[0] === value.match(/-?\d+/).input

    onChange = (value) => {
        let currValue = typeof this.props.value === 'number' ? this.props.value : this.state.value
        if ((value.length === 1 && value === '-') || (value.length === 2 && value === '0-')) {
            this.setState({ stringValue: '-' })
            return
        }
        if ((value.length === 1 && value === '.') || (value.length === 2 && value === '0.')) {
            this.setState({ stringValue: '0.' })
            return
        }
        if ((value.charAt(value.length - 1) === '.')) {
            this.setState({ stringValue: value })
            return
        }
        let legal = this.isLegalValue(value, this.realMatch, this.intMatch)
        if (legal) {
            this.setState({ lastValid: value })
        }
        if (!legal && !this.props.validateOnBlur) {
            if (this.ref) {
                this.ref.blur()
                setTimeout(() => {
                    this.ref.clear()
                    setTimeout(() => {
                        this.props.onChange && this.props.onChange(currValue - 1)
                        this.setState({ value: currValue - 1 }, () => {
                            this.setState({ value: currValue, legal })
                            this.props.onChange && this.props.onChange(currValue)
                        })
                    }, 10)
                }, 15)
                setTimeout(() => this.ref.focus(), 20)
            }

        } else if (!legal && this.props.validateOnBlur) {
            this.setState({ stringValue: value })
            let parsedValue = this.props.valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== this.props.value)
                this.props.onChange && this.props.onChange(parsedValue)
            this.setState({ value: parsedValue, legal, stringValue: parsedValue.toString() })
        } else {
            this.setState({ stringValue: value })
            let parsedValue = this.props.valueType === 'real' ? parseFloat(value) : parseInt(value)
            parsedValue = isNaN(parsedValue) ? 0 : parsedValue
            if (parsedValue !== this.props.value)
                this.props.onChange && this.props.onChange(parsedValue)
            this.setState({ value: parsedValue, legal, stringValue: parsedValue.toString() })

        }
    }
    onBlur = () => {

        let match = this.state.stringValue.match(/-?[0-9]\d*(\.\d+)?/)
        let legal = match && match[0] === match.input && ((this.props.maxValue === null || (parseFloat(this.state.stringValue) <= this.props.maxValue)) && (this.props.minValue === null || (parseFloat(this.state.stringValue) >= this.props.minValue)))
        if (!legal) {
            if (this.props.minValue !== null && (parseFloat(this.state.stringValue) <= this.props.minValue)) {
                this.props.onLimitReached(true, 'Reached Minimum Value!')
            }
            if (this.props.maxValue !== null && (parseFloat(this.state.stringValue) >= this.props.maxValue)) {
                this.props.onLimitReached(false, 'Reached Maximum Value!')
            }
            if (this.ref) {
                this.ref.blur()
                setTimeout(() => {
                    this.ref.clear()
                    setTimeout(() => {
                        this.props.onChange && this.props.onChange(this.state.lastValid)
                        this.setState({ value: this.state.lastValid }, () => {
                            this.setState({ value: this.state.lastValid, stringValue: this.state.lastValid.toString() })
                            this.props.onChange && this.props.onChange(this.state.lastValid)
                        })
                    }, 10)
                }, 15)
                setTimeout(() => this.ref.focus(), 50)
            }
        }
        this.props.onBlur && this.props.onBlur()
    }

    onFocus = () => {
        this.setState({ lastValid: this.state.value })
        this.props.onFocus && this.props.onFocus()
    }

    render() {
        const editable = this.props.editable
        const sepratorWidth = (typeof this.props.separatorWidth === 'undefined') ? this.props.sepratorWidth : this.props.separatorWidth;//supporting old property name sepratorWidth
        const borderColor = this.props.borderColor
        const iconStyle = [style.icon, this.props.iconStyle]
        const totalWidth = this.props.totalWidth
        const totalHeight = this.props.totalHeight ? this.props.totalHeight : (totalWidth * 0.4)
        const inputWidth = this.props.type === 'up-down' ? (totalWidth * 0.6) : (totalWidth * 0.4)
        const borderRadiusTotal = totalHeight * 0.18
        const fontSize = totalHeight * 0.38
        const textColor = this.props.textColor
        const maxReached = this.state.value === this.props.maxValue
        const minReached = this.state.value === this.props.minValue
        const inputContainerStyle = this.props.type === 'up-down' ?
            [style.inputContainerUpDown, { width: totalWidth, height: totalHeight, borderColor: borderColor }, this.props.rounded ? { borderRadius: borderRadiusTotal } : {}, this.props.containerStyle] :
            [style.inputContainerPlusMinus, { width: totalWidth, height: totalHeight, borderColor: borderColor }, this.props.rounded ? { borderRadius: borderRadiusTotal } : {}, this.props.containerStyle]
        const inputStyle = this.props.type === 'up-down' ?
            [style.inputUpDown, { width: inputWidth, height: totalHeight, fontSize: fontSize, color: textColor, borderRightWidth: 2, borderRightColor: borderColor }, this.props.inputStyle] :
            [style.inputPlusMinus, { width: inputWidth, height: totalHeight, fontSize: fontSize, color: textColor, borderRightWidth: sepratorWidth, borderLeftWidth: sepratorWidth, borderLeftColor: borderColor, borderRightColor: borderColor }, this.props.inputStyle]
        const upDownStyle = [{ alignItems: 'center', width: totalWidth - inputWidth, backgroundColor: this.props.upDownButtonsBackgroundColor, borderRightWidth: 1, borderRightColor: borderColor }, this.props.rounded ? { borderTopRightRadius: borderRadiusTotal, borderBottomRightRadius: borderRadiusTotal } : {}]
        const rightButtonStyle = [
            {
                position: 'absolute',
                zIndex: -1,
                right: 0,
                height: totalHeight - 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0,
                backgroundColor: this.props.rightButtonBackgroundColor,
                width: (totalWidth - inputWidth) / 2
            },
            this.props.rounded ?
                {
                    borderTopRightRadius: borderRadiusTotal,
                    borderBottomRightRadius: borderRadiusTotal
                }
                : {}]
        const leftButtonStyle = [
            {
                position: 'absolute',
                zIndex: -1,
                left: 0,
                height: totalHeight - 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: this.props.leftButtonBackgroundColor,
                width: (totalWidth - inputWidth) / 2,
                borderWidth: 0
            },
            this.props.rounded ?
                { borderTopLeftRadius: borderRadiusTotal, borderBottomLeftRadius: borderRadiusTotal }
                : {}]
        const inputWraperStyle = {
            alignSelf: 'center',
            borderLeftColor: borderColor,
            borderLeftWidth: sepratorWidth,
            borderRightWidth: sepratorWidth,
            borderRightColor: borderColor
        }
        if (this.props.type === 'up-down')
            return (
                <View style={inputContainerStyle}>
                    <TextInput {...this.props.extraTextInputProps} editable={editable} returnKeyType='done' underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={this.state.stringValue} onChangeText={this.onChange} style={inputStyle} ref={ref => this.ref = ref} onBlur={this.onBlur} onFocus={this.onFocus} />
                    <View style={upDownStyle}>
                        <Button onPress={this.inc} style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                            <Icon name='ios-arrow-up' size={fontSize} style={[...iconStyle, maxReached ? this.props.reachMaxIncIconStyle : {}, minReached ? this.props.reachMinIncIconStyle : {}]} />
                        </Button>
                        <Button onPress={this.dec} style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                            <Icon name='ios-arrow-down' size={fontSize} style={[...iconStyle, maxReached ? this.props.reachMaxDecIconStyle : {}, minReached ? this.props.reachMinDecIconStyle : {}]} />
                        </Button>
                    </View>
                </View>)
        else return (
            <View style={inputContainerStyle}>
                <Button onPress={this.dec} style={leftButtonStyle}>
                    <Icon name='md-remove' size={fontSize} style={[...iconStyle, maxReached ? this.props.reachMaxDecIconStyle : {}, minReached ? this.props.reachMinDecIconStyle : {}]} />
                </Button>
                <View style={[inputWraperStyle]}>
                    <TextInput {...this.props.extraTextInputProps} editable={editable} returnKeyType='done' underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={this.state.stringValue} onChangeText={this.onChange} style={inputStyle} ref={ref => this.ref = ref} onBlur={this.onBlur} onFocus={this.onFocus} />
                </View>
                <Button onPress={this.inc} style={rightButtonStyle}>
                    <Icon name='md-add' size={fontSize} style={[...iconStyle, maxReached ? this.props.reachMaxIncIconStyle : {}, minReached ? this.props.reachMinIncIconStyle : {}]} />
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
        justifyContent: 'center',
        borderWidth: 1
    },
    inputUpDown: {
        textAlign: 'center',
        padding: 0

    },
    inputPlusMinus: {
        textAlign: 'center',
        padding: 0
    },
    icon: {
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    upDown: {
        alignItems: 'center',
        paddingRight: calcSize(15)
    }
})
NumericInput.propTypes = {
    iconSize: PropTypes.number,
    borderColor: PropTypes.string,
    iconStyle: PropTypes.any,
    totalWidth: PropTypes.number,
    totalHeight: PropTypes.number,
    sepratorWidth: PropTypes.number,
    type: PropTypes.oneOf(['up-down', 'plus-minus']),
    valueType: PropTypes.oneOf(['real', 'integer']),
    rounded: PropTypes.any,
    textColor: PropTypes.string,
    containerStyle: PropTypes.any,
    inputStyle: PropTypes.any,
    initValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onLimitReached: PropTypes.func,
    value: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    upDownButtonsBackgroundColor: PropTypes.string,
    rightButtonBackgroundColor: PropTypes.string,
    leftButtonBackgroundColor: PropTypes.string,
    editable: PropTypes.bool,
    reachMaxIncIconStyle: PropTypes.any,
    reachMaxDecIconStyle: PropTypes.any,
    reachMinIncIconStyle: PropTypes.any,
    reachMinDecIconStyle: PropTypes.any,
    extraTextInputProps: PropTypes.any
}
NumericInput.defaultProps = {
    iconSize: calcSize(30),
    borderColor: '#d4d4d4',
    iconStyle: {},
    totalWidth: calcSize(220),
    sepratorWidth: 1,
    type: 'plus-minus',
    rounded: false,
    textColor: 'black',
    containerStyle: {},
    inputStyle: {},
    initValue: null,
    valueType: 'integer',
    value: null,
    minValue: null,
    maxValue: null,
    step: 1,
    upDownButtonsBackgroundColor: 'white',
    rightButtonBackgroundColor: 'white',
    leftButtonBackgroundColor: 'white',
    editable: true,
    validateOnBlur: true,
    reachMaxIncIconStyle: {},
    reachMaxDecIconStyle: {},
    reachMinIncIconStyle: {},
    reachMinDecIconStyle: {},
    onLimitReached: (isMax, msg) => { },
    extraTextInputProps: {}

}
