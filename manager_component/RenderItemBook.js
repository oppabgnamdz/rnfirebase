import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput, Picker, Button } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
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
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.category}</Text>
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.author}</Text>
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.title}</Text>
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.number}</Text>
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.price} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
export default class RenderItemBook extends Component {
    constructor(params) {
        super(params)
        this.state = {
            arrFlatList: [],
            getdata: false,
            name: '',
            title: '',
            category: '',
            number: '',
            price: '',
            author: '',
            visible: false

        }
    }

    componentDidMount() {
        this.data()
    }
    data = () => {
        this.setState({
            arrFlatList: []
        })
        let getData = async () => {
            await firestore()
                .collection('Book')
                .get()
                .then(querySnapshot => {
                    console.log('Total users: ', querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        this.state.arrFlatList.push({ name: documentSnapshot.id, title: documentSnapshot.data().title, category: documentSnapshot.data().category, number: documentSnapshot.data().number, author: documentSnapshot.data().author, price: documentSnapshot.data().price })
                    });
                });
            this.setState({
                getdata: true
            })
            console.log(this.state.arrFlatList)

        }
        getData();
    }
    _price = (text) => {
        this.setState({

            price: text
        })
    }
    _number = (text) => {
        this.setState({
            number: text
        })
    }
    render() {
        return (

            <View>
                <View style={{ flex: 1, marginTop: 22 }}>
                    <FlatList
                        data={this.state.arrFlatList}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => <Item item={item} change={() => { this.setState({ visible: !this.state.visible }) }} transfer={(param) => { this.setState({ name: param, price: '', number: '' }) }} />}
                    />

                </View>
                <Modal isVisible={this.state.visible} backdropColor={'gray'} backdropOpacity={1} >
                    <Text style={{ textAlign: 'center' }}>Sửa hoặc xóa thông tin sách</Text>
                    <TextInput placeholder='Giá' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._price} />
                    <TextInput placeholder='Số lượng' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._number} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button color='red' title='Hủy' onPress={() => {
                            this.setState({
                                visible: false,
                                arrList: []
                            })
                        }} />
                        <Button title='Xóa' color='red' onPress={() => {
                            firestore()
                                .collection('Book')
                                .doc(this.state.name)
                                .delete(this.state.name)
                                .then(() => {
                                    console.log('User deleted!');
                                });
                            this.setState({
                                visible: false,
                                arrList: []
                            })
                            this.data()
                        }}></Button>
                        <Button color='red' title='Xác nhận' onPress={() => {
                            firestore()
                                .collection('Book')
                                .doc(this.state.name)
                                .update({
                                    number: this.state.number,
                                    price: this.state.price
                                })
                                .then(() => {
                                    console.log('User updated!');
                                });
                            this.setState({
                                visible: false,
                                arrList: []
                            })
                            this.data();

                        }} />
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
