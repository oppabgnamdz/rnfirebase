import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Dialog from "react-native-dialog"
const screen = Dimensions.get('window')
class Item extends Component {

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.change()
                this.props.transfer(this.props.item.name)
            }}>
                <View style={{
                    flex: 1,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2,
                    margin: 10,
                    backgroundColor: '#ddd7d7',
                    shadowOpacity: 1



                }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>{this.props.item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ flex: 0.3, textAlign: 'center' }} >{this.props.item.title}</Text>
                        <Text style={{ flex: 0.3, textAlign: 'center' }} >{this.props.item.location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


export default class RenderItemCategory extends Component {
    constructor(params) {
        super(params)
        this.state = {
            getdata: false,
            arrFlatList: [],
            visible: false,
            name: ''
        }
    }
    componentDidMount() {
        this.data()
    }
    _onComfirm = () => {
        firestore()
            .collection('Category')
            .doc(this.state.name)
            .update({
                title: this.state.title,
                location: this.state.location
            })
            .then(() => {
            });

        this.setState({
            visible: false
        })
        this.data()
    }
    _onDelete = () => {
        firestore()
            .collection('Category')
            .doc(this.state.name)
            .delete()
            .then(() => {
            });
        this.setState({
            visible: false
        })
        this.data()
    }
    _location = (text) => {
        this.setState({
            location: text
        })
    }
    _title = (text) => {
        this.setState({
            title: text
        })
    }


    data = () => {
        this.setState({
            arrFlatList: []
        })
        let getData = async () => {
            await firestore()
                .collection('Category')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        this.state.arrFlatList.push({ name: documentSnapshot.id, title: documentSnapshot.data().title, location: documentSnapshot.data().location })
                    });
                });
            this.setState({
                getdata: true
            })
        }
        getData();



    }
    render() {
        return (

            <View>
                <View style={{ flex: 1, marginTop: 22 }} >
                    <FlatList
                        data={this.state.arrFlatList}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => <Item item={item} change={() => { this.setState({ visible: !this.state.visible }) }} transfer={(param) => { this.setState({ name: param, location: '', title: '' }) }} />}
                    />
                </View>
                <View>
                    <Dialog.Container visible={this.state.visible}>
                        <Dialog.Title>Thay đổi thông tin</Dialog.Title>
                        <Dialog.Description>
                            Nhập thông tin
                                 </Dialog.Description>
                        <Dialog.Input placeholder='Nhập mô tả' style={{ borderWidth: Platform.OS === 'ios' ? 0 : 1 }} onChangeText={this._title} />
                        <Dialog.Input placeholder='Nhập vị trí sách ' style={{ borderWidth: Platform.OS === 'ios' ? 0 : 1 }} onChangeText={this._location} />
                        <Dialog.Button label="Xóa thể loại" onPress={this._onDelete} />
                        <Dialog.Button label="Đồng ý" onPress={this._onComfirm} />
                        <Dialog.Button label="Hủy" onPress={() => {
                            this.setState({
                                visible: false
                            })
                        }} />

                    </Dialog.Container>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

})
