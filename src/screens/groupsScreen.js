import React, {useLayoutEffect, useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import ButtonWithBackground from '../components/ButtonWithBackground'
import Images from '../const/Images'
import GroupItem from '../components/GroupsItems'
import firebase, {firestore} from '../firebase/Firebase'
import Color from '../utils/Colors'
import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import Strings from '../const/Strings'
// import { firestore } from 'firebase'

function groupsScreen({navigation}) {

    const [groups, setGroups] = useState([])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (

                <HeaderButtons HeaderButtonComponent={ButtonWithBackground}>
                <Item
                    image= {Images.profile}
                    onPress={() => {
                        navigation.navigate('Profile Screen')
                    }}
                />
                <Item
                    image= {Images.add}
                    onPress={() => {
                        navigation.navigate('Add Group Screen')
                    }}
                />
            </HeaderButtons>
            ),
            headerLeft:() =>(
                <ButtonWithBackground onPress = {()=> {
                    Alert.alert(Strings.LogoutMsg)
                    signOutUser()
                }}
                image={Images.logout}
                />
            )
        })
    })

    useEffect(() => {
        getChats()
    }, [])

    const signOutUser = async () => {
        try{
            await firebase.auth().signOut()
            navigation.reset({
                index: 0,
                routes: [{name: 'splashScreen'}]
            })
        }catch(e){
            console.log(e)
        }
    }

    function showLogoutAlert(){
        Alert.alert(
            Strings.LogoutMsg,
            [{
                text: 'Yes', onPress: ()=> {
                    signOutUser()
                }
            },{
                text: 'No', onPress: ()=> {

                }
            }
        ],
        { cancelable: false }
        )
    }

   

    function getChats(){
        const db = firestore
        var groupArray = []

        db.collection("groups")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function(change){
                    if (change.type == "added"){
                        console.log("New Group: ", change.doc.data())
                        groupArray.push(change.doc.data())
                    }
                    if(change.type === "modified"){
                        console.log("Modified Group: ", change.doc.data())
                    }
                    if(change.type === "removed"){
                        console.log("Removed Group: ", change.doc.data())
                    }
                setGroups(groupArray)
            })
        })
    }

    return (

        <View style={styles.container}>
            <FlatList
                data = {groups}
                keyExtractor = {(item, index) => 'key'+index}
                renderItem = {({item}) => {
                    return (
                        //<Text>hiii</Text>
                        <TouchableOpacity onPress = {()=> {
                            navigation.navigate('Chat Screen', {
                                item
                            })
                        }}>
                            <GroupItem item = {item}></GroupItem>
                        </TouchableOpacity>
                    )
                }}
            >

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white
    },
    text: {
        color: Color.mytheme,
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default groupsScreen