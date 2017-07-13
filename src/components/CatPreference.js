import React, { Component } from 'react';

class CatPreference extends Component {
  render() {
    const prefs = this.props.pref;
    const pref_len = prefs.length;
    const renderPref = (preference, index) => {
      const eachPref = [];

      preference.selection.map((each, each_index) => {
        if(each) {
          eachPref.push(
            <g key={preference.u_id + "-" + each_index}>
              <rect
                width={this.props.width}
                height={this.props.height}
                x={this.props.posX + this.props.marginX * (each_index*2 + 1) + this.props.width * each_index}
                y={this.props.posY + this.props.marginY * (index + 1) + this.props.height * (index)}
                fill={this.props.anonymize ? "#939393" : colors[index]}/>
              <line x1={this.props.posX + this.props.marginX * (each_index + 1) *2 + this.props.width * (each_index + 1)} y1={this.props.posY} x2={this.props.posX + this.props.marginX * (each_index + 1) *2 + this.props.width * (each_index + 1)} y2={this.props.posY + this.props.marginY*(1 + pref_len) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
            </g>
        );
        }
        return true;
      });
      return eachPref;
    };

    return (
      <g>
        {this.props.pref.map(renderPref)}
        <line x1={this.props.posX} y1={this.props.posY} x2={this.props.posX} y2={this.props.posY + this.props.marginY*(pref_len + 1) + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
      </g>
    );
  }
}

const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395"];


export default CatPreference;
