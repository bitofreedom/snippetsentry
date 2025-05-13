import { faker } from '@faker-js/faker';

export default class UserProfile {
  constructor(
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    email = faker.internet.email(),
    // mobilePhone = `303${faker.string.numeric(7)}`,
    mobilePhone = '3035147968',
    admin = false,
    sendEmailInvite = false,
    notes = 'default test note'
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobilePhone = mobilePhone;
    this.admin = admin;
    this.sendEmailInvite = sendEmailInvite;
    this.notes = notes;
  }

//   // Optional: Add helper methods
//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
}