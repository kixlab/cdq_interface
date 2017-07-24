import React, { Component } from 'react';
import Subject from './Subject';
import QuantSelector from './QuantSelector';
import QuantPreference from './QuantPreference';

class QuantCDQ extends Component {
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

  handleSelect(range) {
    this.setState({ selection: range });
    this.props.handler.onSelectChange(range);
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

  render() {
    const min = this.props.config.range[0];
    const val_to_unit = (val) => {
      return (val - min) / interval;
    };

    const {
      h_space_top,
      h_subject,
      h_space_subject_txt,
      h_txt,
      h_tick,
      h_space_between,
      h_me,
      h_space_me_others,
      h_other,
      h_space_bottom,
      w_space_padding,
      w_range,
      bar_radius,
      handle_radius
    } = this.props.metrics;


    const interval = this.props.config.interval;
    const prefs = this.state.pref;
    const units = (this.props.config.range[1] - this.props.config.range[0])/interval;
    const w_interval = w_range / units;
    return (
      <svg
        width={w_space_padding*2 + w_range}
        height={h_space_top + h_space_bottom + h_space_between*(prefs.length + 1) + h_other*prefs.length + h_space_me_others + h_me + h_space_subject_txt + h_txt + h_tick + h_subject}>
        <Subject title={this.props.config.criterion_name + ` (${this.props.config.range[0]} ~ ${this.props.config.range[1]})`} posX={w_space_padding} posY={h_space_top} fontSize={h_subject} />
        <QuantSelector tickInterval={this.props.config.tick_interval} valToUnit={val_to_unit} range={this.props.config.range} minmax={this.props.config.range_MinMax} metrics={this.props.metrics} barRadius={bar_radius} handleRadius={handle_radius} interval = {interval} posX={w_space_padding} posY={h_space_top + h_subject + h_space_subject_txt} units={units} width={w_interval} height={h_me} selection={this.state.selection} onSelect={this.handleSelect} />
        <QuantPreference range={this.props.config.range} tickInterval={this.props.config.tick_interval} valToUnit={val_to_unit} units = {units} interval={interval} posX={w_space_padding} posY={h_space_top + h_subject + h_space_subject_txt + h_txt + h_tick + h_me + h_space_me_others + h_space_between} marginY={h_space_between} width={w_interval} height={h_other} anonymize={this.props.config.anonymize} pref={prefs} />
      </svg>
    )
  }
}

QuantCDQ.defaultProps = {
  metrics: {
    h_space_top : 30,
    h_subject: 30,
    h_space_subject_txt: 15,
    h_txt: 24,
    h_tick: 12,
    h_space_between: 5,
    h_me: 40,
    h_space_me_others: 20,
    h_other: 25,
    h_space_bottom: 50,
    w_space_padding: 30,
    w_range: 500,
    bar_radius : 20,
    handle_radius : 8,
    handle_width: 15
  }
};

export default QuantCDQ;