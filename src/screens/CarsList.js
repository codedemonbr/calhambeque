import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
const Icon = FontAwesome;

//Our components
import Car from "../components/Car";
import { server, showError } from "../common";

//Assets
import carImg from "../../assets/imgs/cars.jpg";
import commonStyles from "../commonStyles";

const initialState = {
    cars: [],
};

export default class CarList extends Component {
    state = { ...initialState };

    componentDidMount() {
        this.loadCars();
    }

    loadCars = async () => {
        try {
            const res = await axios.get(`${server}/cars`);
            this.setState({ cars: res.data });
        } catch (e) {
            showError(e);
        }
    };

    deleteCar = async (carId) => {
        try {
            await axios.delete(`${server}/cars/${carId}`);
            this.loadCars();
        } catch (e) {
            showerror(e);
        }
    };

    getImage = () => {
        return carImg;
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar />
                {/* 3/10 */}
                <ImageBackground
                    source={this.getImage()}
                    style={styles.background}
                ></ImageBackground>
                {/* 7/10 */}
                <View style={styles.carList}>
                    <FlatList
                        data={this.state.cars}
                        keyExtractor={(item) => `${item._id}`}
                        renderItem={({ item }) => (
                            <Car {...item} onDelete={this.deleteCar} />
                        )}
                    />
                </View>
                <TouchableOpacity style={[styles.addButton]} activeOpacity={0.7} onPress={()=> this.setState()}>
                    <Icon
                        name="plus"
                        size={20}
                        color={commonStyles.colors.secondary}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carList: {
        flex: 7,
    },
    background: {
        flex: 3,
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#173",
    },
});
