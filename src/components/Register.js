/**refatorar as telas de cadastro */
import React, { Component } from "react";

initialState = { ...props };
export default class Register extends Component {
    state = { ...initialState };
    render() {
        return (
            <>
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
            </>
        );
    }
}
