import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import signInScreen from '../screens/signInScreen'
import groupsScreen from '../screens/groupsScreen'
import addGroupScreen from '../screens/addGroupScreen'
import chatScreen from '../screens/chatScreen'
import splashScreen from '../screens/splashScreen'

const Stack = createStackNavigator()

function ChatFlow() {
    return (
        <NavigationContainer>
            <Stack.Navigator name="chat">
                <Stack.Screen
                name="splashScreen"
                component={splashScreen}
                options={{ headerShown: false}}
                />
                <Stack.Screen
                name="signInScreen"
                component={signInScreen}
                options={{ headerShown: false}}
                />
                <Stack.Screen
                name="Groups Screen"
                component={groupsScreen}
                options={{ title: "Groups"}}
                />
                <Stack.Screen
                name="Add Group Screen"
                component={addGroupScreen}
                options={{ title: "Add Group"}}
                />
                <Stack.Screen
                name="Chat Screen"
                component={chatScreen}
                options={{ title: "Chats"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function MainStackNavigator()
{
    return(
        ChatFlow()
    )
}

export default MainStackNavigator