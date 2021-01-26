import {Text, StyleSheet} from "react-native";

class TitleComponent extends Text {
    render() {
        return (
            <Text style={styles.title}>

            </Text>
          );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#184254',
        fontFamily: 'Rubik',
        fontWeight: 500,
    }
})

export default TitleComponent;