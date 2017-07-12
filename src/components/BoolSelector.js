import React, { Component } from 'react';

class BoolSelector extends Component {
  render() {
    return (
      <g>
        <g onClick={() => {this.props.onSelect(true)}}>
        <rect rx={this.props.buttonRadius} width={this.props.width} height={this.props.height} x={this.props.posX} y={this.props.posY} style={this.props.selection? styles.selected.rectStyle : styles.unselected.rectStyle} />
        <text x={this.props.posX + this.props.width/2} y={this.props.posY + this.props.height/2} fontSize={this.props.height/2} style={this.props.selection? styles.selected.textStyle : styles.unselected.textStyle}>Yes</text>
        </g>
        <g onClick={() => this.props.onSelect(false)}>
        <rect rx={this.props.buttonRadius} width={this.props.width} height={this.props.height} x={this.props.posX + this.props.width + this.props.spacing} y={this.props.posY} style={!this.props.selection? styles.selected.rectStyle : styles.unselected.rectStyle} />
        <text x={this.props.posX + this.props.width*3/2 + this.props.spacing} y={this.props.posY + this.props.height/2} fontSize={this.props.height/2} style={!this.props.selection? styles.selected.textStyle : styles.unselected.textStyle}>No</text>
        </g>
      </g>
    );
  }
}


const styles = {
  selected: {
    rectStyle: {
      fill: "#E7298A",
      stroke: "#B70969",
      strokeWidth: "2"
    },
    textStyle: {
      textAnchor: "middle",
      alignmentBaseline: "central",
      fill: "#FFFFFF"
    }
  },
  unselected: {
    rectStyle: {
      fill: "#D3D3D3",
      stroke: "#AAAAAA",
      strokeWidth: "2"
    },
    textStyle: {
      textAnchor: "middle",
      alignmentBaseline: "central",
      fill: "#6D6D6D"
    }
  }
}

export default BoolSelector;