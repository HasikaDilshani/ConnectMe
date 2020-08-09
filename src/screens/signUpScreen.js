import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert, KeyboardAvoidingView, SafeAreaView, Image } from 'react-native'
import CustomTextField from '../components/CustomTextField'
import Strings from '../const/Strings'
import Utility from '../utils/Utility'
import firebase, {firestore} from '../firebase/Firebase'
import PasswordTextField from '../components/PasswordTextField'
import EmailTextField from '../components/EmailTextField'
import Button from '../components/Button'
import DismissKeyboard from '../components/DismissKeyboard'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'

function signUpScreen({navigation}){

    const [regUserName, setRegUserName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsLoading] = useState(false) 
    const [regUserEmail, setRegUserEmail] = useState('')
    const [regUserPassword, setRegUserPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    validateField = () => {
        const isValidField = Utility.isValidField(regUserName)
        isValidField ? setFieldError('') : setFieldError(Strings.RegUserNameEmpty)
        return isValidField
    }

    const validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(regUserEmail)
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAddress)
        return isValidEmail
    }

    const validatePasswordField = () => {
        const isValidField = Utility.isValidField(regUserPassword)
        isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty)
        return isValidField

    }

    function createRegUserToFirebase(){
        setIsLoading(true)
        const regUsersRef = firestore.collection("RegisteredUsers").doc() //makes a collection
        //const userID = firebase.auth().currentUser.uid

        regUsersRef.set({
            regUserID: regUsersRef.id,
            regUserName: regUserName,
            regUserEmail: regUserEmail,
            regUserPassword: regUserPassword,


        }).then(function (docRef){
            setIsLoading(false)
            console.log('Document written with ID:', regUsersRef.id)
            navigation.navigate('signInScreen')
            // addMembersOfChatToFirebase(groupsRef.id, userID)
        }).catch(function(error){
            Alert.alert(error.message)
            setIsLoading(false)
            console.error("error adding document: ", error)
        })
    }

    performCreateRegUser = () =>{
        const isValidField = validateField()
        if (isValidField){
            createRegUserToFirebase()
        }
    }

    return (

        <DismissKeyboard>
            <KeyboardAvoidingView style = {styles.container} behavior = "padding" enabled>
           
    
        <View style={styles.container}> 
        <SafeAreaView>

        <Image style = {styles.logo} source = {Images.logo}></Image>

        <CustomTextField 
            term = {regUserName}
            error = {fieldError}
            placeHolder = {Strings.EnterYourName}
            onTermChange = {newRegUserName => setRegUserName(newRegUserName)}
            onValidateTextField = {validateField}
        /> 

        <EmailTextField
            term = {regUserEmail}
            error = {emailError}
            placeHolder = {Strings.EmailPlaceHolder}
            onTermChange = {newRegUserEmail => {setRegUserEmail(newRegUserEmail)}}
            onValidateEmailAddress = {validateEmailAddress}
        />

        <PasswordTextField
            term = {regUserPassword}
            error = {passwordError}
            placeHolder = {Strings.PasswordPlaceHolder}
            onTermChange = {newregUserPassword => {setRegUserPassword(newregUserPassword)}}
            onValidatePasswordField = {validatePasswordField}
        />

        <Button title = {Strings.CreateRegUser} onPress={performCreateRegUser} isLoading = {isLoading} />

        <Text 
          style={styles.loginText}
          onPress={() => {navigation.navigate('signInScreen')}}>
          {/* onPress={() => this.props.navigation.navigate('signInScreen')}> */}
          Already Registered? Click here to login
        </Text>
        </SafeAreaView>                          
      </View>
      </KeyboardAvoidingView>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.black
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight
    }
})

export default signUpScreen