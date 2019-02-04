import React from 'react';
import { connect } from 'react-redux';
import { updateAppliedFilter } from '../actions/searchAction';
import MultiSelect from '../components/MultiSelect';
import RangeSliderInput from '../components/RangeSliderInput';

class SearchFilter extends React.Component {

  changeOption = (selectedValue, filterId) => {
    this.props.updateAppliedFilter(selectedValue, filterId);
  }

  renderFilters() {
    const { filters } = this.props;
    return filters.map(filter => {
      if (filter.type === 'multiSelectFilter') {
        return (
          <div key={filter.id} className="col-4 float-left">
            <MultiSelect
              filterName={filter.id}
              optionsList={filter.values}
              selectedList={filter.selectedValues}
              changeOption={this.changeOption}
            />
          </div>
        )
      } else {
        let selectedValues = filter.selectedValues;
        const min = Math.min.apply([], filter.values);
        const max = Math.max.apply([], filter.values);
        if (selectedValues.length === 0) {
          selectedValues = { min, max };
        } else {
          selectedValues = { min: selectedValues[0], max: selectedValues[1] };
        }
        return (
          <div key={filter.id} className="col-4 float-left">
            <RangeSliderInput
              filterName={filter.id}
              displayName={filter.displayName}
              min={min}
              max={max}
              selectedValues={selectedValues}
              changeOption={this.changeOption}
            />
          </div>
        )
      }
    })
  }

  renderSelectedFilters() {
    const { filters } = this.props;
    return filters.filter(f => f.selectedValues.length !== 0).map(v => {
      if (v.type === 'multiSelectFilter') {
        return <span className="filter-label">{v.displayName} : {v.selectedValues.join(',')}</span>
      } else {
        return (
          <span className="filter-label">{`${v.displayName} : ${v.selectedValues[0]} - ${v.selectedValues[1]}`}</span>
        )
      }
    })
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <form>
            {this.renderFilters()}
          </form>
        </div>
        <div style={{ height: '20px', clear: 'both' }} />
        <div className="col-12 float-left">
          {this.renderSelectedFilters()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.searchReducer.loading,
    filters: state.searchReducer.filters,
  };
};

export default connect(mapStateToProps, {
  updateAppliedFilter,
})(SearchFilter);