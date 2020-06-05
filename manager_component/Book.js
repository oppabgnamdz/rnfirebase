import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Picker, TextInput, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import RenderItemBook from './RenderItemBook'


export default class Book extends Component {
    constructor(params) {
        super(params)
        this.state = {
            visible: false,
            arrList: [],
            category: '',
            name: '',
            author: '',
            title: '',
            price: '',
            number: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button title='Add Book' onPress={() => {

                    let getData = async () => {
                        await firestore()
                            .collection('Category')
                            .get()
                            .then(querySnapshot => {
                                console.log('Total users: ', querySnapshot.size);
                                querySnapshot.forEach(documentSnapshot => {
                                    this.state.arrList.push(documentSnapshot.id)
                                });
                            });
                        this.setState({
                            visible: true
                        })

                    }
                    getData();

                }



                }>

                </Button>
            )

        })

    }
    changeValue = (value) => {
        this.setState({
            category: value
        })
    }
    showPicker = () => {
        return (
            <Picker onValueChange={this.changeValue} selectedValue={this.state.category}>
                {this.state.arrList.map(item => <Picker.Item label={`${item}`} value={`${item}`} />)}
            </Picker>
        )
    }
    _name = (text) => {
        this.setState({
            name: text
        })
    }
    _author = (text) => {
        this.setState({
            author: text
        })
    }
    _title = (text) => {
        this.setState({
            title: text
        })
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
                <ScrollView>
                    <RenderItemBook ref={'myRender'} data={this.state.arrList} />
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <Modal isVisible={this.state.visible} backdropColor={'gray'} backdropOpacity={1} >
                        <TextInput placeholder='Nhập tên sách' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._name} />
                        <TextInput placeholder='Tiêu đề' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._title} />
                        <TextInput placeholder='Tác giả' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._author} />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>Thể loại</Text>
                        {this.showPicker()}

                        <TextInput placeholder='Giá' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._price} />
                        <TextInput placeholder='Số lượng' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._number} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button color='red' title='Hủy' onPress={() => {
                                this.setState({
                                    visible: false,
                                    arrList: []
                                })
                            }} />
                            <Button color='red' title='Xác nhận' onPress={() => {
                                this.setState({
                                    visible: false,
                                    arrList: []
                                })
                                firestore()
                                    .collection('Book')
                                    .doc(this.state.name)
                                    .set({
                                        title: this.state.title,
                                        author: this.state.author,
                                        price: this.state.price,
                                        number: this.state.number,
                                        category: this.state.category
                                    })
                                    .then(() => {
                                        alert('Thêm thành công')
                                    });
                                this.refs.myRender.data()
                            }} />
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
