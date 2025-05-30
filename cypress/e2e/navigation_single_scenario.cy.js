import { login, logout, navigateToPageLink, visitPage } from './utils';

const username = 'bitofreedom@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    login(username, password);
});

afterEach(() => {
    logout();
});

describe('Manage Users', () => {

  it('Navigate to all primary navigation links', () => {
    navigateToPageLink('Dashboard');
    // Assert on correct page
    cy.contains('Message Traffic By Channel Type').should('be.visible');

    navigateToPageLink('Manage Users');
    // Assert on correct page
    cy.contains('Users List').should('be.visible');

    navigateToPageLink('Advanced Features');
    // Assert on correct page
    cy.contains('SentryWatch').should('be.visible');

    navigateToPageLink('Admin Resources');
    // Assert on correct page - verify iFrame has loaded
    cy.get('iframe').should('be.visible');

    navigateToPageLink('Channel Dashboard');
    // Assert on correct page
    cy.contains('Channel').should('be.visible');
    cy.contains('STATUS').should('be.visible');
    cy.contains('Last Updated').should('be.visible');
  });
  
});
