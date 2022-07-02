import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    } else {
      Alert.alert("Name of todo can not be empty !")
    }
  }

  return (
    <View style={styles.block}>
      <TextInput 
        onChangeText={setValue} 
        style={styles.input} 
        value={value}
        placeholder='Input name of the deal'
        autoCorrect={false}
        autoCapitalize="none"
        // keyboardType='number-pad'
      />
      <Button onPress={pressHandler} style={styles.button} title='Add' />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  button: {
    width: '30%',
  },
})
