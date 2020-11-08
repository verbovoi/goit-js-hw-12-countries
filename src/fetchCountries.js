const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export function fetchCountry(country) {
  return fetch(`${BASE_URL}/${country}`).then(response =>
    response.json(),
  );
}


