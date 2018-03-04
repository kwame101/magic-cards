import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Header, Button, Form } from 'semantic-ui-react';
import InlineErrors from './InlineErrors';

/** 
 * HeaderBar Component is a header which contains buttons and a form
 * used to submit and / post functions
 * 
 */
class HeaderBar extends React.Component {
    state = {
        data: {
            number:''
        },
        errors: {}
    };
    // on change handle the set state name
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value}
    });

    // on submit validate data state
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        // check if there are errors before submitting
        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    // validate form submit
    validate = (data) => {
        const errors = {};
        if(!data.number) errors.number = "Empty Value";
        else if (data.number > this.props.getNumber()) errors.number = "Number too large!";
        return errors;
    }

    // on click function
    suffle = () => {
        this.props.suffleCards();
    }

    // on click function
    sort = () => {
        this.props.sortCards();
    }


    render() {
        return (
            <Header as='h2' block>
                <Icon disabled name='terminal' />
                <Header.Content >
                <Button onClick={this.suffle} floated='left'>Suffle</Button>
                <Button onClick={this.sort} floated='left'>Sort</Button>
                    <Form style={{ float: 'right' }} onSubmit={this.onSubmit} >
                    <Form.Group widths='equal'>
                    <Form.Input
                        action='Draw'
                        type="number"
                        id="number"
                        name="number"
                        value={this.state.data.number}
                        onChange={this.onChange}
                        error={!!this.state.errors.number}
                        />
                        {this.state.errors.number && <InlineErrors text={this.state.errors.number} />}
                         </Form.Group>
                </Form>
                </Header.Content>
            </Header>
        )
    }
}

HeaderBar.propTypes = {
    submit: PropTypes.func.isRequired,
    suffleCards: PropTypes.func.isRequired,
    sortCards: PropTypes.func.isRequired,
    getNumber: PropTypes.func.isRequired
}

export default HeaderBar;