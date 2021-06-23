import { Alert } from "react-native";

const server = "http://api-test.bhut.com.br:3000/api";
function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert(
            "Oops! There was a problem!",
            `Message: ${err.response.data}`
        );
    } else {
        Alert.alert("Oops! There was a problem!", `Message: ${err}`);
    }
}

export { server, showError };
