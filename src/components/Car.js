import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
const Icon = FontAwesome;

import commonStyles from "../commonStyles";

export default (props) => {
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon
                    name="trash"
                    size={20}
                    color="white"
                    style={styles.excludeIcon}
                />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    };

    return (
        <Swipeable
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() =>
                props.onDelete && props.onDelete(props._id)
            }
        >
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={styles.info}>Marca: {props.brand}</Text>
                    <Text style={styles.info}>Modelo: {props.title}</Text>
                    <Text style={styles.info}>Preço: {props.price}</Text>
                    <Text style={styles.info}>Ano: {props.age}</Text>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    info: {
        color: commonStyles.colors.mainText,
        fontSize: 16,
    },
    left: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        color: "white",
        fontSize: 20,
        margin: 10,
    },
});
