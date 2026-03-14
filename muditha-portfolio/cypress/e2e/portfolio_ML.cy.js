describe('Muditha Lakmali - Portfolio', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  context('Desktop View', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080); 
    });
    
    it('Tc_nav_001 :smoothly scrolls to experience sections', () => {
      cy.get('.nav-bar a[href="#experience"]').click();
      cy.get('#experience').should('be.visible');
      cy.get('#experience .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_002 :smoothly scrolls to education sections', () => {
      cy.get('.nav-bar a[href="#education"]').click();
      cy.get('#education').should('be.visible');
      cy.get('#education .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_003 :smoothly scrolls to publications sections', () => {
      cy.get('.nav-bar a[href="#publications"]').click();
      cy.get('#publications').should('be.visible');
      cy.get('#publications').find('h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
      cy.get('#publications .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_004 :smoothly scrolls to hobbies sections', () => {
      cy.get('.nav-bar a[href="#hobbies"]').click({force: true});
      cy.get('#hobbies').should('be.visible');
      // Verify that the list of hobbies from Contentful is not empty
      cy.get('#hobbies .content-card ul li').should('have.length.greaterThan', 0);
    });
    
    it('Tc_nav_005 :smoothly scrolls to skills sections', () => {
      cy.get('.nav-bar a[href="#skills"]').click();
      cy.get('#skills').should('be.visible'); 
      cy.get('#skills .content-card ul li').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_006 :smoothly scrolls to honors sections', () => {
      cy.get('.nav-bar a[href="#honors"]').click();
      cy.get('#honors').should('be.visible'); 
    });
    
    it('Tc_nav_007 :smoothly scrolls to certifications sections', () => {
      cy.get('.nav-bar a[href="#certifications"]').click();
      cy.get('#certifications').should('be.visible'); 
    });

    it('Tc_nav_010 :smoothly scrolls to affiliations sections', () => {
      cy.get('.nav-bar a[href="#affiliations"]').click();
      cy.get('#affiliations').should('be.visible');
      // Verify items are rendering
      cy.get('#affiliations .content-card ul li').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_011 :verify affiliation links are present', () => {
      cy.get('.nav-bar a[href="#affiliations"]').click();
      // Ensure the first affiliation card has a valid link format
      cy.get('#affiliations .content-card ul li').first().find('a').should('have.attr', 'href').and('include', 'http');
    });

    it('Tc_nav_012 :verify projects', () => {
      cy.get('.nav-bar a[href="#projects"]').click();
      cy.get('#projects').should('be.visible');
    });
  });
});