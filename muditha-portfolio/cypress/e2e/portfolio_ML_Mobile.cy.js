// ============================================================================
// Muditha Lakmali Portfolio – Mobile E2E Test Suite
// Viewport  : 430×932 (iPhone 14 Pro Max)
// Categories: UI · Navigation · Data Display · API
// ============================================================================

describe('Muditha Lakmali Portfolio – Mobile', () => {

  beforeEach(() => {
    cy.viewport(430, 932);
    cy.visit('/');
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 1. UI TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('UI Tests', () => {

    it('TC_UI_M_001 : page title is set correctly', () => {
      cy.title().should('not.be.empty');
    });

    it('TC_UI_M_002 : profile image renders and is not broken', () => {
      cy.get('.profile-img')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'profile');

      cy.get('.profile-img').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });

    it('TC_UI_M_003 : full name is visible on mobile', () => {
      cy.get('.name-hero').should('be.visible').and('not.be.empty');
    });

    it('TC_UI_M_004 : title / tagline is visible on mobile', () => {
      cy.get('.title-tagline').should('be.visible').and('not.be.empty');
    });

    it('TC_UI_M_005 : mail social icon visible on mobile', () => {
      cy.get('.social-links a[href^="mailto:"]').should('be.visible');
    });

    it('TC_UI_M_006 : LinkedIn social icon visible on mobile', () => {
      cy.verifySocialIcon('linkedin');
    });

    it('TC_UI_M_007 : Google Scholar icon visible on mobile', () => {
      cy.verifySocialIcon('researchgate');
    });

    it('TC_UI_M_008 : hamburger button is visible on mobile', () => {
      cy.get('.mobile-menu-btn').should('be.visible');
    });

    it('TC_UI_M_009 : nav menu is hidden before hamburger tap', () => {
      cy.get('.nav-bar').should('not.have.class', 'nav-open');
    });

    it('TC_UI_M_010 : hamburger opens and closes the nav menu', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar').should('have.class', 'nav-open');
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar').should('not.have.class', 'nav-open');
    });

    it('TC_UI_M_011 : nav menu contains all 11 section links when open', () => {
      cy.get('.mobile-menu-btn').click();
      const sections = [
        'about','experience','projects','publications',
        'skills','education','honors','leadership',
        'certifications','affiliations','hobbies',
      ];
      sections.forEach((id) => {
        cy.get(`.nav-bar a[href="#${id}"]`).should('exist');
      });
    });

    it('TC_UI_M_012 : footer is visible on mobile', () => {
      cy.get('footer').scrollIntoView().should('be.visible');
      cy.get('footer p').last().should('contain.text', 'Last Updated');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 2. NAVIGATION TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('Navigation Tests', () => {

    it('TC_NAV_M_001 : navigates to About section', () => {
      cy.mobileNavigateTo('about');
    });

    it('TC_NAV_M_002 : navigates to Experience section', () => {
      cy.mobileNavigateTo('experience');
    });

    it('TC_NAV_M_003 : navigates to Projects section', () => {
      cy.mobileNavigateTo('projects');
    });

    it('TC_NAV_M_004 : navigates to Research & Publications section', () => {
      cy.mobileNavigateTo('publications');
    });

    it('TC_NAV_M_005 : navigates to Skills section', () => {
      cy.mobileNavigateTo('skills');
    });

    it('TC_NAV_M_006 : navigates to Education section', () => {
      cy.mobileNavigateTo('education');
    });

    it('TC_NAV_M_007 : navigates to Honors section', () => {
      cy.mobileNavigateTo('honors');
    });

    it('TC_NAV_M_008 : navigates to Leadership section', () => {
      cy.mobileNavigateTo('leadership');
    });

    it('TC_NAV_M_009 : navigates to Certifications section', () => {
      cy.mobileNavigateTo('certifications');
    });

    it('TC_NAV_M_010 : navigates to Affiliations section', () => {
      cy.mobileNavigateTo('affiliations');
    });

    it('TC_NAV_M_011 : navigates to Hobbies section', () => {
      cy.mobileNavigateTo('hobbies');
    });

    it('TC_NAV_M_012 : nav menu closes after tapping a link', () => {
      cy.get('.mobile-menu-btn').click();
      cy.get('.nav-bar a[href="#experience"]').click({ force: true });
      cy.get('.nav-bar').should('not.have.class', 'nav-open');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 3. DATA DISPLAY TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('Data Display Tests', () => {

    it('TC_DATA_M_001 : About section renders bio text on mobile', () => {
      cy.mobileNavigateTo('about');
      cy.get('#about p').should('have.length.at.least', 2).each(($p) => {
        expect($p.text().trim()).to.not.be.empty;
      });
    });

    it('TC_DATA_M_002 : Experience cards render on mobile', () => {
      cy.mobileNavigateTo('experience');
      cy.verifyContentCards('experience', 1);
      cy.get('#experience .content-card').first().within(() => {
        cy.get('h4').should('not.be.empty');
      });
    });

    it('TC_DATA_M_003 : Projects cards render on mobile', () => {
      cy.mobileNavigateTo('projects');
      cy.verifyContentCards('projects', 1);
    });

    it('TC_DATA_M_004 : Publications renders Journal heading on mobile', () => {
      cy.mobileNavigateTo('publications');
      cy.get('#publications h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
    });

    it('TC_DATA_M_005 : Publications cards have View Paper links on mobile', () => {
      cy.mobileNavigateTo('publications');
      cy.get('#publications .content-card').should('have.length.at.least', 1);
      cy.get('#publications .content-card').first().find('.view-paper-link')
        .should('exist')
        .and('have.attr', 'href')
        .and('include', 'http');
    });

    it('TC_DATA_M_006 : Skills list renders on mobile', () => {
      cy.mobileNavigateTo('skills');
      cy.verifyListItems('skills', 1);
    });

    it('TC_DATA_M_007 : Education cards render on mobile', () => {
      cy.mobileNavigateTo('education');
      cy.verifyContentCards('education', 1);
    });

    it('TC_DATA_M_008 : Honors cards render on mobile', () => {
      cy.mobileNavigateTo('honors');
      cy.verifyContentCards('honors', 1);
    });

    it('TC_DATA_M_009 : Leadership cards render on mobile', () => {
      cy.mobileNavigateTo('leadership');
      cy.verifyContentCards('leadership', 1);
    });

    it('TC_DATA_M_010 : Certifications cards render on mobile', () => {
      cy.mobileNavigateTo('certifications');
      cy.verifyContentCards('certifications', 1);
    });

    it('TC_DATA_M_011 : Affiliations render with external links on mobile', () => {
      cy.mobileNavigateTo('affiliations');
      cy.verifyListItems('affiliations', 1);
      cy.get('#affiliations .content-card ul li').first()
        .find('a')
        .should('have.attr', 'href')
        .and('include', 'http');
    });

    it('TC_DATA_M_012 : Hobbies list renders on mobile', () => {
      cy.mobileNavigateTo('hobbies');
      cy.verifyListItems('hobbies', 1);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 4. API FETCH DATA TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('API Fetch Data Tests', () => {

    it('TC_API_M_001 : Contentful API returns profile data', () => {
      cy.fetchContentfulEntries('profile').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
        expect(res.body.items[0].fields).to.include.keys('firstName', 'lastName', 'email');
      });
    });

    it('TC_API_M_002 : Contentful API returns skills entries', () => {
      cy.fetchContentfulEntries('skills').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
      });
    });

    it('TC_API_M_003 : Contentful API returns projects entries', () => {
      cy.fetchContentfulEntries('projects').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
      });
    });

    it('TC_API_M_004 : Contentful API urls contain linkedin and scholar', () => {
      cy.fetchContentfulEntries('urls').then((res) => {
        expect(res.status).to.eq(200);
        const names = res.body.items.map((i) => i.fields.urlName);
        expect(names).to.include('linkedin');
        expect(names).to.include('scholar');
      });
    });

    it('TC_API_M_005 : Scholar URL from API renders in header on mobile', () => {
      cy.fetchContentfulEntries('urls').then((res) => {
        const scholarEntry = res.body.items.find((i) => i.fields.urlName === 'scholar');
        expect(scholarEntry).to.exist;
        cy.get('.social-links a').should('have.length.at.least', 3);
      });
    });

    it('TC_API_M_006 : education count from API matches rendered cards on mobile', () => {
      cy.fetchContentfulEntries('education').then((res) => {
        const apiCount = res.body.total;
        cy.mobileNavigateTo('education');
        cy.get('#education .content-card').should('have.length', apiCount);
      });
    });
  });
});
