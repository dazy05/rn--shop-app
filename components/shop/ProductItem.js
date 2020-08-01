import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Card from '../UI/Card';



const ProductItem = props => {
    let Touchablecomp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (

        <Card style={styles.product}>
            <View style={styles.touchable}>
                <Touchablecomp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>

                        <View style={styles.actions}>
                            {props.children}



                        </View>
                    </View>
                </Touchablecomp>
            </View>
        </Card>


    );
};

const styles = StyleSheet.create({
    product: {
        
        height: 300,
        margin: 20,
        //overflow: 'hidden'

    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        alignItems: "center",
        height: '15%'
    },
    image: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 25

    }
});

export default ProductItem;