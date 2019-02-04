import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class RangeSliderInput extends React.Component {

  changeFilter = (value) => {
    const { filterName } = this.props;
    this.props.changeOption([value.min, value.max], filterName);
  }

  render() {
    const { min, max, selectedValues, displayName } = this.props;

    return (
      <FormControl className="col-12" style={{ height: '48px' }}>
        <InputLabel
          style={{ left: '30%', top: '10px' }}
        >
          {displayName}
        </InputLabel>
        <InputRange
          draggableTrack
          maxValue={Number(max)}
          minValue={Number(min)}
          onChange={value => this.changeFilter(value)}
          onChangeComplete={value => console.log(value)}
          value={selectedValues} />
      </FormControl>
    );
  }
}