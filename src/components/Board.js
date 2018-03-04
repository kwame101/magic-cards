import React from 'react';
import Cards from './Card';
import Header from './HeaderBar';

/** 
 * Board Component act as the parent for both Header and Card components
 */
class Board extends React.Component{
   
    getDeckNumber = () => {
        return this.Cards.currentDeckState()
    }

    // submit a form passed by header component
    submit = data => {
        this.Cards.submit(data)
    };

    // perform an action triggered by header component
    suffle = () => {
        this.Cards.suffles()
    };

    // perform an action triggered by header component
    sort = () => {
        this.Cards.sorts()
    };

    render() {
        return (
            <div>
                <Header submit={this.submit} getNumber={this.getDeckNumber} suffleCards={this.suffle} sortCards={this.sort}/>
                <Cards ref={(Card) => { this.Cards = Card; }} />
            </div>
        );
    }
}

export default Board;
