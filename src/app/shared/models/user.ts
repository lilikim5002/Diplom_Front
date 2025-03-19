export interface User {
  telegram: string;
  displayName: string;
  token: string;
  phoneNumber: string;
}

export interface Address {
  [x: string]: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}
