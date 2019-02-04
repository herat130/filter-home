import React from 'react';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let { apartment, limit = 3 } = this.props;
    return (apartment.amenities || []).filter((v, k) => k < limit).map(item => {
      return (
        <span key={item} className="_1h9l4w0vvX6d56ZnJ3NLod">
          <i></i>
          <span>{item}</span>
        </span>
      );
    });
  }
}
