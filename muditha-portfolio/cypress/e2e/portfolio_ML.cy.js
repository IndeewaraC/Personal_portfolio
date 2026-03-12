describe('Muditha Lakmali - Portfolio', () => {
  //The test cases are following in this suite runs with staging environment locally http://localhost:5173/
  //Version control is with GIithub and useing Cypress for testing.

  beforeEach(() => {
    cy.visit('http://localhost:5173/'); });

  context('Desktop View', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);      }); });

      
    it('Tc_nav_001 :smoothly scrolls to experience sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#experience"]').click();
      cy.url().should('include', '#experience');
      cy.get('#experience').should('be.visible');
      cy.get('#experience .content-card').should('have.length.greaterThan', 0);
      cy.get('#experience .content-card').should('be.visible');
    });

    it('Tc_nav_002 :smoothly scrolls to education sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#education"]').click();
      cy.url().should('include', '#education');
      cy.get('#education').should('be.visible');
      cy.get('#education .content-card').should('have.length.greaterThan', 0);
      cy.get('#education .content-card').should('be.visible');
    });

    it('Tc_nav_003 :smoothly scrolls to publications sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#publications"]').click();
      cy.url().should('include', '#publications');
      cy.get('#publications').should('be.visible');
      cy.get('#publications').find('h5').contains('CONFERENCE PRESENTATIONS').should('be.visible');
      cy.get('#publications').find('h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
       cy.get('#publications .content-card').should('have.length.greaterThan', 0);
      cy.get('#publications .content-card').should('be.visible');
     });

    it('Tc_nav_004 :smoothly scrolls to hobbies sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#hobbies"]').click();
      cy.url().should('include', '#hobbies');
      cy.get('#hobbies').should('be.visible');
      cy.get('#hobbies .skills-grid .content-card').should('have.length.greaterThan', 0);
      cy.get('#hobbies .skills-grid .content-card').should('be.visible');
    });
    
    it('Tc_nav_005 :smoothly scrolls to skills sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#skills"]').click();
      cy.url().should('include', '#skills');
      cy.get('#skills').should('be.visible'); 
      cy.get('#skills .skills-grid .content-card').should('be.visible'); 
      cy.get('#skills .skills-grid .content-card').should('have.length.greaterThan', 0);
      cy.get('#skills .skills-grid .content-card').find('h4').should('be.visible');
      cy.get('#skills .skills-grid .content-card .skill-tag').should('exist').and('have.length.greaterThan', 0);


    });

    it('Tc_nav_005 :smoothly scrolls to honors sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#honors"]').click();
      cy.url().should('include', '#honors');
      cy.get('#honors').should('be.visible'); });
    
    it('Tc_nav_005 :smoothly scrolls to certifications sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#certifications"]').click();
      cy.url().should('include', '#certifications');
      cy.get('#certifications').should('be.visible'); });

    it('Tc_nav_005 :smoothly scrolls to about sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#about"]').click();
      cy.url().should('include', '#about');
      cy.get('#about').should('be.visible'); });

    it('Tc_nav_005 :smoothly scrolls to leadership sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#leadership"]').click();
      cy.url().should('include', '#leadership');
      cy.get('#leadership').should('be.visible'); });
    it('Tc_nav_005 :smoothly scrolls to affiliations sections when desktop nav is clicked', () => {
      cy.get('.nav-bar a[href="#affiliations"]').click();
      cy.url().should('include', '#affiliations');
      cy.get('#affiliations').should('be.visible'); });

//verify the cards are visible in each section when scrolled to the sections.
    it('Tc_card_001 :verify the experience cards are visible when scrolled to experience section', () => {
      cy.get('.nav-bar a[href="#experience"]').click();
      cy.get('#experience .content-card').should('have.length.greaterThan', 0);
      cy.get('#experience .content-card').should('be.visible'); });

    });