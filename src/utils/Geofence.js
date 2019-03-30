import RESTClient from './RESTClient';

export default (token) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        RESTClient.User
          .geoFence(token, coords.latitude, coords.longitude)
          .then(() => resolve(false))
          .catch(() => resolve(true));
      },
      () => reject()
    );
  });
};
