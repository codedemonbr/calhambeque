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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
const Icon = FontAwesome;

//Our components
import Car from "../components/Car";
import CarEditor from "./CarEditor";
import { server, showError } from "../common";

//Assets
import carImg from "../../assets/imgs/amazingCar.jpg";
import commonStyles from "../commonStyles";

const initialState = {
    _id: "",
    brand: "",
    title: "",
    price: "",
    age: "",
    showEditor: false,
    needRefresh: false,
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
            const stack = res.data.reverse();
            this.setState({ cars: stack });
        } catch (e) {
            showError(e);
        }
    };

    loadCar = async () => {};

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
                <CarEditor
                    isVisible={this.state.showEditor}
                    {...this.state}
                    onCancel={() => this.setState({ showEditor: false })}
                    onSave={() => this.setState({ showEditor: false })}
                />
                {/* 3/10 */}
                <ImageBackground
                    source={this.getImage()}
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.loadCars}>
                            <Icon
                                name="refresh"
                                size={20}
                                color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Star Garage</Text>
                        <Text style={styles.subtitle}>Amazing cars</Text>
                    </View>
                </ImageBackground>
                {/* 7/10 */}
                <View style={styles.carList}>
                    <FlatList
                        data={this.state.cars}
                        keyExtractor={(item) => `${item._id}`}
                        renderItem={({ item }) => (
                            <Car
                                {...item}
                                onDelete={this.deleteCar}
                                onEdit={() =>
                                    this.setState({
                                        showEditor: true,
                                        _id: item._id,
                                        title: item.title,
                                        brand: item.brand,
                                        price: item.price,
                                        age: item.age,
                                    })
                                }
                            />
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.addButton]}
                    activeOpacity={0.7}
                    onPress={() =>
                        this.props.navigation.navigate("CarRegister")
                    }
                >
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
    titleBar: {
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
        marginTop: Platform.OS === "ios" ? 40 : 20,
    },
});
