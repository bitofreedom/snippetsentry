/*
Hi Jeremy: I ultimately gave up on this one as it was taking too much time to figure out. 
I was hoping to be able to preserve session state across multiple test scenarios, but I couldn't get it to work.
*/

import { login, logout, navigateToPageLink } from './utils';

const username = 'bitofreedom@gmail.com';
const password = 'Password123!';

describe('Navigation Tests', () => {
  before(() => {
    // Cache session with setup function
    cy.session('admin', () => {
      login(username, password);
    }, {
      cacheAcrossSpecs: true // Optional: share session across test files
    });
  });

  beforeEach(() => {
    // Restore session by re-running the same setup
    cy.session('admin', () => {
      login(username, password);
    });
    
    // Optional: Add a visibility check to ensure login completed
    cy.contains('Dashboard').should('be.visible');
  });

  after(() => {
    logout();
  });

  before(() => {
    // Log in once before all tests
    login(username, password);
  });

  after(() => {
    // Log out once after all tests
    logout();
  });

  it('Navigate to Dashboard', () => {
    navigateToPageLink('Dashboard');
    cy.contains('Message Traffic By Channel Type').should('be.visible');
  });

  it('Navigate to Manage Users', () => {
    navigateToPageLink('Manage Users');
    cy.contains('Users List').should('be.visible');
  });

  it('Navigate to Advanced Features', () => {
    navigateToPageLink('Advanced Features');
    cy.contains('SentryWatch').should('be.visible');
  });

  it('Navigate to Admin Resources', () => {
    navigateToPageLink('Admin Resources');
    cy.get('iframe').should('be.visible');
  });

  it('Navigate to Channel Dashboard', () => {
    navigateToPageLink('Channel Dashboard');
    cy.contains('Channel').should('be.visible');
    cy.contains('STATUS').should('be.visible');
    cy.contains('Last Updated').should('be.visible');
  });
});