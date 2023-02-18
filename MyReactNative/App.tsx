import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = (goalTitle) => {
        setCourseGoals(currentGoals => [...currentGoals, {id: Math.random().toString(), value: goalTitle}]);
        setIsAddMode(false);
    };

    const removeGoalHandler = (id) => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== id);
        })
    };

    const cancelGoalHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <Button title="Add new goal"
                    onPress={() => setIsAddMode(true)}/>
            <GoalInput visible={isAddMode}
                       onAddGoals={addGoalHandler}
                       onCancel={cancelGoalHandler}/>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={courseGoals}
                renderItem={itemData => (
                    <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>
                )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screen: {
        padding: 50
    }
});
