import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';

export default class MultiSelect extends React.Component {

  changeOption = (e,filterId) => {
    this.props.changeOption(e.target.value,filterId);
  }

  render() {
    const { optionsList, filterName, selectedList } = this.props;    
    return (
      <FormControl className="col-12">
        <InputLabel htmlFor="select-multiple-checkbox">{filterName}</InputLabel>
        <Select
          multiple
          value={selectedList}
          onChange={(e) => this.changeOption(e, filterName)}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selectedList => (selectedList || []).join(', ')}
          autoWidth={false}
        >
          {(optionsList || []).map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedList.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}