import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import CustomTextField from '../components/CustomTextField'
import Strings from '../const/Strings'
import Utility from '../utils/Utility'
import firebase, {firestore} from '../firebase/Firebase'
import Button from '../components/Button'

function addGroupScreen({navigation}){

    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsLoading] = useState(false) 

    validateField = () => {
        const isValidField = Utility.isValidField(groupName)
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty)
        return isValidField
    }

    function createGroupToFirebase(){
        setIsLoading(true)
        const groupsRef = firestore.collection("groups").doc() //makes a collection
        const userID = firebase.auth().currentUser.uid

        groupsRef.set({
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID,


        }).then(function (docRef){
            setIsLoading(false)
            console.log('Document written with ID:', groupsRef.id)
            addMembersOfChatToFirebase(groupsRef.id, userID)
        }).catch(function(error){
            Alert.alert(error.message)
            setIsLoading(false)
            console.error("error adding document: ", error)
        })
    }

    function addMembersOfChatToFirebase(groupID, userID){
        const membersRef = firestore.collection("members").doc(groupID).collection('member').doc() //makes 2 collections
        membersRef.set({
            userID: userID
        }).then(function (docRef){
            navigation.goBack()
        })

        .catch(function (error) {
            setIsLoading(false)
            console.error("Error adding document: ", error)
        })
        
    }

    performCreateGroup = () =>{
        const isValidField = validateField()
        if (isValidField){
            createGroupToFirebase()
        }
    }

    return (
        <View style={styles.container}>
            
        <CustomTextField 
            term = {groupName}
            error = {fieldError}
            placeHolder = {Strings.EnterYourGroupName}
            onTermChange = {newGroupName => setGroupName(newGroupName)}
            onValidateTextField = {validateField}
        />

        <Button title = {Strings.CreateGroup} onPress={performCreateGroup} isLoading = {isLoading} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   
    }
})

export default addGroupScreen