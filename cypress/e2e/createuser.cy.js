describe('Create User Page', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:8000/createuser.php');
  });

  it('should load the create user page correctly', () => {
      cy.get('h2').should('contain', 'Create a User');
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('select[name="gender"]').should('exist');
      cy.get('input[name="balance"]').should('exist');
      cy.get('input[type="submit"]').should('exist');
      cy.get('input[type="reset"]').should('exist');
  });

  it('should validate the form fields', () => {
      cy.get('input[type="submit"]').click();
      cy.on('window:alert', (str) => {
          expect(str).to.equal('Please fill out this field.');
      });

      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[type="submit"]').click();
      cy.get('input[name="email"]:invalid').should('exist');

      cy.get('input[name="balance"]').type('invalid-balance');
      cy.get('input[name="balance"]:invalid').should('exist');
  });

  it('should create a user with valid data', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('select[name="gender"]').select('Male');
      cy.get('input[name="balance"]').type('1000');
      cy.get('input[type="submit"]').click();

      cy.on('window:alert', (str) => {
          expect(str).to.equal('User has been created!');
      });

      cy.url().should('include', '/transfermoney.php');
  });

  it('should reset the form fields', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('select[name="gender"]').select('Male');
      cy.get('input[name="balance"]').type('1000');
      cy.get('input[type="reset"]').click();

      cy.get('input[name="name"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
      cy.get('select[name="gender"]').should('have.value', 'SELECT');
      cy.get('input[name="balance"]').should('have.value', '');
  });

  it('should load the user image correctly', () => {
      cy.get('img').should('have.attr', 'src').and('include', 'img/icon.png'); // Adjust this to match the actual src
  });

  it('should show required field warnings', () => {
      cy.get('input[type="submit"]').click();
      cy.get('input[name="name"]:invalid').should('exist');
      cy.get('input[name="email"]:invalid').should('exist');
      cy.get('select[name="gender"]').then(($select) => {
          if ($select.val() === 'SELECT') {
              cy.wrap($select).should('have.attr', 'required');
          }
      });
      cy.get('input[name="balance"]:invalid').should('exist');
  });

  it('should only accept valid email addresses', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[type="submit"]').click();
      cy.get('input[name="email"]:invalid').should('exist');

      cy.get('input[name="email"]').clear().type('valid.email@example.com');
      cy.get('input[name="email"]:valid').should('exist');
  });

  it('should only accept positive numbers in balance', () => {
      cy.get('input[name="balance"]').clear().type('-1000');
      cy.get('input[type="submit"]').click();
      cy.get('input[name="balance"]').should('have.value', '-1000'); // Check that the value has been input
      cy.get('input[name="balance"]').should('not.have.attr', 'valid');

      cy.get('input[name="balance"]').clear().type('1000');
      cy.get('input[name="balance"]:valid').should('exist');
      cy.get('input[name="balance"]').should('have.value', '1000'); // Check the positive value
  });

  it('should navigate to the correct pages when clicking links', () => {
      cy.contains('Home').click();
      cy.url().should('include', 'index.php');

      cy.contains('Create User').click();
      cy.url().should('include', 'createuser.php');

      cy.contains('Remove User').click();
      cy.url().should('include', 'removeuser.php');

      cy.contains('Transfer Money').click();
      cy.url().should('include', 'transfermoney.php');

      cy.contains('Transaction History').click();
      cy.url().should('include', 'transactionhistory.php');
  });
});
