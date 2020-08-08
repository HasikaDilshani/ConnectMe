import React from 'react'
import { TextInput, Text, StyleSheet, View, Button } from 'react-native'
import Color from '../utils/Colors'
import Constants from '../const/Constants'
//import ButtonWithBackground from '../components/ButtonWithBackground'
//import Button from '../components/Button'
import Strings from '../const/Strings'

const MessageFieldView = ({term, placeHolder, onTermChange, onValidateText, error, onSubmit, isJoined}) => {
    return (
        <View style = {styles.containerView}>
            <View style = {styles.fieldView}>
                <TextInput
                    autoCorrect = {false}
                    style = {styles.textField}
                    placeholder = {placeHolder}
                    value = {term}
                    onChangeText = {onTermChange}
                    onEndEditing = {onValidateText} 
                />
                <Button title = {Strings.Send}  style = {styles.Button} color = {Color.connectMeColor} onPress = {onSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor:  Color.white,
        width: Constants.screenWidth,
        flex: 1,
        justifyContent: 'space-between'
    },
    fieldView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.connectMeColor
    },
    textField: {
        fontSize: 21,
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        width: '75%',
        borderColor: Color.gray,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Color.smoke
    },
    Button: {
        flex: 1,
        alignSelf: 'center',
        width: '25%',
        height: '100%'
    }

})

export default MessageFieldView

