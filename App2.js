import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database';

export default class App2 extends Component {
    render() {
        return (
            <View style={{
                margin: 34
            }}>
                <Text


                > textInComponent </Text>
                <View style={{
                    backgroundColor: 'red',
                    borderRadius: 10

                }}>
                    <Button

                        onPress={() => {
                            const url = database().ref('/');
                            database().ref('/users/123')
                            console.log(url)
                            database()
                                .ref('/users/123')
                                .set({
                                    name: 'Ada Lovelace',
                                    age: 31,
                                })
                                .then(() => console.log('Data set.'));


                        }}

                        title="click me abc" />
                </View>
            </View>
        )
    }
}
