import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, FlatList} from 'react-native'
import Images from '../const/Images'
import Constants from '../const/Constants'
import ProfileItem from '../components/ProfileItem'
import firebase, {firestore} from '../firebase/Firebase'
import Color from '../utils/Colors'

function profileScreen({navigation})
{
    const [profile, setRegisteredUsers] = useState([])
    //const userName = firebase.auth().currentUser.uid
    const userEmail = firebase.auth().currentUser.email
    const db = firestore
    var detailArray  = db.collection('RegisteredUsers').where('regUserEmail', '==', userEmail).get().then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
    
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
        }
      });
    

    return(
        <View style={styles.container}>
            <Text style={styles.text}> My Profile </Text>
            <Image style = {styles.img} source = {Images.profile}></Image>
            {/* <Text>G</Text> */}

            <Text style={styles.detailsText}>{userEmail}</Text>
            <Text style={styles.detailsText}>{detailArray.regUserName}</Text>


            <Text 
                        style={styles.loginText}
                        onPress={() => {navigation.navigate('Groups Screen')}}>
                        Groups
                    </Text> 

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ebebeb',
        marginTop: 40
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    img: {
        alignSelf: 'flex-start',
        marginLeft: 60,
        marginRight: 60,
        margin: 0.01 * Constants.screenHeight
    },loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'left',
        fontSize: 21
    },
    detailsText: {
        color: Color.blacks,
        fontSize: 24,
        fontWeight: 'bold' 
    }
})

export default profileScreen