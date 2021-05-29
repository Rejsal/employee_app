import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import EmployeeCard from '../../components/employee';
import { useNavigation } from '@react-navigation/native';

function Employee() {
    const { employee: employeeModel } = useSelector(({ employee }) => {
        return {
            employee
        }
    })
    const { employee: employeeDispatch } = useDispatch(({ employee }) => {
        return {
            employee
        }
    })

    const { getEmployees, getEmployee, searchEmployees } = employeeDispatch

    const navigation = useNavigation();

    useEffect(() => {
        getEmployees()
    }, []);

    function _renderHeader() {
        return (
            <View style={styles.listHeader} />
        )
    }

    const { loading = false, employees = [] } = employeeModel
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Employees</Text>
                <TextInput style={styles.inputContainer} placeholder={'Search'} onChangeText={(text) => {
                    searchEmployees(text)
                }} />
                {loading ? <View style={styles.loaderContainer}><ActivityIndicator size={'large'} /></View> :
                    employees.length > 0 ? <FlatList
                        showsVerticalScrollIndicator={false}
                        data={employees}
                        keyExtractor={(item) => item.id.toString()}
                        ListHeaderComponent={_renderHeader}
                        renderItem={({ item }) => <EmployeeCard item={item} onClickCard={async (data) => {
                            await getEmployee(data)
                            navigation.navigate('ViewEmployee')
                        }} />}
                    /> : <View style={styles.loaderContainer}>
                        <Text>No data to display</Text>
                    </View>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    subContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff'
    },
    listHeader: {
        height: 16
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: '#990000',
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom:10
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#990000',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 8
    },

})

export default Employee;