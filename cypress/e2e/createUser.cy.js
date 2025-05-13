import { faker } from '@faker-js/faker';
import { login, navigateToManageUsers, createUser, checkForConfirmation, logout, navigateToPageLink } from './utils';

const username = 'bitofreedom@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    login(username, password);
});

afterEach(() => {
    logout();
});

function UserProfile(firstName, lastName, email, mobilePhone, admin, sendEmailInvite, notes) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;     
  this.mobilePhone = mobilePhone;
  this.admin = admin;
  this.sendEmailInvite = sendEmailInvite;
  this.notes = notes;
}

describe('Manage Users', () => {

  it('Can Create User w/ All Input Fields', () => {

    // Generate random user data using Faker.js
    const userProfile = new UserProfile(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email(),
      `303${faker.string.numeric(7)}`,
      false,
      false,
      faker.lorem.sentence()
    );

    navigateToPageLink('Manage Users');
    createUser(userProfile);

    // Check for confirmation popup
    checkForConfirmation();

    // Check for the user in the list
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);
  });

  it('Can Create User w/ Minimum Input Fields', () => {
    // Generate random user data (using Faker.js) for only the required fields
    const userProfile = new UserProfile(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email()
    );

    navigateToPageLink('Manage Users');
    createUser(userProfile);
    // checkForConfirmation();
  });

});
