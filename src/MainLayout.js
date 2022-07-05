import React, {useState, useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
  // const [todos, setTodos] = useState([{id: '1', title: 'Go to the job'}]);
  const [todoId, setTodoId] = useState(null);

  let content = (
    <MainScreen  
      todos={todos} 
      addTodo={addTodo} 
      removeTodo={removeTodo} 
      openTodo={setTodoId}
    />
  )

  // const updateTodo = (id, title) => {
  //   setTodos(old => old.map(todo => {
  //     if(todo.id === id) {
  //       todo.title = title;
  //     }
  //     return todo;
  //   }))
  // }

  // const removeTodo = (id) => {
  //   const todo = todos.find(t => t.id === id);
  //   Alert.alert(
  //     "Removing element",
  //     `Are you sure that you want to delete "${todo.title}"?`,
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Remove",
  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos(prev => prev.filter(el => el.id !== id))
  //         },
  //         style: "destructive",
  //       },
  //     ],
  //     {
  //       cancelable: false,
  //       onDismiss: () =>
  //         Alert.alert(
  //           "This alert was dismissed by tapping outside of the alert dialog."
  //         ),
  //     }
  //   );
  // }

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen 
        onRemove={removeTodo} 
        todo={selectedTodo} 
        goBack={() => setTodoId(null)}
        onSave={updateTodo}
      />
    )
      
  }

  return (
    <View>
      <Navbar title='Todo App!'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});