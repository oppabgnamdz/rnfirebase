import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Dialog from "react-native-dialog"
import DatePicker from 'react-native-datepicker';
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
                        <Text style={{ flex: 0.3, textAlign: 'center' }} >{this.props.item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


export default class RenderItemBill extends Component {
    constructor(params) {
        super(params)
        this.state = {
            getdata: false,
            arrFlatList: [],
            visible: false,
            name: '',
            date: ''
        }
    }
    componentDidMount() {
        this.data()
    }
    _onComfirm = () => {
        firestore()
            .collection('Bill')
            .doc(this.state.name)
            .update({
                date: this.state.date,
            })
            .then(() => {
                console.log('User updated!');
            });

        this.setState({
            visible: false
        })
        this.data()
    }
    _onDelete = () => {
        firestore()
            .collection('Bill')
            .doc(this.state.name)
            .delete()
            .then(() => {
                console.log('User deleted!');
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



    data = () => {
        this.setState({
            arrFlatList: []
        })
        let getData = async () => {
            await firestore()
                .collection('Bill')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        this.state.arrFlatList.push({ name: documentSnapshot.id, date: documentSnapshot.data().date })
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
                        renderItem={({ item }) => <Item item={item} change={() => { this.setState({ visible: !this.state.visible }) }} transfer={(param) => { this.setState({ name: param, date: '' }) }} />}
                    />
                </View>
                <View>
                    <Modal isVisible={this.state.visible} backdropColor={'gray'} backdropOpacity={1} >
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2020"
                            maxDate="01-07-2020"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button color='red' title='Hủy' onPress={() => {
                                this.setState({
                                    visible: false,
                                })
                            }} />
                            <Button color='red' title='Xác nhận' onPress={this._onComfirm} />
                        </View>
                    </Modal>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

})
