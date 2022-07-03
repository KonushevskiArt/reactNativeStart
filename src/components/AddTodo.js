import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss()
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
      <AntDesign.Button name='pluscircleo' onPress={pressHandler}>
        Add
      </AntDesign.Button>
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
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  button: {
    width: '30%',
  },
})
