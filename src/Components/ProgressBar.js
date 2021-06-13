import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import './CSS/ProgressBar.css';

class PB extends Component {
    render() {
        if(this.props.settings.showProgress) {
            const prog = this.props.userdata.gamespicked;
            let tot = 1;
            if(this.props.schedule.gamelist !== null)
                tot = this.props.schedule.gamelist.length;
            const pct = (prog/tot)*100;

            return (
                <div className="bar-holder">
                    <div>{`Games Picked: ${prog}/${tot}`}</div>
                    <Progress value={pct}>{prog<=12 ? '':`${pct.toFixed(2)}%`}</Progress>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    const { userdata, schedule, settings } = state;
    return { userdata, schedule, settings };
};

const ProgressBar = connect(mapStateToProps, {})(PB);

export { ProgressBar };
