import React, { Component } from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './CSS/Instructions.css';

class Instructions extends Component {
    render() {
        return (
            <div className="instructionsHolder">
                <button
                    className="instructionsButton"
                    id="instructions"
                >
                    Instructions
                </button>
                <UncontrolledPopover
                    placement="bottom"
                    trigger="legacy"
                    target="instructions"
                >
                    <PopoverHeader>
                        <div className="instructionsHeader">
                            <b>Instructions</b>
                            {/* <b>Instructions</b> */}
                        </div>
                    </PopoverHeader>
                    <PopoverBody>
                        <div>
                            <h5>1) Picking Games</h5>
                            <p className="paragraph">To pick a game, click on the button of the team you pick to win. If you think the teams will tie click the <b>@</b> or <b>VS</b> button.</p>
                            <hr />
                            <h5>2) Your Setup (Settings)</h5>
                            <p className="paragraph">The <u>Pick Styles</u> setting lets you pick games by team or by week of the season.</p>
                            <p className="paragraph">The standings settings <u>Detail</u> & <u>Playoff Teams Only</u> allow you to view your picks' standings in various levels of detail. Above the standings are buttons to view by conference of by divisions.</p>
                            <p className="paragraph"><u>Show Progress Bar</u> toggles a viewer of how many games you have picked, this helps make sure you haven't missed one.</p>                        
                        </div>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
}

export { Instructions };
