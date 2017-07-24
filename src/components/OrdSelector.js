import React, { Component } from 'react';

class OrdSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.minmax[0] ? this.props.posX + this.props.width*this.props.selection[0] - this.props.metrics.handle_width/2 : this.props.posX - this.props.metrics.handle_width/2,
      right: this.props.minmax[1] ? this.props.posX + this.props.width*this.props.selection[1] - this.props.metrics.handle_width/2 : this.props.posX + this.props.width*(this.props.tickNum - 1) - this.props.metrics.handle_width/2,
      activeHandler: null,
      activeSide: null
    };
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  getOptimalPointLeft (x) {
    let optimal = this.props.posX - this.props.metrics.handle_width/2;
    let optimal_value = 0;
    let current = this.state.left;
    for(let i = 0; i < this.props.tickNum; i++) {
      const point = this.props.posX + this.props.width*i - this.props.metrics.handle_width/2;
      if(Math.abs(point - current) < Math.abs(optimal - current) && point < this.state.right) {
        optimal = point;
        optimal_value = i;
      }
    }
    return [optimal, optimal_value];
  }

  getOptimalPointRight (x) {
    let optimal = this.props.posX + this.props.width*(this.props.tickNum - 1) - this.props.metrics.handle_width/2;
    let optimal_value = this.props.tickNum - 1;
    let current = this.state.right;
    for(let i = 0; i < this.props.tickNum; i++) {
      const point = this.props.posX + this.props.width*i - this.props.metrics.handle_width/2;
      if(Math.abs(point - current) < Math.abs(optimal - current) && point > this.state.left) {
        optimal = point;
        optimal_value = i;
      }
    }
    return [optimal, optimal_value];
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
        if(this.state.left + 3*this.props.metrics.handle_width/2 <= this.state.right - xDiff && this.state.right - xDiff <= this.props.posX + this.props.width*(this.props.tickNum-1) - this.props.metrics.handle_width/2) {
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
      const opt = this.getOptimalPointLeft(this.state.left);
      this.setState({
        left: opt[0]
      });
      let selection = this.props.selection;
      selection[0] = opt[1];
      this.props.onSelect(selection);
    } else if(lr === 1) {
      const opt = this.getOptimalPointRight(this.state.right);
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
    const tick_num = this.props.tickNum;
    const borders = [];
    const label_array = [];
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
    let i = 0;

    for(i = 0; i < tick_num; i++) {
      borders.push(
        (
          <line key={i} x1={this.props.posX + this.props.width * (i)} y1={this.props.posY + this.props.metrics.h_txt} x2={this.props.posX + this.props.width * (i)}  y2={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} style={{stroke:"#000000", strokeWidth:2}} />
        )
      );
    }

    for(i = 0; i < this.props.labels.length; i++) {
      label_array.push(
        (
          <text key={i} x={this.props.posX + this.props.width*(2*i + 1)/2} y={this.props.posY} fontSize={this.props.metrics.h_txt} style={styles.labelStyle}>{this.props.labels[i]}</text>
        )
      );
    }


    return (
      <g>
        {borders}
        {label_array}
        <rect rx={this.props.barRadius} x={this.props.posX - this.props.metrics.w_space_padding/2} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick + this.props.metrics.h_space_between} width={(this.props.tickNum - 1)*this.props.metrics.w_between_tick + this.props.metrics.w_space_padding} height={this.props.height} style={styles.barStyle}/>
        <rect x={this.state.left + this.props.metrics.handle_width/2} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick + 2 + this.props.metrics.h_space_between} width={this.state.right - this.state.left} height={this.props.height - 4} style={styles.rangeStyle} />
        <rect onTouchStart={touchDownLeft} onMouseDown={mouseDownLeft} style= {styles.handleStyle} rx={this.props.handleRadius} width={this.props.minmax[0]? this.props.metrics.handle_width : 0} height={this.props.height + 2*this.props.metrics.h_space_between} x={this.state.left} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} />
        <rect onTouchStart={touchDownRight} onMouseDown={mouseDownRight} style= {styles.handleStyle} rx={this.props.handleRadius} width={this.props.minmax[1]? this.props.metrics.handle_width : 0} height={this.props.height + 2*this.props.metrics.h_space_between} x={this.state.right} y={this.props.posY + this.props.metrics.h_txt + this.props.metrics.h_tick} />
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