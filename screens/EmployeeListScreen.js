import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { DataTable } from 'react-native-paper'

// import _ from 'lodash'
// import sortBy from 'lodash/sortBy'
import orderByLodash from 'lodash/orderBy'

import { useSelector, useDispatch } from 'react-redux'

import api from '../services/api'




function EmployeeListScreen({ navigation }) {

  // Accesing Redux Functions
  function UpdateEmployess(data) {
    return { type: 'UPDATE_EMPLOYEE_LIST', data }
  }
  function setEmployeeIndex(data) {
    return { type: 'SET_EMPLOYEE_INDEX', data }
  }
  function sortByAscDesc(sortBy) {
    return { type: 'SORT_BY', sortBy }
  }
  function orderBy(order) {
    return { type: 'ORDER', order }
  }
  function sortedEmployeesToRedux(sorted) {
    return { type: 'SORTED', sorted }
  }


  // setting data to redux
  const dispatch = useDispatch();

  const updateEmployeeList = (data) => {
    dispatch(UpdateEmployess(data))
  }
  const changeEmployeeIndex = (id) => {
    dispatch(setEmployeeIndex(id))
  }
  const sortTableBy = (headerName) => {
    dispatch(sortByAscDesc(headerName))
  }
  const orderTableBy = (order) => {
    dispatch(orderBy(order))
  }
  const NewSortedArrayEmployees = (sortedEmployees) => {
    dispatch(sortedEmployeesToRedux(sortedEmployees))
  }


  // getting data from redux
  const employeeList = useSelector(state => state.employeeList.data)
  const HeaderSortBy = useSelector(state => state.employeeList.sortBy)
  const orderTable = useSelector(state => state.employeeList.order)
  const sortedArray = useSelector(state => state.employeeList.sorted)


  // on loading 
  useEffect(() => {
    async function loadEmployeeList() {
      const response = await api.get('/Employee')
      updateEmployeeList(response.data)
      NewSortedArrayEmployees(response.data)
    }
    loadEmployeeList()
    // window.alert("updated")
  }, [])


  function EmployeeDetails(id) {
    changeEmployeeIndex(id)
    navigation.navigate('EmployeeDetails')
  }

  function sortTable(headerName) {
    const newOrder = (orderTable == 'descending' && headerName == HeaderSortBy) ? 'ascending' : 'descending'
    const lodashOrderVariable = (newOrder == 'descending' ? 'desc' : 'asc')
    const sortedArray = orderByLodash(employeeList, [headerName], [lodashOrderVariable])

    NewSortedArrayEmployees(sortedArray)
    sortTableBy(headerName)
    orderTableBy(newOrder)
  }


  return (
    <>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              onPress={() => sortTable("Name")}
              sortDirection={HeaderSortBy == "Name" ? orderTable : null}
            >Name</DataTable.Title>

            <DataTable.Title
              onPress={() => sortTable("Position")}
              sortDirection={HeaderSortBy == "Position" ? orderTable : null}
              numeric
            >Position</DataTable.Title>

            <DataTable.Title
              onPress={() => sortTable("Salary")}
              sortDirection={HeaderSortBy == "Salary" ? orderTable : null}
              numeric
            >Salary
            </DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {sortedArray ? sortedArray.map(employee => (
              <DataTable.Row key={employee.EmployeeID} onPress={() => { EmployeeDetails(employee.EmployeeID) }}  >
                <DataTable.Cell>{employee.Name}</DataTable.Cell>
                <DataTable.Cell numeric>{employee.Position}</DataTable.Cell>
                <DataTable.Cell numeric>{employee.Salary}</DataTable.Cell>
              </DataTable.Row>
            ))
              : null
            }
          </ScrollView>
        </DataTable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({


});

EmployeeListScreen.navigationOptions = {
  title: 'Employess',
};




export default EmployeeListScreen