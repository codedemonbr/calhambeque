import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

import commonStyles from "../commonStyles";

export default (props) => {
    return (
        <Swipeable>
            <View style={styles.container}>
                <View>
                    <Text>{props._id}</Text>
                    <Text style={styles.info}>{props.brand}</Text>
                    <Text style={styles.info}>{props.title}</Text>
                    <Text style={styles.info}>{props.price}</Text>
                    <Text style={styles.info}>{props.age}</Text>
                </View>
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
        backgroundColor: "white",
    },
    info: {
        color: commonStyles.colors.mainText,
        fontSize: 16,
    },
});
