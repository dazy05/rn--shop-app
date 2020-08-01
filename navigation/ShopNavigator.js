import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import React from 'react';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScree from '../screens/user/UserProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

};

const ProductNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen

}, {    
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name='md-cart'
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen

}, {
        navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
                name='md-list'
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions

});

const AdminNavigator = createStackNavigator({

    Userproducts: UserProductScreen,
    EditProduct: EditProductScreen

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name='md-create'
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavOptions

});


const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator

}, {
        contentOptions: {
            activeTintColor: Colors.primary

    }

});




export default createAppContainer(ShopNavigator);