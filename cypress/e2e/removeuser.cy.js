describe('Remove User Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/removeuser.php');
  });

  it('should load the remove user page correctly', () => {
    cy.get('title').should('contain', 'Remove User');
    cy.get('h2').should('contain', 'Remove Users');
    cy.get('table').should('exist');
  });

  it('should have a functioning navbar', () => {
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

  it('should have the correct table structure', () => {
    cy.get('table').within(() => {
      cy.get('thead').should('exist');
      cy.get('th').should('have.length', 5);
      cy.get('th').eq(0).should('contain', '#');
      cy.get('th').eq(1).should('contain', 'Name');
      cy.get('th').eq(2).should('contain', 'Gender');
      cy.get('th').eq(3).should('contain', 'Total Balance');
      cy.get('th').eq(4).should('contain', 'Action');
    });
  });

  it('should display user information in the table', () => {
    cy.get('table tbody tr').each(($row, index) => {
      cy.wrap($row).within(() => {
        cy.get('td').should('have.length', 5);
        cy.get('td').eq(0).should('contain', index + 1);
        cy.get('td').eq(1).should('not.be.empty');
        cy.get('td').eq(2).should('not.be.empty');
        cy.get('td').eq(3).should('contain', 'Rs.');
        cy.get('td').eq(4).find('button').should('contain', 'Remove');
      });
    });
  });

  it('should have functional remove buttons', () => {
    cy.get('table tbody tr').as('rows');
    cy.get('@rows').should('have.length.greaterThan', 0);

    cy.get('@rows').first().then(($row) => {
      cy.wrap($row).find('button').click();
      cy.on('window:confirm', () => true); // Automatically confirm the alert
      cy.wrap($row).should('not.exist'); // Confirm that the row is removed
    });
  });


  it('should have a responsive table', () => {
    cy.viewport('iphone-6');
    cy.get('table').should('be.visible');
    cy.viewport('macbook-15');
    cy.get('table').should('be.visible');
  });


  it('should ensure all scripts are loaded', () => {
    cy.window().then((win) => {
      expect(win.jQuery).to.exist;
      expect(win.bootstrap).to.exist;
    });
  });


});
