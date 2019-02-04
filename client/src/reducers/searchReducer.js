import { removeDuplicate } from '../utils/common'
import { FETCH_APARTMENTS_LIST, UPDATE_APPLIED_FILTER } from '../actions/types';

const initialState = {
  loading: true,
  filters: getFilterInitialConfiguration(),
};

function getFilterInitialConfiguration() {
  return [
    {
      id: 'location',
      displayName: 'City',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    },
    {
      id: 'size',
      displayName: 'Size [m*m]',
      values: [],
      selectedValues: [],
      type: 'rangeFilter'
    },
    {
      id: 'price',
      displayName: 'Price [euros]',
      values: [],
      selectedValues: [],
      type: 'rangeFilter',
    },
    {
      id: 'amenities',
      displayName: 'Amenities',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    },
    {
      id: 'rooms',
      displayName: 'Rooms',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    },
    {
      id: 'bedrooms',
      displayName: 'Bed-Rooms',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    },
    {
      id: 'floor',
      displayName: 'Floor',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    },
    {
      id: 'bathrooms',
      displayName: 'BathRooms',
      values: [],
      selectedValues: [],
      type: 'multiSelectFilter',
    }
  ];
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APARTMENTS_LIST:
      const revisedFilter = getFilterDetails(action.payload.apartments.items);
      const filters = [...state.filters];
      const filterWithValues = (filters || []).map(v => {
        const filterFound = revisedFilter[v.id] || {};
        return Object.assign({}, v, { values: filterFound.values });
      })
      return Object.assign({}, state, {
        loading: false,
        filters: filterWithValues,
      });
    case UPDATE_APPLIED_FILTER:
      const filterKey = action.payload.selectedKey;
      const filterValue = action.payload.selectedValues;
      const foundFilterIndex = state.filters.findIndex(v => v.id === filterKey);
      const revisedFilters = ([...state.filters] || []).map((value, index) => {
        if (index === foundFilterIndex) {
          return Object.assign({}, value, { selectedValues: filterValue })
        } else {
          return value;
        }
      })
      return Object.assign({}, state, {
        filters: revisedFilters,
      })
    default:
      return state;
  }
}

function getFilterDetails(allApartments) {
  const locations = (allApartments || []).map(v => v.location.title);
  const amenities = Array.prototype.concat.apply([], (allApartments || []).map(v => v.amenities));
  const price = (allApartments || []).map(v => Number(v.price || 0));
  const size = (allApartments || []).map(v => Number(v.size || 0));
  const rooms = (allApartments || []).map(v => Number(v.details.rooms || 0));
  const bedrooms = (allApartments || []).map(v => Number(v.details.bedrooms || 0));
  const floor = (allApartments || []).map(v => Number(v.details.floor || 0));
  const bathrooms = (allApartments || []).map(v => Number(v.details.bathrooms || 0));

  return {
    location: { values: removeDuplicate(locations) },
    amenities: { values: removeDuplicate(amenities) },
    price: { values: removeDuplicate(price) },
    size: { values: removeDuplicate(size) },
    rooms: { values: removeDuplicate(rooms) },
    bedrooms: { values: removeDuplicate(bedrooms) },
    floor: { values: removeDuplicate(floor) },
    bathrooms: { values: removeDuplicate(bathrooms) },
  }
}
