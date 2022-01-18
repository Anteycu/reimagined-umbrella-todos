import React, { Component } from 'react';
import Container from './components/Container/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';

class App extends Component {
  state = {
    todos: [
      { id: 'id-1', text: 'Learn basic of React', completed: true },
      { id: 'id-2', text: 'Learn react-router', completed: false },
      { id: 'id-3', text: 'Survive on Redux', completed: false },
      { id: 'id-4', text: 'Learn hooks', completed: false },
    ],
    filter: '',
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    console.log(todoId);

    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calcCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  calcUncompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (!todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;

    return (
      <Container>
        <div>
          <p>Sum of todos: {totalTodoCount}</p>
          <p>Sum of completed todos:{this.calcCompletedTodos()}</p>
          <p>Sum of uncompleted todos:{this.calcUncompletedTodos()}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={this.getVisibleTodos()}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
