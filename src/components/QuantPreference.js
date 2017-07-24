import React, { Component } from 'react';

class OrdPreference extends Component {
  render() {
    const prefs = this.props.pref;
    const pref_len = prefs.length;
    const renderPref = (preference, index) => {
      const max = preference.selection ? preference.selection[1] : this.props.range[1];
      const min = preference.selection ? preference.selection[0] : this.props.range[1] - this.props.interval;
      const valToUnit = this.props.valToUnit;
      return (
        <rect key={index}
              width={this.props.width * (valToUnit(max) - valToUnit(min))}
              height={this.props.height}
              x={this.props.posX + this.props.width * valToUnit(min)}
              y={this.props.posY + this.props.marginY * (index + 1) + this.props.height * (index)}
              fill={this.props.anonymize ? "#939393" : colors[index]}
              opacity={prefs[index].selection === undefined ? 0.25 : 1}/>
      );
    };

    const borders = [];
    const tickSize = this.props.tickInterval / this.props.interval
    for(let i = 0; i < this.props.units/tickSize; i++) {
      borders.push(
        (
          <line key={i} x1={this.props.posX + this.props.width * (i) * tickSize} y1={this.props.posY} x2={this.props.posX + this.props.width * (i) * tickSize}  y2={this.props.posY + this.props.marginY*(pref_len + 1) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        )
      );
    }

    return (
      <g>
        {borders}
        <line x1={this.props.posX} y1={this.props.posY} x2={this.props.posX}  y2={this.props.posY + this.props.marginY*(pref_len + 1) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        <line x1={this.props.posX + this.props.width * this.props.units} y1={this.props.posY} x2={this.props.posX + this.props.width * this.props.units}  y2={this.props.posY + this.props.marginY*(pref_len + 1) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        {this.props.pref.map(renderPref)}
      </g>
    );
  }
}

const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395"];


export default OrdPreference;
