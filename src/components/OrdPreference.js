import React, { Component } from 'react';

class OrdPreference extends Component {
  render() {
    const prefs = this.props.pref;
    const pref_len = prefs.length;
    const tick_num = this.props.tickNum;

    const renderPref = (preference, index) => {
      const max = preference.selection? preference.selection[1] : tick_num - 1;
      const min = preference.selection? preference.selection[0] : tick_num - 2;
      return (
        <rect key={index}
              width={this.props.width * (max - min)}
              height={this.props.height}
              x={this.props.posX + this.props.width * min}
              y={this.props.posY + this.props.marginY * (index + 1) + this.props.height * (index)}
              fill={this.props.anonymize ? "#939393" : colors[index]}
              opacity={prefs[index].selection === undefined ? 0.25 : 1}/>
      );
    };

    const borders = [];

    for(var i = 0; i < tick_num; i++) {
      borders.push(
        (
          <line key={i} x1={this.props.posX + this.props.width * (i)} y1={this.props.posY} x2={this.props.posX + this.props.width * (i)}  y2={this.props.posY + this.props.marginY*(pref_len + 1) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        )
      );
    }

    return (
      <g>
        {borders}
        {this.props.pref.map(renderPref)}
      </g>
    );
  }
}

const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395"];


export default OrdPreference;
