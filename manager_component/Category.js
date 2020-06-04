import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert, Platform, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Dialog from "react-native-dialog"
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import RenderItemCategory from './RenderItemCategory'
const reference = database().ref('/category');
const screen = Dimensions.get('window')
export default class Category extends Component {
    constructor(params) {
        super(params)
        this.state = {
            visible: false,
            name: '',
            title: '',
            location: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button title='Add Category' onPress={() => {
                    this.setState({
                        visible: true
                    })

                }



                }>

                </Button>
            )

        })
    }
    _name = (text) => {
        this.setState({
            name: text
        })
    }
    _title = (text) => {
        this.setState({
            title: text
        })
    }
    _location = (text) => {
        this.setState({
            location: text
        })
    }

    _onComfirm = () => {
        firestore()
            .collection('Category')
            .doc(this.state.name)
            .set({
                title: this.state.title,
                location: this.state.location,
            })
            .then(() => {
                alert('Thêm thành công')
            });
        this.setState({
            visible: false
        })
        this.refs.myRender.data()

    }
    render() {
        return (
            <View>

                <ScrollView>
                    <RenderItemCategory ref={'myRender'} />
                </ScrollView>


                <View>
                    <Dialog.Container visible={this.state.visible}>
                        <Dialog.Title>Thêm thể loại</Dialog.Title>
                        <Dialog.Description>
                            Nhập thể loại
                                 </Dialog.Description>
                        <Dialog.Input placeholder='Nhập tên thể loại' style={{ borderWidth: Platform.OS === 'ios' ? 0 : 1 }} onChangeText={this._name} />
                        <Dialog.Input placeholder='Nhập mô tả' style={{ borderWidth: Platform.OS === 'ios' ? 0 : 1 }} onChangeText={this._title} />
                        <Dialog.Input placeholder='Nhập vị trí sách ' style={{ borderWidth: Platform.OS === 'ios' ? 0 : 1 }} onChangeText={this._location} />
                        <Dialog.Button label="Hủy" onPress={() => { this.setState({ visible: false }) }} />
                        <Dialog.Button label="Đồng ý" onPress={this._onComfirm} />

                    </Dialog.Container>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: "row",
        width: screen.width,
        backgroundColor: 'red',
        justifyContent: 'space-around'

    }

})
