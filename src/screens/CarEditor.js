import React, { Component } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import axios from "axios";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { showError, showSuccess, server } from "../common";
import commonStyles from "../commonStyles";
import backgroundImage from "../../assets/imgs/carsMainPage.jpg";
import CarInput from "../components/CarInput";

const initialState = {
    _id: "60d4ea54f8037d001c59e067",
    title: "",
    brand: "",
    price: "",
    age: "",
};

export default class CarRegister extends Component {
    state = { ...initialState };

    getCar = async () => {
        try {
            const res = await axios.get(`${server}/cars/${this.state._id}`);
            const data = res.data;
            data.age = res.data.age.toString();
            this.setState({ ...data });
        } catch (err) {
            console.log(err);
            showError(err);
        }
    };

    updateCar = async () => {
        try {
            const res = await axios.put(`${server}/cars/${this.state._id}`, {
                title: this.state.title.trim(),
                brand: this.state.brand.trim(),
                price: this.state.price.trim(),
                age: this.state.age,
            });
            showSuccess("Car Updated!");
        } catch (err) {
            showError(err);
        }
    };

    render() {
        const validations = [];
        validations.push(this.state.age && this.state.age.length >= 4);
        const validForm = validations.reduce((t, a) => t && a);
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Star Garage</Text>
                <View style={styles.formContainer}>
                    <CarInput
                        icon="tags"
                        placeholder="id"
                        value={this.state._id}
                        style={styles.input}
                        onChangeText={(_id) => {
                            this.setState({ _id });
                        }}
                    />
                    <CarInput
                        icon="car"
                        placeholder="Model"
                        value={this.state.title}
                        style={styles.input}
                        onChangeText={(title) => this.setState({ title })}
                    />
                    <CarInput
                        icon="trademark"
                        placeholder="Brand"
                        value={this.state.brand}
                        style={styles.input}
                        onChangeText={(brand) => this.setState({ brand })}
                    />
                    <CarInput
                        icon="money"
                        placeholder="Price"
                        value={this.state.price}
                        style={styles.input}
                        onChangeText={(price) => this.setState({ price })}
                    />
                    <CarInput
                        icon="calendar"
                        placeholder="Year"
                        value={this.state.age}
                        style={styles.input}
                        onChangeText={(age) => this.setState({ age })}
                    />
                    <TouchableOpacity
                        onPress={this.updateCar}
                        disabled={!validForm}
                    >
                        <View
                            style={[
                                styles.button,
                                validForm ? {} : { backgroundColor: "#AAA" },
                            ]}
                        >
                            <Text style={styles.buttonText}>Update </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.getCar}>
                        <View style={[styles.button]}>
                            <Text style={styles.buttonText}>Load Car</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        width: "90%",
        borderRadius: 20,
    },
    input: {
        marginTop: 10,
        backgroundColor: "#FFF",
    },
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 25,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
});
