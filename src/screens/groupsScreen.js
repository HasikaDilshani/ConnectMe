import React, {useLayoutEffect, useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import ButtonWithBackground from '../components/ButtonWithBackground'
import Images from '../const/Images'
import GroupItem from '../components/GroupsItems'
import firebase, {firestore} from '../firebase/Firebase'
// import { firestore } from 'firebase'

function groupsScreen({navigation}) {

    const [groups, setGroups] = useState([])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <ButtonWithBackground onPress = {()=> {
                    navigation.navigate('Add Group Screen')

                }}
                image= {Images.add}
                />

            ),
            headerLeft:() =>(
                <ButtonWithBackground onPress = {()=> {

                }}
                image={Images.logout}
                />

        )
        })
    })

    useEffect(() => {
        getChats()
    }, [])

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
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default groupsScreen