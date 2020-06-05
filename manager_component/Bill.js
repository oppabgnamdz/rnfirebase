import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Alert, Platform, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import RenderItemBill from './RenderItemBill'
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
const screen = Dimensions.get('window')
export default class Bill extends Component {
    constructor(params) {
        super(params)
        this.state = {
            visible: false,
            name: '',
            date: '01-01-2020',
            dateToArray: []
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button title='Add Bill' onPress={() => {
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


    _onComfirm = () => {
        this.setState({
            dateToArray: []
        })
        for (let i = 0; i < this.state.date.length + 1; i++) {
            this.state.dateToArray.push(this.state.date.substring(this.state.date.length - i, this.state.date.length));
        }
        firestore()
            .collection('Bill')
            .doc(this.state.name)
            .set({
                date: this.state.date,
                dateToArray: this.state.dateToArray
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
                    <RenderItemBill ref={'myRender'} />
                </ScrollView>


                <View>
                    <Modal isVisible={this.state.visible} backdropColor={'gray'} backdropOpacity={1} >

                        <TextInput placeholder='Nhập mã đơn hàng' style={{ borderWidth: 1, padding: 5, marginTop: 10 }} placeholderTextColor='cyan' onChangeText={this._name} />
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2020"
                            maxDate="31-12-2020"
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
    top: {
        flexDirection: "row",
        width: screen.width,
        backgroundColor: 'red',
        justifyContent: 'space-around'

    }

})
