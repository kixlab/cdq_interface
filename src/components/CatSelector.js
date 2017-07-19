import React, { Component } from 'react';

class CatSelector extends Component {
  render() {


    const renderCategories = (category, index) => {
      return (
        <g key={index} onClick={(e) => {
          e.preventDefault();
          this.props.onSelect(index);
          return false;
        }}>
          <rect rx = {this.props.buttonRadius} width={this.props.width} height={this.props.height} x={this.props.posX + this.props.width*index + this.props.spacing*index} y={this.props.posY} style={this.props.selection[index]? styles.selected.rectStyle : styles.unselected.rectStyle} />
          <text x={this.props.posX + this.props.width*(index*2+1)/2 + this.props.spacing*index} y={this.props.posY + this.props.height/2} fontSize={this.props.height/2} style={this.props.selection[index]? styles.selected.textStyle : styles.unselected.textStyle}>{this.props.categories[index]}</text>
        </g>
      );
    };
    return (
      <g>
        {this.props.categories.map(renderCategories)}
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

export default CatSelector;