import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

const EmployeeCard = (props) => {
    const { item = {} } = props
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            props.onClickCard(item)
        }}>
            <View style={styles.subContainer}>
                {item.image ? <Image style={styles.imageContainer} source={{ uri: item.image }} /> : <View style={[styles.imageContainer, styles.alignCenter]}><Image style={styles.icon} source={require('../../assets/error.png')} /></View>}
                <View style={styles.rightContainer}>
                    <Text style={styles.heading}>{item.name ? item.name : ''}</Text>
                    <Text style={styles.content}>{item.company && item.company.name ? item.company.name : ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#990000',
        borderRadius: 6
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightContainer: {
        marginStart: 16,
        flex: 1
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 6,
        backgroundColor: 'grey'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 2
    },
    content: {
        fontSize: 14,
        fontWeight: '300'
    }
})

export default EmployeeCard