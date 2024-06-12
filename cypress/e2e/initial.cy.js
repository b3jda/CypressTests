describe('Crown Bank Homepage', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:8000/index.php');
  });

  it('should load the homepage correctly', () => {
      cy.get('title').should('contain', 'Crown Bank');
      cy.get('div.intro img').should('have.attr', 'src').and('include', 'img/bank.png');
      cy.get('div.activity img').should('have.length', 4);
      cy.get('div.activity button').should('have.length', 4);
  });

  it('should have a functioning navbar', () => {
      cy.get('nav').should('exist');
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

  it('should navigate correctly using activity buttons', () => {
      cy.get('div.activity a[href="createuser.php"]').click();
      cy.url().should('include', 'createuser.php');
      cy.go('back');

      cy.get('div.activity a[href="removeuser.php"]').click();
      cy.url().should('include', 'removeuser.php');
      cy.go('back');

      cy.get('div.activity a[href="transfermoney.php"]').click();
      cy.url().should('include', 'transfermoney.php');
      cy.go('back');

      cy.get('div.activity a[href="transactionhistory.php"]').click();
      cy.url().should('include', 'transactionhistory.php');
  });

  it('should load all images in the activity section correctly', () => {
      cy.get('img[src="img/user.jpg"]').should('exist');
      cy.get('img[src="img/ruser.jpg"]').should('exist');
      cy.get('img[src="img/transfer.jpg"]').should('exist');
      cy.get('img[src="img/history.jpg"]').should('exist');
  });

  it('should have correct button styles', () => {
      cy.get('a[href="createuser.php"] button').should('have.css', 'background-color', 'rgb(39, 133, 196)');
      cy.get('a[href="removeuser.php"] button').should('have.css', 'background-color', 'rgb(39, 133, 196)');
      cy.get('a[href="transfermoney.php"] button').should('have.css', 'background-color', 'rgb(39, 133, 196)');
      cy.get('a[href="transactionhistory.php"] button').should('have.css', 'background-color', 'rgb(39, 133, 196)');
  });

  it('should have alt attributes for all images', () => {
      cy.get('img[src="img/bank.png"]').should('have.attr', 'alt', 'Bank Image');
      cy.get('img[src="img/user.jpg"]').should('have.attr', 'alt', 'Create User');
      cy.get('img[src="img/ruser.jpg"]').should('have.attr', 'alt', 'Delete Users');
      cy.get('img[src="img/transfer.jpg"]').should('have.attr', 'alt', 'Make a Transaction');
      cy.get('img[src="img/history.jpg"]').should('have.attr', 'alt', 'Transaction History');
  });

  it('should have correct background color for intro section', () => {
      cy.get('div.intro').should('have.css', 'background-color', 'rgb(125, 136, 146)');
  });

  

  it('should have responsive meta tags', () => {
      cy.get('meta[name="viewport"]').should('have.attr', 'content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
  });

  it('should ensure all buttons are clickable', () => {
      cy.get('div.activity a[href="createuser.php"] button').click({ force: true });
      cy.url().should('include', 'createuser.php');
      cy.go('back');

      cy.get('div.activity a[href="removeuser.php"] button').click({ force: true });
      cy.url().should('include', 'removeuser.php');
      cy.go('back');

      cy.get('div.activity a[href="transfermoney.php"] button').click({ force: true });
      cy.url().should('include', 'transfermoney.php');
      cy.go('back');

      cy.get('div.activity a[href="transactionhistory.php"] button').click({ force: true });
      cy.url().should('include', 'transactionhistory.php');
  });

  it('should have the correct title in the head', () => {
      cy.title().should('eq', 'Crown Bank');
  });
});
