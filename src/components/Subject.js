import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <g>
        <text x={this.props.posX} y={this.props.posY} style={{ dominantBaseline: "hanging", fontSize: this.props.fontSize }}>{this.props.title}</text>
      </g>
    );
  }
}

export default Subject;