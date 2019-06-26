import React, { Component } from "react";
import "./AddTask.css";
class AddTask extends Component {
  minDate = new Date().toISOString().slice(0, 10);
  state = {
    text: "",
    checked: false,
    date: this.minDate
  };
  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };
  handleText = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleCheckbox = e => {
    this.setState({
      checked: e.target.checked
    });
  };
  handleClick = () => {
    const { text, checked, date } = this.state;
    if (text.length > 2) {
      const add = this.props.addTask(text, date, checked);
      if (add) {
        this.setState({
          text: "",
          checked: false,
          date: this.minDate
        });
      }
    } else {
      alert("Za krótka nazwa");
    }
  };

  render() {
    let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + "-12-31";
    return (
      <div className="form">
        <input
          type="text"
          placeholder="dodaj zadanie"
          value={this.state.text}
          onChange={this.handleText}
        />
        <input
          id="important"
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleCheckbox}
        />
        <label htmlFor="important">Priorytet</label>
        <br />
        <label htmlFor="date">Do kiedy zrobić</label>
        <input
          id="date"
          type="date"
          value={this.state.date}
          min={this.minDate}
          max={maxDate}
          onChange={this.handleDate}
        />{" "}
        <br />
        <button onClick={this.handleClick}>Dodaj</button>
      </div>
    );
  }
}

export default AddTask;
