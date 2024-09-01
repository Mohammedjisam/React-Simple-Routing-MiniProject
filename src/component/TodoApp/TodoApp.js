import React, { Component } from 'react';
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: null // Added to keep track of the item being edited
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input, items, editIndex } = this.state;

    if (input !== "") {
      if (editIndex !== null) {
        // Update the existing item
        items[editIndex] = input;
        this.setState({
          items,
          input: "",
          editIndex: null // Reset after update
        });
      } else {
        // Add a new item
        this.setState({
          items: [...items, input],
          input: ""
        });
      }
    }
  };

  deleteItem = (index) => {
    this.setState({
      items: this.state.items.filter((_, i) => i !== index)
    });
  };

  editItem = (index) => {
    this.setState({
      input: this.state.items[index],
      editIndex: index // Store the index of the item being edited
    });
  };

  render() {
    const { input, items, editIndex } = this.state;
    return (
      <div className='todo-container'>
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            type='text'
            value={input}
            onChange={this.handleChange}
            placeholder='Enter Items...'
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}
              <i
                className="fa-solid fa-edit"
                style={{ color: '#4CAF50', cursor: 'pointer', marginRight: '10px' }}
                onClick={() => this.editItem(index)}
              ></i>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: '#ea3434', cursor: 'pointer' }}
                onClick={() => this.deleteItem(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
