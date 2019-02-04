
export default function (Users, Locations) {

  const apartmentsResolvers = {
    Apartments: {
      location: (apartment) => {
        return Locations.find({ query: { _id: { $in: [apartment.location] } } }).then(result => result[0]);
      },
      owner: (apartment) => {
        return Users.find({ query: { _id: apartment.owner } }).then(result => result[0]);
      },
      details: (apartment) => {
        return apartment.detail;
      }
    }
  };

  return apartmentsResolvers;
}
