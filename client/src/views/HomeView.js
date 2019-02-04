import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchApartmentsList } from './../actions/apartmentsListActions';
import ApartmentTileView from "./ApartmentTileView";
import selectApartments from '../selectors/apartment.selector';
import SearchFilter from './SearchFilter';

class HomeView extends React.Component {

  componentDidMount() {
    this.props.fetchApartmentsList();
  }

  locationFilter(apartment) {
    const { filters } = this.props;
    const appliedFilter = filters.find(v => v.id === 'location');
    if (appliedFilter.selectedValues.length !== 0) {
      return (appliedFilter.selectedValues || []).indexOf((apartment[appliedFilter.id] || {}).title) !== -1;
    } else {
      return true;
    }
  }

  rangeFilter(apartment, field) {
    const { filters } = this.props;
    const appliedFilter = filters.find(v => v.id === field);
    if (appliedFilter.selectedValues.length !== 0) {
      const minValue = appliedFilter.selectedValues[0];
      const maxValue = appliedFilter.selectedValues[1];
      return apartment[field] >= minValue && apartment[field] <= maxValue
    } else {
      return true;
    }
  }

  amenitiesFilter(apartment) {
    const { filters } = this.props;
    const appliedFilter = filters.find(v => v.id === 'amenities');
    if (appliedFilter.selectedValues.length !== 0) {
      return appliedFilter.selectedValues.every(v => {
        return [...apartment[appliedFilter.id]].indexOf(v) !== -1;
      });
    } else {
      return true;
    }
  }

  detailsFilter(apartment, searchField) {
    const { filters } = this.props;
    const appliedFilter = filters.find(v => v.id === searchField);
    if (appliedFilter.selectedValues.length !== 0) {
      return (appliedFilter.selectedValues || []).indexOf(((apartment['details'][searchField]) || 0).toString()) !== -1;
    } else {
      return true;
    }
  }

  appliedFilters() {
    const { filters, apartmentsList } = this.props;
    const { items: allApartments } = { ...apartmentsList };
    const appliedFilters = filters.filter(v => v.selectedValues.length !== 0);

    if (appliedFilters.length === 0) {
      return allApartments || [];
    }
    return allApartments
      .filter(apartment => this.locationFilter(apartment))
      .filter(apartment => this.rangeFilter(apartment, 'size'))
      .filter(apartment => this.rangeFilter(apartment, 'price'))
      .filter(apartment => this.amenitiesFilter(apartment))
      .filter(apartment => this.detailsFilter(apartment, 'rooms'))
      .filter(apartment => this.detailsFilter(apartment, 'bedrooms'))
      .filter(apartment => this.detailsFilter(apartment, 'floor'))
      .filter(apartment => this.detailsFilter(apartment, 'bathrooms'));
  }

  render() {
    let { apartmentsList } = { ...this.props };
    if (!Object.keys(apartmentsList || {}).length) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <SearchFilter />
        <div className="container-list container-lg clearfix">
          <div className="col-12 float-left">
            <div className="view-apartment-list">
              {(this.appliedFilters() || []).map((item, index) => (
                <ApartmentTileView key={index} apartment={item} />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  const location = props.match.params.location;
  return {
    apartmentsList: selectApartments(state, location) || {},
    filters: state.searchReducer.filters || [],
  };
};

export default withRouter(connect(mapStateToProps, { fetchApartmentsList })(HomeView))
