import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'
//import LottieView from 'lottie-react-native'

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

        
    },4000)
    }

return (
    <View style={styles.constainer}>
        <Text style={styles.textName}>17000696</Text>
        <Text style={styles.textName}>H.D.P. Jayasuriya</Text>
         <Image style={styles.logo} source= {Images.logo}></Image>
        {/* <View style={styles.lottieView}>
            <LottieView source = {require('../../assets/animate1.json')} autoPlay loop></LottieView>
        </View> */}
       
    </View>
)
}

const styles = StyleSheet.create({
    lottieView: {
        width: '100%',
        height: 0.6 * Constants.screenHeight

    },
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight
    },
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.black
    },
    textName:
    {
        fontSize: 30,
        color:Color.white
    }

})

export default splashScreen