describe('Muditha Lakmali - Portfolio in mobile view', () => {
  beforeEach(() => {

    cy.visit('http://localhost:5173/'); 
  });

  context('mobile View', () => {
    beforeEach(() => {
      cy.viewport(430, 932); 
    });
    
    it('Tc_nav_001 :smoothly scrolls to experience sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#experience"]').click({force: true});
      cy.get('#experience').should('be.visible');
      cy.get('#experience .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_002 :smoothly scrolls to education sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#education"]').click({force: true});  
      cy.get('#education').should('be.visible');
      cy.get('#education .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_003 :smoothly scrolls to publications sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#publications"]').click({force: true});
      cy.get('#publications').should('be.visible');
      cy.get('#publications').find('h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
      cy.get('#publications .content-card').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_004 :smoothly scrolls to hobbies sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#hobbies"]').click({force: true});
      cy.get('#hobbies').should('be.visible');
      // Verify at least one hobby is loaded from Contentful
      cy.get('#hobbies .content-card ul li').should('have.length.greaterThan', 0);
    });
    
    it('Tc_nav_005 :smoothly scrolls to skills sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#skills"]').click({force: true});
      cy.get('#skills').should('be.visible'); 
      cy.get('#skills .content-card ul li').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_006 :smoothly scrolls to honors sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#honors"]').click({force: true});
      cy.get('#honors').should('be.visible'); 
    });
    
    it('Tc_nav_007 :smoothly scrolls to certifications sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#certifications"]').click({force: true});
      cy.get('#certifications').should('be.visible'); 
    });

    it('Tc_nav_010 :smoothly scrolls to affiliations sections', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#affiliations"]').click({force: true});
      cy.get('#affiliations').should('be.visible');
      cy.get('#affiliations .content-card ul li').should('have.length.greaterThan', 0);
    });

    it('Tc_nav_011 :verify projects links', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#projects"]').click({force: true});
      cy.get('#projects').should('be.visible');
    });
  });
});