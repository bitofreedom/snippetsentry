import { faker } from '@faker-js/faker';
import { login, deleteUser, navigateToPageLink, logout, createUser, checkForConfirmationAlert } from './utils';

const username = 'bitofreedom@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    login(username, password);
});

afterEach(() => {
    logout();
});

class UserProfile {
  constructor(firstName, lastName, email, mobilePhone, admin, sendEmailInvite, notes) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobilePhone = mobilePhone;
    this.admin = admin;
    this.sendEmailInvite = sendEmailInvite;
    this.notes = notes;
  }
}

describe('Manage Users', () => {

  it('Delete User', () => {
    // Generate random user data (using Faker.js) for only the required fields
    const userProfile = new UserProfile(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email()
    );

    navigateToPageLink('Manage Users');
    createUser(userProfile);
    checkForConfirmationAlert();

    // Check for the user in the Users List
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.firstName);
    cy.get('[id="virtualTable"]').should('be.visible').should('contain', userProfile.lastName);

    deleteUser(userProfile);

    // Check that user has been removed from the list / table
    cy.contains('#virtualTable tr', userProfile.firstName).should('not.exist');
    cy.contains('#virtualTable tr', userProfile.lastName).should('not.exist');
    cy.contains('#virtualTable tr', userProfile.email).should('not.exist');
  });
});
