import axios from 'axios';
import React, { Component } from 'react';

class Card extends Component {
    render(){
        return (
            <div>
                <img width="75"src={this.props.avatar_url}/>
                <h3>Name: {this.props.login}</h3>
                <h3>Company: {this.props.company}</h3>
            </div>
        );
    }
}

class CardList extends Component {
    render() {
        return (
            <div>
                { this.props.cards.map( card => <Card key={card.id} {...card} /> )}
            </div>
        );
    }
}

class Form extends Component {
    state = { userName: ''};
    handleClick(event){
        event.preventDefault();
        console.log(event);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then( resp =>{
                this.props.onSubmit(resp.data);
                this.setState({ userName: ''});
            })
    }
    render() {
        return (
            <form onSubmit={this.handleClick.bind(this)}>
                <input 
                value={this.state.userName}
                onChange={(event)=> this.setState({ userName: event.target.value})}
                type='text' placeholder='Github User Name'/>
                <button type="submit">Search</button>
            </form>
            
        );
    }
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            cards: []
        };
    }

    addNewCard(cardInfo){
        this.setState((prevState)=> ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard.bind(this)} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

export default App;