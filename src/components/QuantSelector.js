import React, { Component } from 'react';

class OrdSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.minmax[0] ? this.props.posX + this.props.width*this.props.valToUnit(this.props.selection[0]) - this.props.metrics.handle_width/2 : this.props.posX - this.props.metrics.handle_width/2,
      right: this.props.minmax[1] ? this.props.posX + this.props.width*this.props.valToUnit(this.props.selection[1]) - this.props.metrics.handle_width/2 : this.props.posX + this.props.width*(this.props.units - 1) - this.props.metrics.handle_width/2,
      activeHandler: null,
      activeSide: null
    };
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  getOptimalPointLeft () {
    let optimal = this.props.posX - this.props.metrics.handle_width/2;
    let optimal_value = this.props.range[0];
    let current = this.state.left;
    for(let i = 0; i < this.props.units + 1; i++) {
      const point = this.props.posX + this.props.width*i - this.props.metrics.handle_width/2;
      if(Math.abs(point - current) < Math.abs(optimal - current) && point < this.state.right) {
        optimal = point;
        optimal_value = this.props.range[0] + i*this.props.interval;
      }
    }
    return [optimal, parseFloat(parseFloat(optimal_value).toPrecision(4))];
  }

  getOptimalPointRight () {
    let optimal = this.props.posX + this.props.width*(this.props.units) - this.props.metrics.handle_width/2;
    let optimal_value = this.props.range[0] + this.props.units*this.props.interval;
    let current = this.state.right;
    for(let i = 0; i < this.props.units + 1; i++) {
      const point = this.props.posX + this.props.width*i - this.props.metrics.handle_width/2;
      if(Math.abs(point - current) < Math.abs(optimal - current) && point > this.state.left) {
        optimal = point;
        optimal_value = this.props.range[0] + i*this.props.interval;
      }
    }
    return [optimal, parseFloat(parseFloat(optimal_value).toPrecision(4))];
  }

  mouseMove (e){
    e.preventDefault();
    const element = this.state.activeHandler;
    const lr = this.state.activeSide;
    if(element) {
      const xDiff = element.coords.x - e.pageX;
      element.coords.x = e.pageX;
      element.coords.y = e.pageY;
      if (lr === 0) {
        if(this.props.posX - this.props.metrics.handle_width/2 <= this.state.left - xDiff && this.state.left - xDiff <= this.state.right - 3*this.props.metrics.handle_width/2) {

          this.setState({
            left: this.state.left - xDiff
          });
        }
      } else if (lr === 1) {
        if(this.state.left + 3*this.props.metrics.handle_width/2 <= this.state.right - xDiff && this.state.right - xDiff <= this.props.posX + this.props.width*(this.props.units) - this.props.metrics.handle_width/2) {
          this.setState({
            right: this.state.right - xDiff
          });
        }
      }
    }
    return false;
  }

  mouseUp () {
    const lr = this.state.activeSide;
    if(lr === 0) {
      const opt = this.getOptimalPointLeft();
      this.setState({
        left: opt[0]
      });
      let selection = this.props.selection;
      selection[0] = opt[1];
      this.props.onSelect(selection);
    } else if(lr === 1) {
      const opt = this.getOptimalPointRight();
      this.setState({
        right: opt[0]
      });
      let selection = this.props.selection;
      selection[1] = opt[1];
      this.props.onSelect(selection);
    }
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('touchmove', this.mouseMove);
    document.removeEventListener('touchend', this.mouseUp);
    document.removeEventListener('touchcancel', this.mouseUp);
  }

  render() {
    const mouseDownLeft = (e) => {
      if(e.button !== 2) {
        const element = e.target;
        this.setState({
          activeHandler: element,
          activeSide: 0
        });
        element.coords = {
          x: e.pageX,
          y: e.pageY
        };
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
      }
    };
    const mouseDownRight = (e) => {
      if(e.button !== 2) {
        const element = e.target;
        this.setState({
          activeHandler: element,
          activeSide: 1
        });
        element.coords = {
          x: e.pageX,
          y: e.pageY
        };
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
      }
    };
    const touchDownLeft = (e) => {
      e.preventDefault();
      const element = e.target;
      this.setState({
        activeHandler: element,
        activeSide : 0
      });
      element.coords = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener('touchmove', this.mouseMove);
      document.addEventListener('touchend', this.mouseUp);
      document.addEventListener('touchcancel', this.mouseUp);
      return false;
    };

    const touchDownRight = (e) => {
      e.preventDefault();
      const element = e.target;
      this.setState({
        activeHandler: element,
        activeSide : 1
      });
      element.coords = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener('touchmove', this.mouseMove);
      document.addEventListener('touchend', this.mouseUp);
      document.addEventListener('touchcancel', this.mouseUp);
      return false;
    };

    const pos_to_val = (pos) => {
      let optimal = this.props.range[0];
      let current = pos * (this.props.range[1] - this.props.range[0]) / this.props.metrics.w_range + this.props.range[0];
      for(let i = 0; i < this.props.units + 1; i++) {
        const point = this.props.range[0] + i*this.props.interval;
        if(Math.abs(current - point) < Math.abs(optimal - current)) {
          optimal = point;
        }
      }
      return parseFloat(parseFloat(optimal).toPrecision(4));
    };

    const borders = [];
    const tickSize = this.props.tickInterval / this.props.interval
    for(let i = 0; i < this.props.units/tickSize; i++) {
      borders.push(
        (
          <line key={i} x1={this.props.posX + this.props.width * (i) * tickSize} y1={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick/3} x2={this.props.posX + this.props.width * (i) * tickSize}  y2={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} style={{stroke:"#AAAAAA", strokeWidth:1}} />
        )
      );
    }

    return (
      <g>
        {borders}
        <line x1={this.props.posX} y1={this.props.posY + this.props.metrics.h_txt} x2={this.props.posX}  y2={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} style={{stroke:"#000000", strokeWidth:2}} />
        <line x1={this.props.posX + this.props.width * this.props.units} y1={this.props.posY + this.props.metrics.h_txt} x2={this.props.posX + this.props.width * this.props.units}  y2={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} style={{stroke:"#000000", strokeWidth:2}} />
        <text x={this.props.posX} y={this.props.posY} fontSize={this.props.metrics.h_txt} style={styles.labelStyle}>{this.props.range[0]}</text>
        <text x={this.props.posX + this.props.width * this.props.units} y={this.props.posY} fontSize={this.props.metrics.h_txt} style={styles.labelStyle}>{this.props.range[1]}</text>
        <rect rx={this.props.barRadius} x={this.props.posX - this.props.metrics.w_space_padding/2} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick + this.props.metrics.h_space_between} width={this.props.metrics.w_range + this.props.metrics.w_space_padding} height={this.props.height} style={styles.barStyle}/>
        <rect x={this.state.left + this.props.metrics.handle_width/2} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick + 2 + this.props.metrics.h_space_between} width={this.state.right - this.state.left} height={this.props.height - 4} style={styles.rangeStyle} />
        <rect onTouchStart={touchDownLeft} onMouseDown={mouseDownLeft} style= {styles.handleStyle} rx={this.props.handleRadius} width={this.props.minmax[0]? this.props.metrics.handle_width : 0} height={this.props.height + 2*this.props.metrics.h_space_between} x={this.state.left} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} />
        <rect onTouchStart={touchDownRight} onMouseDown={mouseDownRight} style= {styles.handleStyle} rx={this.props.handleRadius} width={this.props.minmax[1]? this.props.metrics.handle_width : 0} height={this.props.height + 2*this.props.metrics.h_space_between} x={this.state.right} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} />
        <text x={this.state.left + this.props.metrics.handle_width/2} y={this.props.posY} fontSize={this.props.metrics.h_txt} style={styles.labelStyle}>{pos_to_val(this.state.left - this.props.posX + this.props.metrics.handle_width/2)}</text>
        <text x={this.state.right + this.props.metrics.handle_width/2} y={this.props.posY} fontSize={this.props.metrics.h_txt} style={styles.labelStyle}>{pos_to_val(this.state.right - this.props.posX + this.props.metrics.handle_width/2)}</text>
      </g>
    );
  }
}


const styles = {
  barStyle: {
    fill: "#D3D3D3",
    stroke: "#AAAAAA",
    strokeWidth: "2"
  },
  labelStyle: {
    textAnchor: "middle",
    dominantBaseline: "hanging",
    fill: "#6D6D6D"
  },
  handleStyle: {
    fill: "#E6E6E6",
    stroke: "#828282",
    strokeWidth: "3"
  },
  rangeStyle: {
    fill: "#E7298A"
  }
}

export default OrdSelector;