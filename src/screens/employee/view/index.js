import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

function ViewEmployee() {

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

    const { getEmployee } = employeeDispatch

    const navigation = useNavigation();

    const { employee = {} } = employeeModel;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={styles.titleView}>
                    <TouchableOpacity onPress={()=> {
                        navigation.goBack()
                    }}>
                        <Image style={styles.imageStyle} source={require('../../../assets/arrow.png')}/>
                    </TouchableOpacity>
                <Text style={styles.heading}>{employee.name ? employee.name : ''}</Text>               
                </View>
                <View style={{marginTop:20}}>
                <Text style={styles.content}>{employee.email ? employee.email : ''}</Text>
                <Text style={styles.content}>{employee.address ? employee.address.city : ''}</Text>
                <Text style={styles.content}>{employee.website ? employee.address.website : ''}</Text>
                <Text style={styles.content}>{employee.company ? employee.company.name : ''}</Text>
                </View>
            </ScrollView>
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
    titleView: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageStyle: {
        height: 20,
        width:20,
        resizeMode:'contain'
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
        fontWeight: 'bold'
    },

    content: {
        color: '#000000',
        fontSize: 16,
    }
})

export default ViewEmployee;