import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';
class Item extends Component {
    render() {
        return (
            <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
                margin: 10,
                backgroundColor: 'rgb(246, 249, 74)',
                shadowOpacity: 1
            }}>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>Tên sách bán được</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}> {this.props.item.name}</Text>
                </View>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Text style={{ color: 'red', fontSize: 15, textAlign: 'center' }}>Số tiền bán được</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}> {this.props.item.number * this.props.item.price}</Text>
                </View>


            </View>
        )
    }
}
export default class Best_sale extends Component {
    constructor(params) {
        super(params)
        this.state = {
            day: '',
            month: '',
            arrView: [],
            resetState: false
        }
    }

    _day = (text) => {
        this.setState({
            day: text
        })

    }
    _month = (text) => {
        this.setState({
            month: text
        })
    }
    fillData = () => {
        this.setState({
            arrView: []
        })
        let month = ''
        let day = ''
        if ((parseInt(this.state.day) <= 31 && parseInt(this.state.day) > 0) || this.state.day.length == 0) {
            if (this.state.month.length == 1) {
                month = '0' + this.state.month
            } else {
                month = this.state.month
            }
            if (this.state.day.length == 1) {
                day = '0' + this.state.day
            } else {
                day = this.state.day
            }
            let arrBook = []
            let arrBill = []
            let arrAllData = []
            let arrBookPrice = []
            if (this.state.day.length == 0) {
                let getData = async (data) => {
                    await firestore()
                        .collection('Bill')
                        .where('dateToArray', 'array-contains', data + '-2020')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(snap => {
                                arrBill.push(snap.id)
                            })
                        });
                    await firestore()
                        .collection('Book')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(snap => {
                                arrBook.push(snap.id)
                                arrBookPrice.push(snap.data().price)

                            })
                        })
                    for (let i = 0; i < arrBill.length; i++) {
                        await firestore()
                            .collection('Statistic')
                            .where('bill', '==', arrBill[i])
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(snap => {
                                    arrAllData.push(snap.data())
                                })
                            })
                    }
                    for (let i = 0; i < arrBook.length; i++) {
                        let total = 0
                        for (let j = 0; j < arrAllData.length; j++) {
                            if (arrBook[i] === arrAllData[j].book) {
                                total += parseInt(arrAllData[j].number)
                            }
                        }
                        this.state.arrView.push({ name: arrBook[i], number: total, price: arrBookPrice[i] })
                        console.log(this.state.arrView)
                    }
                    this.state.arrView.sort((a, b) => {
                        return b.number * b.price - a.number * a.price
                    })
                    this.setState({
                        resetState: true
                    })
                }
                getData(month);
            } else {
                let getData = async (day, month) => {
                    await firestore()
                        .collection('Bill')
                        .where('dateToArray', 'array-contains', day + '-' + month + '-2020')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(snap => {
                                arrBill.push(snap.id)
                            })
                        });
                    await firestore()
                        .collection('Book')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(snap => {
                                arrBook.push(snap.id)
                                arrBookPrice.push(snap.data().price)

                            })
                        })
                    for (let i = 0; i < arrBill.length; i++) {
                        await firestore()
                            .collection('Statistic')
                            .where('bill', '==', arrBill[i])
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(snap => {
                                    arrAllData.push(snap.data())
                                })
                            })
                    }
                    for (let i = 0; i < arrBook.length; i++) {
                        let total = 0
                        for (let j = 0; j < arrAllData.length; j++) {
                            if (arrBook[i] === arrAllData[j].book) {
                                total += parseInt(arrAllData[j].number)
                            }
                        }
                        this.state.arrView.push({ name: arrBook[i], number: total, price: arrBookPrice[i] })
                        console.log(this.state.arrView)
                    }
                    this.state.arrView.sort((a, b) => {
                        return b.number * b.price - a.number * a.price
                    })
                    this.setState({
                        resetState: true
                    })
                }
                getData(day, month);
            }

        } else {
            alert('Nhập ngày không hợp lệ')
        }

    }
    render() {
        return (
            <View>
                <TextInput maxLength={2} placeholder='Ngày muốn lọc' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='red' onChangeText={this._day} keyboardType='numeric' />
                <TextInput maxLength={2} placeholder='Tháng muốn lọc' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='red' onChangeText={this._month} keyboardType='numeric' />
                <Button title='xác nhận' onPress={this.fillData} />
                <View style={{ marginTop: 22 }} >
                    <FlatList
                        data={this.state.arrView}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({})
