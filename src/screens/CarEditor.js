import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import axios from "axios";
import { showError, showSuccess, server } from "../common";
import commonStyles from "../commonStyles";
import CarInput from "../components/CarInput";

const initialState = {
    _id: "",
    brand: "",
    title: "",
    price: "",
    age: "",
};
export default class CarRegister extends Component {
    state = { ...initialState };

    

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

    updateStateByProps = (prevProps) => {
        try {
            for (let key in this.props) {
                if (prevProps[key] !== this.props[key]) {
                    if (this.state[key] !== this.props[key]) {
                        this.setState({
                            [key]: this.props[key],
                        });
                    }
                }
            }
        } catch (e) {
            console.error(e.message);
        }
    };
    componentDidUpdate(prevProps) {
        this.updateStateByProps(prevProps);
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide"
            >
                <View style={styles.modalCentral}>
                    <View style={styles.formContainer}>
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
                            value={this.state.age.toString()}
                            style={styles.input}
                            onChangeText={(age) => this.setState({ age })}
                        />
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.updateCar();
                                    this.props.onSave();
                                }}
                            >
                                <View style={[styles.button]}>
                                    <Text style={styles.buttonText}>
                                        Update
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <View
                                    style={[
                                        styles.button,
                                        { backgroundColor: "#B33" },
                                    ]}
                                >
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
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
        justifyContent: "center",
        borderRadius: 25,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    modalCentral: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
