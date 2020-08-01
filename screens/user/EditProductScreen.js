import React, { useEffect, useCallback, useReducer } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/product';
import Input from '../../components/UI/Input';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updateValidities) {
            updatedFormIsValid = updatedFormIsValid && updateValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updateValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

   const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            imageUrl: editProduct ? editProduct.imageUrl : '',
            description: editProduct ? editProduct.description : '',
            price : ''
        },
        inputValidities: {
            title: editProduct ? true : false,
            imageUrl: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,

        },
        formIsValid: editProduct ? true : false,
    });

 


    const submitHandler = useCallback(() => {

        if (!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the errors in the form.', [{
                text: 'Okay'
            }]);
            return;
        }


        if (editProduct) {
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title, 
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);




    useEffect(() => {

        props.navigation.setParams({ submit: submitHandler });

    }, [submitHandler]);



    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
       

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);


    return (
        <KeyboardAvoidingView style={{flex : 1}} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label='Title'
                    errorText='Please enter a valid Title!'
                    keyboardType='default'
                    autoCorrect
                    autoCapitalize="sentences"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.title : ''}
                    initiallyValid={!!editProduct}
                    required
                />
                <Input
                    id='imageUrl'
                    label='Image Url'
                    errorText='Please enter a valid Image!'
                    keyboardType='default'
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.imageUrl : ''}
                    initiallyValid={!!editProduct}
                    required
                />
                {editProduct ? null : <Input
                    id='price'
                    label='Price'
                    errorText='Please enter a valid Price!'
                    keyboardType='decimal-pad'
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                    
                />}
                <Input
                    id='description'
                    label='Description'
                    errorText='Please enter a valid Description!'
                    keyboardType='default'
                    autoCorrect
                    autoCapitalize="sentences"
                    numberOfLines={3}
                    multiline
                    onInputChange={inputChangeHandler}
                    initialValue={editProduct ? editProduct.description : ''}
                    initiallyValid={!!editProduct}
                    required
                    minLength={5}
                />
            </View>

            </ScrollView>
            </KeyboardAvoidingView>


    );
};


EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Save"
                iconName='md-checkmark'
                onPress={submitFn}
            />
        </HeaderButtons>

    };
};

const styles = StyleSheet.create({
    form: {

        margin : 20
    },
   

});

export default EditProductScreen;