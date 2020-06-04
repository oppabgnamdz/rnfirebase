import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';
class Item extends Component {
    render() {
        console.log('nam')

        return (
            <TouchableOpacity>
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
                        <Text style={{ flex: 0.1, textAlign: 'center' }} >{this.props.item.price}</Text>
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
            author: ''

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
    render() {
        return (
            <View style={{ flex: 1, marginTop: 22 }}>
                <FlatList
                    data={this.state.arrFlatList}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => <Item item={item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
