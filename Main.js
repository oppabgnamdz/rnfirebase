import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity, Button } from 'react-native'
const maxwidth = Dimensions.get('window').width;
export default class Main extends Component {
    constructor(params) {
        super(params)
    }
    _onPressUser = () => {
        this.props.navigation.navigate('User')
    }
    _onPressCategory = () => {
        this.props.navigation.navigate('Category')
    }
    _onPressBook = () => {
        this.props.navigation.navigate('Book')
    }
    _onPressBill = () => {
        this.props.navigation.navigate('Bill')
    }
    _onPressBestSale = () => {
        this.props.navigation.navigate('Best_sale')
    }
    _onPressStatistic = () => {
        this.props.navigation.navigate('Statistic')
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button title='Log out' onPress={() => {
                    this.props.navigation.navigate('Login')
                }} />
            ),

        })

    }


    render() {
        console.log(maxwidth)
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._onPressUser}>
                        <Image source={require('./images/usericon.png')} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressCategory}>
                        <Image source={require('./images/categoryicon.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._onPressBook}>
                        <Image source={require('./images/bookicon.png')} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressBill}>
                        <Image source={require('./images/billicon.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._onPressBestSale}>
                        <Image source={require('./images/best_saleicon.png')} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressStatistic}>
                        <Image source={require('./images/statisticicon.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'

    },
    row: {
        width: maxwidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    img: {
        width: maxwidth / 4,
        height: maxwidth / 4
    }

})
