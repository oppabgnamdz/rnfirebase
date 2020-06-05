import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Picker, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
export default class Statistic extends Component {
    constructor(params) {
        super(params)
        this.state = {
            visible: false,
            arrListBill: [],
            arrListBook: [],
            bill: '',
            book: '',
            name: '',
            number: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button title='Add Statistic' onPress={() => {
                    this.setState({
                        visible: true
                    })
                    let getData = async () => {
                        await firestore()
                            .collection('Bill')
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(documentSnapshot => {
                                    this.state.arrListBill.push(documentSnapshot.id)
                                });
                            });
                        this.setState({
                            visible: true
                        })
                        await firestore()
                            .collection('Book')
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(documentSnapshot => {
                                    this.state.arrListBook.push(documentSnapshot.id)
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
    changeValueBill = (value) => {
        this.setState({
            bill: value
        })
    }
    changeValueBook = (value) => {
        this.setState({
            book: value
        })
    }
    showPickerBill = () => {
        return (
            <Picker onValueChange={this.changeValueBill} selectedValue={this.state.bill}>
                {this.state.arrListBill.map(item => <Picker.Item label={`${item}`} value={`${item}`} />)}
            </Picker>
        )
    }
    showPickerBook = () => {
        return (
            <Picker onValueChange={this.changeValueBook} selectedValue={this.state.book}>
                {this.state.arrListBook.map(item => <Picker.Item label={`${item}`} value={`${item}`} />)}
            </Picker>
        )
    }
    _number = (text) => {
        this.setState({
            number: text
        })
    }
    render() {
        return (
            <View>
                <Modal isVisible={this.state.visible} backdropColor={'gray'} backdropOpacity={1} >
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'cyan' }}>Chọn mã hóa đơn</Text>
                    {this.showPickerBill()}
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'cyan' }}>Chọn mã sách</Text>
                    {this.showPickerBook()}
                    <TextInput placeholder='Số lượng bán được' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._number} keyboardType='numeric' />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button color='red' title='Hủy' onPress={() => {
                            this.setState({
                                visible: false,
                                arrList: []
                            })
                        }} />
                        <Button color='red' title='Xác nhận' onPress={() => {

                            let getData = async () => {
                                const obj = await firestore()
                                    .collection('Book')
                                    .doc(this.state.book)
                                    .get()
                                console.log(obj.data().number)
                                console.log(this.state.number)
                                if (parseInt(obj.data().number) > parseInt(this.state.number)) {
                                    firestore()
                                        .collection('Statistic')
                                        .add({
                                            bill: this.state.bill,
                                            book: this.state.book,
                                            number: this.state.number
                                        })
                                        .then(() => {
                                            alert('Thêm thành công')
                                            firestore()
                                                .collection('Book')
                                                .doc(this.state.book)
                                                .update({
                                                    number: obj.data().number - this.state.number,
                                                })
                                                .then(() => {
                                                    console.log('User updated!');
                                                });
                                        });
                                } else {
                                    alert('Số lượng nhập vào lớn hơn số lượng gốc')
                                }

                            }
                            getData();
                            this.setState({
                                visible: false,
                                arrListBill: [],
                                arrListBook: []
                            })

                        }} />
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
