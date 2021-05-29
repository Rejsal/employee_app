import { Alert } from 'react-native'

//alert
export function showAlert(msg) {
    Alert.alert(
        '',
        msg,
        [
            { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false },
    );
}