import React, { Component } from 'react';

class BoolPreference extends Component {
  render() {
    const prefs = this.props.pref;
    const pref_len = prefs.length;
    const renderPref = (preference, index) => {
      return (<rect key={preference.u_id}
          width={this.props.width}
          height={this.props.height}
          x={preference.selection ? this.props.posX + this.props.marginX : this.props.posX + this.props.marginX * 3 + this.props.width}
          y={this.props.posY + this.props.marginY*(2 * index + 1) + this.props.height * (index)}
          fill={this.props.anonymize ? "#939393" : colors[index]}/>
      );
    };

    return (
      <g>
        {this.props.pref.map(renderPref)}
        <line x1={this.props.posX} y1={this.props.posY} x2={this.props.posX} y2={this.props.posY + this.props.marginY*2*pref_len + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        <line x1={this.props.posX + 2*this.props.marginX + this.props.width} y1={this.props.posY} x2={this.props.posX + 2*this.props.marginX + this.props.width} y2={this.props.posY + this.props.marginY*2*pref_len + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
        <line x1={this.props.posX + 4*this.props.marginX + this.props.width*2} y1={this.props.posY} x2={this.props.posX + 4*this.props.marginX + this.props.width*2} y2={this.props.posY + this.props.marginY*2*pref_len + this.props.height*pref_len} style={{stroke:"#AAAAAA", strokeWidth:2, strokeDasharray:"3,3"}} />
      </g>
    );
  }
}

const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395"];


export default BoolPreference;
