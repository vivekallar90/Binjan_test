describe('CrowdStreet Account Creation and Profile Update', () => {
  it('should create a new account and update the profile', () => {
    // Visit the CrowdStreet sales website
    cy.visit('https://sales.crowdstreet.com/');

    // Click the 'Create an Account' button
    cy.contains('Create an Account').click();

    // Fill out the registration form
    cy.get('#firstName').type('Binjan');
    cy.get('#lastName').type('Binjan1');
    cy.get('#email').type('binjan@test.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('#agreeToTerms').check();
    cy.get('#registerButton').click();

    // Skip email verification modal
    cy.contains('Skip, I\'ll do this later').click();

    // Navigate to Profile and Settings
    cy.get('.account-dropdown').click();
    cy.contains('Profile and Settings').click();

    // Fill out profile information
    cy.contains('Profile').click();
    cy.get('#streetAddress1').type('123 Main St');
    cy.get('#city').type('Seattle');
    cy.get('#state').select('WA');
    cy.get('#zip').type('98101');
    cy.get('#phone').type('(555) 555-1212');

    // Upload government-issued photo ID
    const fileName = 'example.png'; // replace with actual file name
    cy.get('input[type="file"]').attachFile(fileName);

    // Bonus: answer additional question and fill out required fields
    cy.contains('Employed by, or associated with, a broker-dealer firm or a financial services regulatory agency?')
      .parent().next().within(() => {
        cy.contains('Yes').click();
        cy.get('#firmName').type('Acme Brokerage');
        cy.get('#jobTitle').type('Financial Advisor');
      });

    // Save profile information
    cy.contains('Save').click();
// Find and click the "Yes" radio button for the associated question
cy.contains('Are you, your spouse, or any other dependents employed by, or associated with, a broker-dealer firm or a financial services regulatory agency?')
  .closest('div')
  .find('[type="radio"][value="Yes"]')
  .check();

// Find and fill out the required fields that are now visible
cy.get('#brokerDealerFirm').type('My Broker Dealer Firm');
cy.get('#employmentTitle').type('My Employment Title');
cy.get('#employmentStartDate').type('2022-01-01');
cy.get('#associatedPersonName').type('My Associated Person Name');
  });
});
