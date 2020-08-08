import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'

function splashScreen({navigation}){
    useEffect(()=> {
        NavigateToAuthOrGroupScreen()

    }, [navigation])

    function NavigateToAuthOrGroupScreen(){
        // const {currentUser} = firebase.auth()
        setTimeout(function (){

            firebase.auth().onAuthStateChanged((user) => {
                if (user != null){
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Groups Screen'}]
                    })
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'signInScreen'}]
                    })
                }   
            })

        
    },1000)
    }

return (
    <View style={styles.constainer}>
        <Image style={styles.logo} source= {Images.logo}></Image>
    </View>
)
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight
    },
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.theme
    }

})

export default splashScreen