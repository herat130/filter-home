export default function selectApartments(state, location) {
  if (location) {
    return {
      items: (((state.apartmentsList || {}).apartments || {}).items || [])
        .filter(v => (v.location._id) === location)
    };
  } else {
    return (state.apartmentsList || {}).apartments;
  }
}