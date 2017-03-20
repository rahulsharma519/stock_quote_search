import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){

    super(props);

    this.state = { //initial state defined by using this.state

      //includes symbol, price, change, change in percent, and last updated time
      symbol: '',
      price: '',
      change: '',
      changeP:'',
      lastUpdate:'',

    }

  }

  componentWillMount(){ //gets called when rendering in react

    this.getSymbol();
  }
  getSymbol(){

    axios.get('http://www.google.com/finance/info?q=' + this.state.symbol) //axios framework used for HTTP Get Requests
    .then((response) =>{ //returns the response

      var resp =response.data.slice(3); // slice is used because the google finance api returns a // in the beggining
      var dataParse = JSON.parse(resp); //parse json
      var data = dataParse[0];
      //console.log(data);

      //set variables to the Json response
      var priceOfStock = data.l;
      var change = data.c;
      var changeP = data.cp;
      var lastUpdate = data.lt;

      //take the text it responds with then store the value
      this.setState({price: priceOfStock, change: change, changeP: changeP, lastUpdate: lastUpdate}, function(){
        console.log(this.state); //log the state

      })
    })
    .catch((err) =>{
      console.log(err);
      var priceOfStock = 'N/A';
      var change = 'N/A';
      var changeP = 'N/A';
      var lastUpdate = 'N/A';

    });


  }

  render() {
    return (
      <div className="App container">
       <h1 className="text-center">SEARCH UP A STOCK QUOTE</h1>
      <hr />
      <form>
         <input type="text" name="symbol" placeholder="Enter Symbol" value={this.state.symbol}
         onChange={this.handleSymbolChange.bind(this)} />
         <br />
         <br />
       </form>
       <h2> Stock Name: {this.state.symbol} </h2>
          <br />
       <h4>Price: {this.state.price} </h4>
          <br />
      <h4> Change: {this.state.change}</h4>
          <br />
       <h4>Change %: {this.state.changeP}</h4>
          <br />
      <h4> Last Updated: {this.state.lastUpdate}</h4>
      <hr />
      This is a simple web application that uses the Google finance API and React JS to display information
      for a stock.
      </div>


    );
  }
  handleSymbolChange(evt) {
    this.setState({symbol: evt.target.value});
    this.getSymbol();

    //console.log(this.state);

}

}

export default App;
