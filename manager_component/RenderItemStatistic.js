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
                    <Text style={{ color: 'red', fontSize: 15, textAlign: 'center' }}>Số sách bán được</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}> {this.props.item.number}</Text>
                </View>


            </View>
        )
    }
}
export default class RenderItemStatistic extends Component {
    constructor(params) {
        super(params)
        this.state = {
            date: '',
            arrView: [],
            resetState: false

        }
    }
    _date = (text) => {
        this.setState({
            date: text
        })
    }
    fillData = () => {
        this.setState({
            arrView: []
        })
        let date = ''
        if (this.state.date.length == 1) {
            date = '0' + this.state.date
        } else {
            date = this.state.date
        }
        let arrBook = []
        let arrBill = []
        let arrAllData = []

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
                this.state.arrView.push({ name: arrBook[i], number: total })
            }
            console.log(this.state.arrView)
            this.setState({
                resetState: true
            })
        }
        getData(date);
    }
    render() {
        console.log(this.state.arrView)
        return (
            <View>
                <TextInput maxLength={2} placeholder='Tháng muốn lọc' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='red' onChangeText={this._date} keyboardType='numeric' />
                <Button title='xác nhận' onPress={this.fillData} />
                <View style={{ marginTop: 22 }} >
                    <FlatList
                        data={this.state.arrView}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
