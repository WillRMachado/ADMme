import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import api from '../services/api'

import Colors from '../constants/Colors'

const EmployeeDetailsScreen = ({ navigation }) => {

    // Accesing Redux Functions
    function UpdateEmployess(data) {
        return { type: 'UPDATE_EMPLOYEE_LIST', data }
    }
    function setEmployeeIndex(data) {
        return { type: 'SET_EMPLOYEE_INDEX', data }
    }
    function sortedEmployeesToRedux(sorted) {
        return { type: 'SORTED', sorted }
    }

    // setting data to redux
    const dispatch = useDispatch();

    const updateEmployeeList = (data) => {
        dispatch(UpdateEmployess(data))
    }
    const NewSortedArrayEmployees = (sortedEmployees) => {
        dispatch(sortedEmployeesToRedux(sortedEmployees))
    }
    const changeEmployeeIndex = (data) => {
        dispatch(setEmployeeIndex(data))
    }

    // getting data from redux
    const DetailedEmployeeId = useSelector(state => state.employeeDetails.data)
    const employeeList = useSelector(state => state.employeeList.data)

    //called on loading, when updating, and when editing an user
    async function loadEmployeeList() {
        const response = await api.get('/Employee')
        updateEmployeeList(response.data)
        NewSortedArrayEmployees(response.data)
    }

    // on loading 
    useEffect(() => {
        loadEmployeeList()
        // console.log(employeeList)
    }, [])

    //load 1st user from database if no user is specified
    if (DetailedEmployeeId === null && employeeList.length > 0) {
        changeEmployeeIndex(employeeList[0].EmployeeID)
    }

    //getting only the needed info from the users list
    const DetailedEmployeeInfo = (employeeList.length > 0) ? employeeList.find(req => req.EmployeeID == DetailedEmployeeId) : { Age: "", Name: "", Position: "", Salary: "" }


    //making fields editable
    const detailedEmployeeIndexInList = employeeList.findIndex((obj => obj.EmployeeID == DetailedEmployeeId))
    function updateInfo(field, newValue) {
        let newEmployeeList = employeeList
        newEmployeeList[detailedEmployeeIndexInList][field] = newValue//part of state that needs change
        //Im working with redux through references, i need to "force" an object change in order to force an update
        updateEmployeeList([])
        updateEmployeeList(newEmployeeList)
    }

    //edit buttton
    async function handleEdit() {
        // window.alert(DetailedEmployeeId)
        await api.put(`/Employee/${DetailedEmployeeId}`, DetailedEmployeeInfo)
            .then(window.alert("Edited!"))
            .then(loadEmployeeList())
        await navigation.navigate('EmployeeList')
    }


    //delete button
    function handleDelete() {
        // window.alert(DetailedEmployeeId)
        Alert.alert(
            'Are you sure?',
            `Are you sure you want to remove ${DetailedEmployeeInfo.Name} from database?`,
            [
                { text: 'Cancel' },
                {},
                { text: 'OK', onPress: () => deleteUser() },
            ],
            { cancelable: true },
        );
    }

    // function to delete an user from database, after button delete and confirmation
    async function deleteUser() {
        await api.delete(`/Employee/${DetailedEmployeeId}`)
            .then(window.alert("Deleted!"))
            .then(loadEmployeeList())
        await navigation.navigate('EmployeeList')
    }

    return (
        <View style={styles.smallInfoContainer}>
            <View style={styles.EmployeeInfo}>

                <View style={styles.EmployeeInfoBox}>
                    <Text style={styles.Title}>Name:</Text>
                    <TextInput
                        style={styles.Content}
                        value={`${DetailedEmployeeInfo ? DetailedEmployeeInfo.Name : null}`}
                        onChangeText={(value) => { updateInfo("Name", value) }}
                    />
                </View>

                <View style={styles.EmployeeInfoBox}>
                    <Text style={styles.Title}>Age:</Text>
                    <TextInput
                        style={styles.Content}
                        keyboardType="numeric"
                        value={DetailedEmployeeInfo ? String(DetailedEmployeeInfo.Age) : null}
                        onChangeText={(value) => { updateInfo("Age", value) }}
                    />
                </View>

                <View style={styles.EmployeeInfoBox}>
                    <Text style={styles.Title}>Position:</Text>
                    <TextInput
                        style={styles.Content}
                        value={DetailedEmployeeInfo ? DetailedEmployeeInfo.Position : null}
                        onChangeText={(value) => { updateInfo("Position", value) }}
                    />
                </View>

                <View style={styles.EmployeeInfoBox}>
                    <Text style={styles.Title}>Salary:</Text>
                    <TextInput
                        style={styles.Content}
                        keyboardType="numeric"
                        value={DetailedEmployeeInfo ? String(DetailedEmployeeInfo.Salary) : null}
                        onChangeText={(value) => { updateInfo("Salary", value) }}
                    />
                </View>

            </View>
            <View style={styles.ButtonsBox}>
                <View style={styles.EachButton}>
                    <TouchableOpacity style={[styles.Button, styles.Edit]} onPress={handleEdit}>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.EachButton}>
                    <TouchableOpacity style={[styles.Button, styles.Delete]} onPress={handleDelete}>
                        <Text style={styles.ButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    smallInfoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100
    },

    EmployeeInfo: {
        flexDirection: 'row',
        marginBottom: 64,
        flexWrap: 'wrap'
    },

    EmployeeInfoBox: {
        alignItems: 'center',
        width: '50%'
    },

    Title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
        color: Colors.primaryColor,

    },
    Content: {
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


    ButtonsBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },

    EachButton: {
        alignItems: 'center',
        width: '50%',
    },

    Button: {
        height: 42,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,

    },

    Edit:{
        backgroundColor:Colors.tertiaryColor
    },

    Delete:{
        backgroundColor:Colors.cancel
    },

    ButtonText: {
        color: Colors.primaryColor,
        fontSize: 24
    }





})

EmployeeDetailsScreen.navigationOptions = {
    title: `Details`,
};


export default EmployeeDetailsScreen
