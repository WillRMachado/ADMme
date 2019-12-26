import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import api from '../services/api'

import Colors from '../constants/Colors'


const AddEmployeeScreen = ({navigation}) => {
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
            }).then(window.alert("Registered!"))
        await navigation.navigate('EmployeeList')
    }


    return (
        <>
            <View style={styles.addEmployeeForm}>
                <Text style={styles.addEmployeeFieldTitle}>Name</Text>
                <TextInput
                    style={styles.addEmployeeInput}
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholder='New Employee`s Name'
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={name => setName(name)}
                />

                <Text style={styles.addEmployeeFieldTitle}>Position</Text>
                <TextInput
                    style={styles.addEmployeeInput}
                    autoCapitalize="sentences"
                    placeholder='New Employee`s Position'
                    placeholderTextColor="#999"
                    value={position}
                    onChangeText={position => setPosition(position)}
                />
                <Text style={styles.addEmployeeFieldTitle}>Age</Text>
                <TextInput
                    style={styles.addEmployeeInput}
                    keyboardType="numeric"
                    placeholder='New Employee`s Age'
                    placeholderTextColor="#999"
                    value={age}
                    onChangeText={age => setAge(age)}
                />
                <Text style={styles.addEmployeeFieldTitle}>Salary</Text>
                <TextInput
                    style={styles.addEmployeeInput}
                    keyboardType="numeric"
                    placeholder='New Employee`s Salary'
                    placeholderTextColor="#999"
                    value={salary}
                    onChangeText={salary => setSalary(salary)}
                />

                <TouchableOpacity onPress={registerNewEmployee} style={styles.addEmployeeButton}>
                    <Text style={styles.ButtonText}>Cadastrar!</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    addEmployeeForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30
    },

    addEmployeeInput: {
        // backgroundColor:'red'
        marginBottom: 20
    },

    addEmployeeButton: {
        // backgroundColor:'red'
        marginTop: 10,
        height: 42,
        backgroundColor: Colors.tertiaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        padding: 20,

    },

    ButtonText: {
        color: Colors.primaryColor,
        fontSize: 24
    },
    addEmployeeInput:{
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 20,
        minWidth: 100,
        textAlign: 'center',
        borderColor: Colors.tertiaryColor,
        color: Colors.secondaryColor,
    },

    addEmployeeFieldTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
        color: Colors.primaryColor,
    }




});


AddEmployeeScreen.navigationOptions = {
    title: `Add a New Employee`,
};

export default AddEmployeeScreen