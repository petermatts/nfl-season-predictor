import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showInstructions } from '../Actions'; 
import './CSS/Instructions.css';

class Instructions extends Component {
    render() {
        return (
            <div className="instructionsHolder">
                <button
                    className="instructionsButton"
                    id="instructions"
                    onClick={() => this.props.showInstructions()}
                >
                    Instructions
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { settings } = state;
    return { settings };
}

const InstructionsButton = connect(mapStateToProps, { showInstructions })(Instructions);

export { Instructions, InstructionsButton };
