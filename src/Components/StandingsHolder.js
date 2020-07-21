import React, { Component } from 'react';
import { Form, FormGroup, CustomInput } from 'reactstrap';
import './StandingsHolder.css';

class StandingsHolder extends Component {
    render() {
        return (
            <div>
                <Form>
                    <FormGroup check inline>
                        <CustomInput type="checkbox" id="hello" label="by Confrence" value={true} />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export { StandingsHolder };