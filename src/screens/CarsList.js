import React, { Component } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { server, showError } from "../common";

import Car from "../components/Car";

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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.carList}>
                    <FlatList
                        data={this.state.cars}
                        keyExtractor={(item) => `${item._id}`}
                        renderItem={({ item }) => (
                            <Car
                                {...item}
                                onToggleTask={this.toggleTask}
                                onDelete={this.deleteTask}
                            />
                        )}
                    />
                </View>
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
});
