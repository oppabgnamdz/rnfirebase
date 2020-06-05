import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, TextInput, Alert, Image, Platform, ScrollView } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import Main from './Main';

export default class App2 extends Component {
    constructor(params) {
        super(params)
        this.state = {
            user: '',
            pass: ''
        }

    }
    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '4133756178-phgcai91bn22t5k4t5pusp0jiskmpee0.apps.googleusercontent.com',
        });
    }
    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    onFacebookButtonPress = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }


    _signin = () => {
        if (Platform.OS === 'android' && !this.state.user.includes('@') && this.state.pass.length < 6) {
            console.log("nam ngu")
            Alert.alert('Thông tin không hợp lệ')
        } else {
            auth().signInWithEmailAndPassword(this.state.user, this.state.pass)
                .then(() => {
                    this.props.navigation.navigate(Main)
                }).catch(err => {
                    try {
                        Alert.alert('Đăng nhập thất bại')
                    } catch (e) {
                        console.log(e)
                    }
                })
        }




    }
    _signup = () => {
        if (this.state.user.includes('@') && this.state.pass.length >= 6) {
            auth().createUserWithEmailAndPassword(this.state.user, this.state.pass)
                .then(() => {
                    console.log('login succesfully')
                    Alert.alert('Đăng ký thành công')

                }).catch(error => {
                    try {
                        if (error.code === 'auth/email-already-in-use') {
                            Alert.alert('Tài khoản đã tồn tại')
                        }

                        if (error.code === 'auth/invalid-email') {
                            Alert.alert('Tài khoản không hợp lệ')
                        }
                    } catch (e) {
                        console.log(e)
                    }




                })
        } else {
            Alert.alert('Điều kiện đăng ký không hợp lệ')
        }

    }
    render() {

        return (
            <ScrollView style={{
                margin: 34,
                marginTop: Platform.OS === 'ios' ? 34 : 0


            }}>


                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{ width: 180, height: 180 }}
                        source={require('./images/logo.png')}
                    />
                </View>

                <TextInput style={{ height: 40, padding: 10, margin: 20, borderRadius: 10, borderColor: 'gray', borderWidth: 1, }}
                    onChangeText={(text) => {
                        this.setState({
                            user: text
                        })
                    }}
                    keyboardType='email-address'
                    placeholder='Nhập tên email'

                ></TextInput>
                <TextInput style={{ height: 40, padding: 10, margin: 20, borderRadius: 10, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => {
                        this.setState({
                            pass: text
                        })
                    }}
                    keyboardType='default'
                    placeholder='Nhập mật khẩu'
                    secureTextEntry={true}
                ></TextInput>
                <View style={{
                    backgroundColor: 'red',
                    borderRadius: 10

                }}>
                    <Button

                        onPress={this._signup}

                        title="Sign up" />

                </View>
                <View
                    style={{
                        marginTop: 20,
                        backgroundColor: 'cyan',
                        borderRadius: 10,

                    }}
                >
                    <Button
                        color='red'
                        title='Sign in'
                        onPress={this._signin}
                    />
                </View>
                <Text style={{
                    marginTop: 10,
                    textDecorationLine: 'underline',
                    textAlign: 'center'
                }}

                    onPress={() => {

                    }
                    }
                >Forgot password</Text>

                <View
                    style={{
                        marginTop: 20
                    }}
                >
                    <Button
                        title="Facebook Sign-In"
                        onPress={() => this.onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                    />
                </View>
                <View
                    style={{ marginTop: 20 }}
                >
                    <Button
                        style={{
                        }}
                        title="Google Sign-In"
                        onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                    />
                </View>
            </ScrollView >
        )
    }
}
