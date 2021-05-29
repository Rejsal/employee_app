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
                {employee.email?<Text style={styles.contentTitle}>Email: <Text style={styles.content}>{employee.email}</Text></Text>:null}
                {employee.username?<Text style={styles.contentTitle}>Username: <Text style={styles.content}>{employee.username}</Text></Text>:null}
                {employee.website?<Text style={styles.contentTitle}>Website: <Text style={styles.content}>{employee.website}</Text></Text>:null}
                {employee.address?<Text style={styles.contentTitle}>Address: <Text style={styles.content}>{`${employee.address.street}, ${employee.address.city?employee.address.city:''}`}</Text></Text>:null}
                {employee.company?<Text style={styles.contentTitle}>Company Details: <Text style={styles.content}>{`${employee.company.name}, ${employee.company.bs?employee.company.bs:''}`}</Text></Text>:null}
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
    contentTitle: {
        color: 'grey',
        fontSize: 16,
        marginTop: 2
    },
    content: {
        color: '#000000',
        fontSize: 16
    }
})

export default ViewEmployee;