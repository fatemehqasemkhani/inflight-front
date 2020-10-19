// ****************** Get flights ****************** //
export const getFlights = () => 'http://localhost:5000/api/flights';

// ****************** Update Flights = () =>
export const updateFlight = id => `http://localhost:5000/api/flights/${id}`;

// ****************** Delete flight ****************** //
export const deleteFlight = id => `http://localhost:5000/api/flights/${id}`;

// ****************** Get Status ****************** //
export const getStatuses = () => `http://localhost:5000/api/status`;
