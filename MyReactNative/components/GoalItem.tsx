import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const GoalItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.lisItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    lisItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    }
});

export default GoalItem;
