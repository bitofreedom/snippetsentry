import { faker } from '@faker-js/faker';
import { login, navigateToManageUsers, createUser, checkForConfirmation } from './utils';

describe('Manage Users', () => {

    it('Create User', () => {
      let fName = faker.name.firstName();
      let lName = faker.name.lastName();
      let email = faker.internet.email();

      login();
      navigateToManageUsers();
      createUser(fName, lName, email);
      checkForConfirmation();
    });

});
