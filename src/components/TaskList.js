import React, { Component } from "react";
import Task from "./Task";

class TaskList extends Component {
  state = {
    sort: "name"
  };
  handleSelect = e => {
    this.setState({
      sort: e.target.value
    });
  };

  render() {
    const active = this.props.tasks.filter(task => task.active);
    const done = this.props.tasks.filter(task => !task.active);
    if (done.length >= 2) {
      done.sort((a, b) => b.finishDate - a.finishDate);
    }

    if (active.length >= 2 && this.state.sort === "name") {
      active.sort((a, b) => {
        a = a.text.toLowerCase();
        b = b.text.toLowerCase();

        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
    } else if (active.length >= 2 && this.state.sort === "date") {
      active.sort((a, b) => {
        const aYear = a.date.slice(0, 4);
        const bYear = b.date.slice(0, 4);
        if (aYear < bYear) return -1;
        else if (aYear > bYear) return 1;
        else if (aYear === bYear) {
          const aMonth = a.date.slice(5, 7);
          const bMonth = b.date.slice(5, 7);
          if (aMonth < bMonth) return -1;
          else if (aMonth > bMonth) return 1;
          else if (aMonth === bMonth) {
            const aDay = a.date.slice(8, 10);
            const bDay = b.date.slice(8, 10);
            if (aDay < bDay) return -1;
            else if (aDay > bDay) return 1;
          }
        }
        return 0;
      });
    }

    const activeTasks = active.map(task => (
      <Task
        key={task.id}
        task={task}
        delete={this.props.delete}
        change={this.props.change}
      />
    ));
    const doneTasks = done.map(task => (
      <Task
        key={task.id}
        task={task}
        delete={this.props.delete}
        change={this.props.change}
      />
    ));
    return (
      <>
        <div className="active">
          <h1>
            Zadania do zrobienia<em>({active.length})</em>
          </h1>
          {active.length > 1 ? (
            <>
              <label htmlFor="sort">Sortuj według: </label>
              <select
                id="sort"
                value={this.state.sort}
                onChange={this.handleSelect}
              >
                <option value="name" checked>
                  Nazwa
                </option>
                <option value="date">Data</option>
              </select>
            </>
          ) : null}

          {activeTasks.length > 0 ? (
            activeTasks
          ) : (
            <p>Brak zadań do zrobienia</p>
          )}
        </div>

        <div className="done">
          <h2>
            Zadania zrobione<em>({done.length})</em>
          </h2>
          {doneTasks}
        </div>
      </>
    );
  }
}

export default TaskList;
