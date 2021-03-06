import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
  const width = Dimensions.get('window').width + THEME.PADDING_HORIZONTAL * 2;
  const [deviceWidth, setDeviceWidth] = useState(width);
  
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width + THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width)
    }

    const test = Dimensions.addEventListener('change', update)
    return () => {
      test.remove() 
    }
  })
  
  let content = (
    <View style={{ deviceWidth }}>
      <FlatList 
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}, index, separators) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} /> }
      />
    </View>
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image style={styles.image} source={require('../../assets/no-items.png')}/>
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
    paddingTop: 10,

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
})

