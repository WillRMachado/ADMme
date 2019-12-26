import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import api from '../services/api'



const AddEmployeeScreen = () => {
    //I`m not passing this values to any other page or component, therefore
    //got the opportunity ti build an useState example
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [age, setAge] = useState('')
    const [salary, setSalary] = useState('')

    async function registerNewEmployee() {

        await api.post('/Employee',
            {
                "Name": name,//estado.nome
                "Position": position,//estado.pos
                "Age": age,//estado.idade
                "Salary": salary, //estado.salario
            })
    }


    return (
        <>
            <View style={styles.addEmployeeForm}>
                <Text>Name</Text>
                <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholder='New Employee`s Name'
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={name => setName(name)}
                />

                <Text>Position</Text>
                <TextInput
                    autoCapitalize="sentences"
                    placeholder='New Employee`s Position'
                    placeholderTextColor="#999"
                    value={position}
                    onChangeText={position => setPosition(position)}
                />
                <Text>Age</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder='New Employee`s Age'
                    placeholderTextColor="#999"
                    value={age}
                    onChangeText={age => setAge(age)}
                />
                <Text>Salary</Text>
                <TextInput
                    keyboardType="numeric"
                    placeholder='New Employee`s Salary'
                    placeholderTextColor="#999"
                    value={salary}
                    onChangeText={salary => setSalary(salary)}
                />

            </View>
            <TouchableOpacity onPress={registerNewEmployee}><Text>Cadastrar!</Text></TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    addEmployeeForm: {
        // backgroundColor:'red'
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -200
        
    }

});


AddEmployeeScreen.navigationOptions = {
    title: `Add a New Employee`,
};

export default AddEmployeeScreen