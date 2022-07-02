import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todos, setTodos] = useState([
    {id: '1', title: 'Go to the job'},
    // {id: '2', title: 'Get good salary'},
  ]);
  const [todoId, setTodoId] = useState(null);

  const addTodo = (title) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if(todo.id === id) {
        todo.title = title;
      }
      return todo;
    }))
  }

  const removeTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    Alert.alert(
      "Removing element",
      `Are you sure that you want to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(el => el.id !== id))
          },
          style: "destructive",
        },
      ],
      {
        cancelable: false,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }

  let content = (
    <MainScreen  todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId}/>
  )

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
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
