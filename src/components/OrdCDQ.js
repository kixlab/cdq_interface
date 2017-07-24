import React, {Component} from 'react';
import Subject from './Subject';
import OrdSelector from './OrdSelector';
import OrdPreference from './OrdPreference';

class OrdCDQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.config.default_selection,
      pref: this.props.pref
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.setPreference = this.setPreference.bind(this);
  }

  handleSelect(range) {
    this.setState({selection: range});
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

  componentDidMount() {
    this.props.handler.socketHandler(this.setPreference, this.state.selection);
  }

  render() {
    console.log(this.state.selection);
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
      w_between_tick,
      bar_radius,
      handle_radius
    } = this.props.metrics;


    const tick_num = this.props.config.tick_num;
    const prefs = this.state.pref;
    return (
      <svg
        width={w_space_padding * 2 + w_between_tick * (tick_num - 1)}
        height={h_space_top + h_space_bottom + h_space_between * (prefs.length + 1) + h_other * prefs.length + h_space_me_others + h_me + h_space_subject_txt + h_txt + h_tick + h_subject}>
        <Subject
          title={this.props.config.criterion_name + ` (${this.props.config.label[0]} ~ ${this.props.config.label[tick_num - 2]})`}
          posX={w_space_padding} posY={h_space_top} fontSize={h_subject}/>
        <OrdSelector minmax={this.props.config.range_MinMax} metrics={this.props.metrics} barRadius={bar_radius}
                     handleRadius={handle_radius} tickNum={tick_num} labels={this.props.config.label}
                     posX={w_space_padding} posY={h_space_top + h_subject + h_space_subject_txt} width={w_between_tick}
                     height={h_me} selection={this.state.selection} onSelect={this.handleSelect}/>
        <OrdPreference tickNum={tick_num} posX={w_space_padding}
                       posY={h_space_top + h_subject + h_space_subject_txt + h_txt + h_tick + h_me + h_space_me_others + h_space_between}
                       marginY={h_space_between} width={w_between_tick} height={h_other}
                       anonymize={this.props.config.anonymize} pref={prefs}/>
      </svg>
    )
  }
}

OrdCDQ.defaultProps = {
  metrics: {
    h_space_top: 30,
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
    w_between_tick: 120,
    bar_radius: 30,
    handle_radius: 10,
    handle_width: 10
  }
};

export default OrdCDQ;