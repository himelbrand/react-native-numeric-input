import React, { Component } from 'react';
import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    Text
} from 'react-native';

function _handlePress(callback){
    requestAnimationFrame(callback)
}


const Button = (props) => {
    return (
        Platform.OS === 'ios'
        ? <TouchableOpacity disabled={props.disabled} style={props.style} onPressIn={() => _handlePress(props.onPressIn) } onPressOut={() => _handlePress(props.onPressOut) }>{props.children}</TouchableOpacity> 
        : <TouchableNativeFeedback  disabled={props.disabled} onPressIn={() => _handlePress(props.onPressIn) } onPressOut={() => _handlePress(props.onPressOut) }><View style={props.style}>{props.children}</View></TouchableNativeFeedback>
    )
}

Button.defaultProps = {
    onPress : () => {}
}

export default Button;
