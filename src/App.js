import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import data from './data/history.json';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const { Range } = Slider;

var num = 0;

class CustomizedRange extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 1926,
      upperBound: 2019,
      total: 0,
      value: [1926, 2019],
    };
  }

  onLowerBoundChange = e => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = e => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = value => {
    log(value);
    num=0
    this.setState({
      value,
    });
  };

  getValue(totalReturn){
    num += parseFloat(totalReturn)
    return num
  }

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  };

  render() {
    return (
      <div>
        <Range min={1926} max={2019} defaultValue={[1926, 2019]} marks={{ 1926: 1926,  2019: 2019 }} handle={handle} allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
        <TableContainer component={Paper}>
          <Table size="fixed"align="center" aria-label="simple table" >
      
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Total Return&nbsp;</TableCell>
            <TableCell>Cumulative Return</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter(data => data.year >= this.state.value[0] && data.year <= this.state.value[1]).reverse().map((arr, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{arr.year}</TableCell>
              <TableCell>{arr.totalReturn}</TableCell>
              <TableCell>{this.getValue(arr.totalReturn).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    );
  }
}


const useStyles = makeStyles({
  table: {
  },


});


function log(value) {
  console.log(value); //eslint-disable-line
}


const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default function SimpleTable() {


  return (


  <Container fixed>
    <CustomizedRange />


  </Container>

  
  );
}




