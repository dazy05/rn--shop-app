import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Button, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/product';
import { isLoaded } from 'expo-font';

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error,setError] = useState();
    const dispatch = useDispatch();


    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoaded(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }


        setIsLoaded(false);
    }, [dispatch, setIsLoaded, setError]);


    useEffect(() => {
        const willFocusSub = props.navigation.addListener('will Focus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();

    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: id,
                productTitle: title
            },

        );
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="Try Again" onPress={loadProducts} color={Colors.primary} />
            </View>
        );
    }

    if (isLoaded) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (!isLoaded && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Data Found. May be start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                  
                >
                    <Button color={Colors.primary} title="View Details" onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }} />
                    <Button color={Colors.primary} title="To Cart" onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }} />
                </ProductItem>

            )}
        />
    );
};


ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products!',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName='md-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>),

        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName='md-cart'
                onPress={() => {
                    navData.navigation.navigate('Cart');
                }}
            />
        </HeaderButtons>



    };
};


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default ProductOverviewScreen;