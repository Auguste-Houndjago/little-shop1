import { Country } from 'country-state-city';

// Obtenir la liste des pays
const COUNTRIES = Country.getAllCountries();

// Définir le type `SelectMenuOption` basé sur la structure des objets dans `COUNTRIES`
export type SelectMenuOption = {
  isoCode: string; // ISO code du pays
  name: string; // Nom du pays
};

// Mapper `COUNTRIES` pour correspondre à ce type
export const countryOptions: SelectMenuOption[] = COUNTRIES.map(country => ({
  isoCode: country.isoCode,
  name: country.name,
}));


export interface Timezones {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface ICountry {
  name: string;
  phonecode: string;
  isoCode: string;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones?: Timezones[];
  getAllCountries?(): ICountry[];
  getCountryByCode?(): ICountry;
}
export interface IState {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude?: string | null;
  longitude?: string | null;
  getStatesOfCountry?(): IState[];
  getStateByCodeAndCountry?(): IState;
  getStateByCode?(): IState;
}
export interface ICity {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string | null;
  longitude?: string | null;
  getAllCities?(): ICity[];
  getCitiesOfState?(): ICity[];
  getCitiesOfCountry?(): ICity[];
}
