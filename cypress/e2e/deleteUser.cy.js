import { login, navigateToManageUsers, deleteUser } from './utils';

describe('Manage Users', () => {

    it('Delete User', () => {
      let email = "nichole_schulist66@hotmail.com";

      login();
      navigateToManageUsers();
      deleteUser(email);
    });
});
