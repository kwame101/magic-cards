import React from 'react';
import { Header, Grid, Segment, Container } from 'semantic-ui-react';
import shortid from 'shortid';
import * as data from '../Data';

/**
 * Card Component Collects data from data.js stores it in a state
 * and performs simple functions such as suffle etc.
 */
class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deck: [],
            drawn: [],
        }
    }

    /**
     *  Before component render, create an array of
     *  cards and call setState to initialise the state
     */
    componentDidMount() {
        const arrayData = this.state.deck.slice();
        for (let a = 0; a < data.suits.length; a += 1) {
            for (let k = 0; k < data.ranks.length; k += 1) {
                arrayData.push([data.suits[a], data.ranks[k]]);
             }
          }
        this.setState({
            deck: arrayData
        });
    }

    /**
     * Display cards in unicode format
     * 
     * @param {suits of the card} suit 
     * @param {rank of the card} rank 
     * 
     * @return unicode in a string
     */
    displayCards(suit, rank) {
        let code = suit * 0x10 + rank;
        if (code > 0xFFFF) {
            code -= 0x10000;
            // Shift right to get to most significant 10 bits & Mask to get least significant 10 bits
            return String.fromCharCode(0xD800 + (code >> 10), 0xDC00 + (code & 0x3FF)); // eslint-disable-line no-bitwise
        }
        return String.fromCharCode(code);
    }

    // suffle all the cards in deck state
    suffles() {
        const arrayvar = this.state.deck.slice()
        this.setState({ deck: [] });
        const ddd = this.suffleArray(arrayvar)
        this.setState({ deck: ddd });
    }

    // suffle an array using Fisher-Yates Suffle
    suffleArray(array) {
        const size = array.length - 1;
        for (let k = size; k > 0; k -= 1) {
            const a = Math.floor((Math.random() * (k + 1)));
            const temp = array[k];
            array[k] = array[a];
            array[a] = temp;
        }
        return array;
    }

    // sort all cards in drawn state
    sorts() {
        if (this.state.drawn.length > 1) {
            const arrayvar = this.state.drawn.slice()
            this.setState({ drawn: [] });
            const ddd = this.sortArray(arrayvar)
            this.setState({ drawn: ddd });
        }
    }

    // sort an array of objects
    sortArray(array) {
        array.sort((a, b) => {
            if (a[0].id < b[0].id) {
                return -1;
            } else if (a[0].id > b[0].id) {
                return 1;
            } else {
                if (a[1].id < b[1].id) {
                    return -1;
                } else if (a[1].id > b[1].id) {
                    return 1;
                }
                return 0;
            }
        })
        return array;
    }

    /**
     *  Submit a form containing a data
     * 
     *  @param {object passed from board compoenet} ObjNumber
     */
    submit(ObjNumber) {
        this.drawnIntoArray(ObjNumber.number);
    }

    /**
     * Draw a given number from deck into drawn state array if
     * deck is not empty or is less than deck's current
     * length array
     * 
     * @param {number passed from submit method} numb 
     */
    drawnIntoArray(numb) {
        let num = numb;
        if (this.state.deck != null && this.state.deck.length > 0
            && num <= this.state.deck.length  ) {
            const arr = this.state.drawn.slice();
            this.setState({ drawn: [] });
            while (num > 0) {
                arr.push(this.state.deck.pop())
                num -= 1;
            }
            this.setState({
                drawn: arr
            });
        }
    }

    /**
     *  @return  deck state length
     */
    currentDeckState(){
        return this.state.deck.length
    }

    render() {
        return (
            <Grid stackable columns='equal'>
                <Grid.Row stretched>
                    {this.state.deck.length > 0 ? <Grid.Column >
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h2' content='Deck-o-Cards' />
                            </Segment>
                            <Segment.Group piled key='massive' size='massive'>
                                <Segment textAlign='left'><Container> 	
                                    {
                                        this.state.deck.map((rowdata) =>
                                            <span key={shortid.generate()} style={{ 'fontSize': '120px', 'lineHeight': '1em', 'color': rowdata[0].colour }} >
                                                {this.displayCards(rowdata[0].code, rowdata[1].code)}
                                        </span>
                                      )
                                    }
                                </Container>
                                 </Segment>
                            </Segment.Group>
                        </Segment.Group>
                    </Grid.Column> : null }
                    
                    {this.state.drawn.length > 0 ?  <Grid.Column > 
                        <Segment.Group>
                            <Segment textAlign='center'>
                                <Header as='h2' content='Drawn Cards' />
                            </Segment>
                            <Segment.Group piled key='massive' size='massive'>
                                <Segment textAlign='left'><Container> 
                                    {
                                        this.state.drawn.map((rowdata) =>
                                            <span key={shortid.generate()} style={{ 'fontSize': '120px', 'lineHeight': '1em', 'color': rowdata[0].colour }} >
                                                {this.displayCards(rowdata[0].code, rowdata[1].code)}
                                            </span>
                                        )
                                    }
                                </Container>
                                </Segment>
                            </Segment.Group>
                        </Segment.Group> 
                    </Grid.Column> : null }
                </Grid.Row>
            </Grid>
        )
    }
}

export default Card;
