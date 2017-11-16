import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ntc from './ntc.js';

const initialColor = "#86FAB7";

// use this method instead of function name(props) { ... };
const ColourPane = (props) => {
  const styles = {
    backgroundColor: props.color,
  };
  return (
    <div className="colorinfo__pane" style={styles}></div>
  );
};

const ColorName = (props) => {
  return (
    <div>
      <p className="colorinfo__name">{props.name}</p>
      <textarea className="colorinfo__sass" value={props.sassVar} readOnly />
    </div>
  );
};

const Notifications = (props) => {
  return (
    <div className="status sweet js-status">Test</div>
  );
};

const PopulateObject = (props) => {
  const tempData = ntc.name(props.color);
  const sassName = tempData[1].replace(/[^A-Z0-9]+/ig, "");
  const tempDataObj = {
    hex: props.color,
    closestHex: tempData[0],
    colorName: tempData[1],
    exactMatch: tempData[2],
    sassVariable: "$" + sassName.charAt(0).toLowerCase() + sassName.slice(1) + ": " + props.color
  }
  return tempDataObj;
}

const ShowNotification = (props) => {
  console.log()
}

class App extends Component {
  constructor(props) {
    super(props);
    const colorData = PopulateObject({color: initialColor});
    this.state = colorData;
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(colorVal){
    const colorData = PopulateObject(colorVal);
    this.setState(colorData);
  }

  render() {
    return (
      <div>
        <ColourInput changeColor={this.changeColor} />
        <div className="colorinfo">
          <ColorName name={this.state.colorName} sassVar={this.state.sassVariable}/>
          <div className="colorinfo__wrap">
            <ColourPane color={this.state.hex}/>
            <ColourPane color={this.state.closestHex}/>
          </div>
        </div>
        <Notifications />
      </div>
    );
  }

}

class ColourInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.itemName).focus();
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <label htmlFor="colorinp" className="sr-only">Your Color:</label>
        <div className="input-group">
          <span className="hash" aria-hidden="true">#</span>
          <input type="text" className="inputbox" ref="itemName" />
        </div>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const input = ReactDOM.findDOMNode(this.refs.itemName)
    const hexVal = "#" + input.value;
    this.props.changeColor({ color: hexVal });
    input.value = '';
  }

}


export default App;
