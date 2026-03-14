import { skillsData } from '../../src/data/skills';
import {hobbiesData} from '../../src/data/hobbies';
import {affiliationsData} from '../../src/data/affiliations';

describe('Muditha Lakmali - Portfolio in mobile view', () => {
  //The test cases are following in this suite runs with staging environment locally http://localhost:5173/
  //Version control is with GIithub and useing Cypress for testing.

  beforeEach(() => {
    cy.visit('http://localhost:5173/'); });

  context('mobile View', () => {
    beforeEach(() => {
      cy.viewport(430, 932);      });
    
    it('Tc_nav_001 :smoothly scrolls to experience sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#experience"]').click({force: true});
      cy.url().should('include', '#experience');
      cy.get('#experience').should('be.visible');
      cy.get('#experience .content-card').should('have.length.greaterThan', 0);
      cy.get('#experience .content-card').should('be.visible');
    });

    it('Tc_nav_002 :smoothly scrolls to education sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#education"]').click({force: true});
      cy.url().should('include', '#education');
      cy.get('#education').should('be.visible');
      cy.get('#education .content-card').should('have.length.greaterThan', 0);
      cy.get('#education .content-card').should('be.visible');
    });

    it('Tc_nav_003 :smoothly scrolls to publications sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#publications"]').click({force: true});
      cy.url().should('include', '#publications');
      cy.get('#publications').should('be.visible');
      cy.get('#publications').find('h5').contains('CONFERENCE PRESENTATIONS').should('be.visible');
      cy.get('#publications').find('h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
       cy.get('#publications .content-card').should('have.length.greaterThan', 0);
      cy.get('#publications .content-card').should('be.visible');
     });

    it('Tc_nav_004 :smoothly scrolls to hobbies sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#hobbies"]').click({force: true});
      cy.url().should('include', '#hobbies');
      cy.get('#hobbies').should('be.visible');
      cy.get('#hobbies .content-card ul li').as('hobbyItems');

      cy.get('@hobbyItems').should('have.length',hobbiesData.length); });
    
    it('Tc_nav_005 :smoothly scrolls to skills sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#skills"]').click({force: true});
      cy.url().should('include', '#skills');
      cy.get('#skills').should('be.visible'); 
      cy.get('#skills .content-card ul li').as('skillItems');
      cy.get('@skillItems').should('have.length', skillsData.length);

    cy.get('@skillItems').each(($li, index) => {
    cy.wrap($li)
      .find('strong')
      .should('contain.text', skillsData[index].category);

      if (skillsData[index].items) {
      skillsData[index].items.forEach((skillItem) => {
        cy.wrap($li).should('contain.text', skillItem);
      });
    }
    });
    });

    it('Tc_nav_006 :smoothly scrolls to honors sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#honors"]').click({force: true});
      cy.url().should('include', '#honors');
      cy.get('#honors').should('be.visible'); });
    
    it('Tc_nav_007 :smoothly scrolls to certifications sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#certifications"]').click({force: true});
      cy.url().should('include', '#certifications');
      cy.get('#certifications').should('be.visible'); });

    it('Tc_nav_008 :smoothly scrolls to about sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#about"]').click({force: true});
      cy.url().should('include', '#about');
      cy.get('#about').should('be.visible'); });

    it('Tc_nav_009 :smoothly scrolls to leadership sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#leadership"]').click({force: true});
      cy.url().should('include', '#leadership');
      cy.get('#leadership').should('be.visible'); });
    it('Tc_nav_010 :smoothly scrolls to affiliations sections when desktop nav is clicked', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#affiliations"]').click({force: true});
      cy.url().should('include', '#affiliations');
      cy.get('#affiliations').should('be.visible'); });

    it('Tc_nav_011 :smoothly scrolls to affiliations sections when desktop nav is clicked and verify Data', () => {
      cy.get('.mobile-menu-btn').click();
        cy.get('.nav-bar a[href="#affiliations"]').click({force: true});
      cy.url().should('include', '#affiliations');
      cy.get('#affiliations').should('be.visible');

      cy.get('#affiliations .content-card ul li').as('affiliationItems');

      cy.get('@affiliationItems').should('have.length', affiliationsData.length);

     cy.get('@affiliationItems').each(($li, index) => {
     cy.wrap($li)
      .find('strong')
      .should('contain.text', affiliationsData[index].name);

     cy.wrap($li)
          .find('a')
          .should('have.attr', 'href', affiliationsData[index].link)
          .and('contain.text', affiliationsData[index].link);
    });

         });
    
    });
    });