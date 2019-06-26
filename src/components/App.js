import React, { Component } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./App.css";

class App extends Component {
  counter = 0;
  state = {
    tasks: []
  };

  deleteTask = id => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(task => task.id !== id);
    this.setState({ tasks });
  };
  changeStatus = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
    });
    this.setState({ tasks });
  };
  addTask = (text, date, important) => {
    const task = {
      id: this.counter,
      text: text,
      date: date,
      important: important,
      active: true,
      finishDate: null
    };
    this.counter++;
    this.setState({
      tasks: [...this.state.tasks, task]
    });
    return true;
  };
  componentWillMount() {
    const tasks = localStorage.getItem("tasks");
    this.setState({
      tasks: JSON.parse(tasks)
    });
  }
  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">Todo App</h1>
        <AddTask addTask={this.addTask} />
        <TaskList
          tasks={this.state.tasks}
          delete={this.deleteTask}
          change={this.changeStatus}
        />
      </div>
    );
  }
}

export default App;
