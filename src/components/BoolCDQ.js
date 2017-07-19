import React, { Component } from 'react';
import Subject from './Subject';
import BoolSelector from './BoolSelector';
import BoolPreference from './BoolPreference';

class BoolCDQ extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selection: this.props.config.default_selection,
        pref: this.props.pref
      };
      this.handleSelect = this.handleSelect.bind(this);
      this.setPreference = this.setPreference.bind(this);
    }

    componentDidMount() {
      this.props.handler.socketHandler(this.setPreference, this.state.selection);
    }

    setPreference(uid, selection) {
      const oldPref = this.state.pref;
      for(let i = 0; i < oldPref.length; i++) {
        if(oldPref[i].u_id === uid) {
          oldPref[i].selection = selection;
          this.setState({pref : oldPref});
        }
      }
    }

    handleSelect(bool) {
      this.setState(
        { selection: bool }
      );
      this.props.handler.onSelectChange(bool);
    }

    render() {
        const {
          h_space_top,
          h_subject,
          h_space_subject_me,
          h_me,
          h_space_me_others,
          h_space_between,
          h_other,
          h_space_bottom,
          w_space_padding,
          w_space_between,
          w_button,
          button_radius
        } = this.props.metrics;

        const prefs = this.state.pref;

        return (
          <svg width={w_space_padding*2 + w_space_between*4 + w_button*2} height={h_space_top + h_space_bottom + h_space_between*(prefs.length + 1) + h_other*(prefs.length) + h_space_me_others + h_me + h_space_subject_me + h_subject}>
              <Subject title={this.props.config.criterion_name} posX={w_space_padding} posY={h_space_top} fontSize={h_subject} />
              <BoolSelector buttonRadius={button_radius} posX={w_space_padding + w_space_between} posY={h_space_top + h_subject + h_space_subject_me} width={w_button} height={h_me} spacing={w_space_between*2} selection={this.state.selection} onSelect={this.handleSelect} />
              <BoolPreference posX={w_space_padding} posY={h_space_top + h_subject + h_space_subject_me + h_me + h_space_me_others + h_space_between} marginX={w_space_between} marginY={h_space_between} width={w_button} height={h_other} anonymize={this.props.config.anonymize} pref={this.state.pref} />
          </svg>
        )
    }
}

BoolCDQ.defaultProps = {
  metrics: {
    h_space_top : 30,
    h_subject : 30,
    h_space_subject_me : 30,
    h_me : 50,
    h_space_me_others : 30,
    h_space_between : 3,
    h_other : 25,
    h_space_bottom : 50,
    w_space_padding : 30,
    w_space_between : 5,
    w_button : 170,
    button_radius : 30
  }
};

export default BoolCDQ;