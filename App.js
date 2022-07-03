import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { THEME } from './src/theme';

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [todos, setTodos] = useState([
    {id: '1', title: 'Go to the job'},
    // {id: '2', title: 'Get good salary'},
  ]);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadApp();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Navbar title='Todo App!'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
