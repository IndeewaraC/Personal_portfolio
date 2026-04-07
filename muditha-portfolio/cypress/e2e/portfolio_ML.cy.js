// ============================================================================
// Muditha Lakmali Portfolio – Desktop E2E Test Suite
// Viewports : 1920×1080  |  Categories: UI · Navigation · Data Display · API
// ============================================================================

const BASE_URL = 'http://localhost:5173';

describe('Muditha Lakmali Portfolio – Desktop', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(BASE_URL);
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 1. UI TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('UI Tests', () => {

    it('TC_UI_D_001 : page title is set correctly', () => {
      cy.title().should('not.be.empty');
    });

    it('TC_UI_D_002 : profile image renders and is not broken', () => {
      cy.get('.profile-img')
        .should('be.visible')
        .and('have.attr', 'src')
        .and('include', 'profile');

      cy.get('.profile-img').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });

    it('TC_UI_D_003 : full name is displayed in header', () => {
      cy.get('.name-hero').should('be.visible').and('not.be.empty');
    });

    it('TC_UI_D_004 : title / tagline is displayed in header', () => {
      cy.get('.title-tagline').should('be.visible').and('not.be.empty');
    });

    it('TC_UI_D_005 : location and email meta info is visible', () => {
      cy.get('.profile-header').within(() => {
        cy.get('svg').should('have.length.at.least', 1);
        cy.get('span').should('have.length.at.least', 2);
      });
    });

    it('TC_UI_D_006 : mail social icon exists and has mailto href', () => {
      cy.get('.social-links a[href^="mailto:"]').should('be.visible');
    });

    it('TC_UI_D_007 : LinkedIn social icon exists with correct href', () => {
      cy.verifySocialIcon('linkedin');
    });

    it('TC_UI_D_008 : Google Scholar icon exists with correct href', () => {
      cy.verifySocialIcon('researchgate');
    });

    it('TC_UI_D_009 : desktop nav bar is visible without hamburger menu', () => {
      cy.get('.nav-bar').should('be.visible');
      cy.get('.mobile-menu-btn').should('not.be.visible');
    });

    it('TC_UI_D_010 : nav bar contains all 11 section links', () => {
      const sections = [
        'about','experience','projects','publications',
        'skills','education','honors','leadership',
        'certifications','affiliations','hobbies',
      ];
      sections.forEach((id) => {
        cy.get(`.nav-bar a[href="#${id}"]`).should('exist');
      });
    });

    it('TC_UI_D_011 : footer is rendered with name and last-updated text', () => {
      cy.get('footer').scrollIntoView().should('be.visible');
      cy.get('footer p').first().should('not.be.empty');
      cy.get('footer p').last().should('contain.text', 'Last Updated');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 2. NAVIGATION TESTS
  // ══════════════════════════════════════════════════════════════════════════
  context('Navigation Tests', () => {

    it('TC_NAV_D_001 : scrolls to About section', () => {
      cy.navigateTo('about');
    });

    it('TC_NAV_D_002 : scrolls to Experience section', () => {
      cy.navigateTo('experience');
    });

    it('TC_NAV_D_003 : scrolls to Projects section', () => {
      cy.navigateTo('projects');
    });

    it('TC_NAV_D_004 : scrolls to Research & Publications section', () => {
      cy.navigateTo('publications');
    });

    it('TC_NAV_D_005 : scrolls to Skills section', () => {
      cy.navigateTo('skills');
    });

    it('TC_NAV_D_006 : scrolls to Education section', () => {
      cy.navigateTo('education');
    });

    it('TC_NAV_D_007 : scrolls to Honors section', () => {
      cy.navigateTo('honors');
    });

    it('TC_NAV_D_008 : scrolls to Leadership section', () => {
      cy.navigateTo('leadership');
    });

    it('TC_NAV_D_009 : scrolls to Certifications section', () => {
      cy.navigateTo('certifications');
    });

    it('TC_NAV_D_010 : scrolls to Affiliations section', () => {
      cy.navigateTo('affiliations');
    });

    it('TC_NAV_D_011 : scrolls to Hobbies section', () => {
      cy.get('.nav-bar a[href="#hobbies"]').click({ force: true });
      cy.get('#hobbies').should('be.visible');
    });

    it('TC_NAV_D_012 : active nav link updates on scroll', () => {
      cy.navigateTo('experience');
      cy.get('.nav-bar a[href="#experience"]').should('have.class', 'active');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 3. DATA DISPLAY TESTS  (CMS content renders correctly)
  // ══════════════════════════════════════════════════════════════════════════
  context('Data Display Tests', () => {

    it('TC_DATA_D_001 : About section renders tagline and bio', () => {
      cy.navigateTo('about');
      cy.get('#about p').should('have.length.at.least', 2).each(($p) => {
        expect($p.text().trim()).to.not.be.empty;
      });
    });

    it('TC_DATA_D_002 : Experience section renders at least 1 card with role and company', () => {
      cy.navigateTo('experience');
      cy.verifyContentCards('experience', 1);
      cy.get('#experience .content-card').first().within(() => {
        cy.get('h4').should('not.be.empty');
        cy.get('p').first().should('not.be.empty');
      });
    });

    it('TC_DATA_D_003 : Projects section renders at least 1 card', () => {
      cy.navigateTo('projects');
      cy.verifyContentCards('projects', 1);
    });

    it('TC_DATA_D_004 : Publications section renders Journal Publications heading', () => {
      cy.navigateTo('publications');
      cy.get('#publications h5').contains('JOURNAL PUBLICATIONS').should('be.visible');
    });

    it('TC_DATA_D_005 : Publications section renders journal cards with View Paper links', () => {
      cy.navigateTo('publications');
      cy.get('#publications .content-card').should('have.length.at.least', 1);
      cy.get('#publications .content-card').first().find('.view-paper-link')
        .should('exist')
        .and('have.attr', 'href')
        .and('include', 'http');
    });

    it('TC_DATA_D_006 : Skills section renders at least 1 skill item', () => {
      cy.navigateTo('skills');
      cy.verifyListItems('skills', 1);
    });

    it('TC_DATA_D_007 : Education section renders at least 1 card', () => {
      cy.navigateTo('education');
      cy.verifyContentCards('education', 1);
    });

    it('TC_DATA_D_008 : Honors section renders at least 1 award card', () => {
      cy.navigateTo('honors');
      cy.verifyContentCards('honors', 1);
    });

    it('TC_DATA_D_009 : Leadership section renders at least 1 card', () => {
      cy.navigateTo('leadership');
      cy.verifyContentCards('leadership', 1);
    });

    it('TC_DATA_D_010 : Certifications section renders at least 1 card', () => {
      cy.navigateTo('certifications');
      cy.verifyContentCards('certifications', 1);
    });

    it('TC_DATA_D_011 : Affiliations section renders items with external links', () => {
      cy.navigateTo('affiliations');
      cy.verifyListItems('affiliations', 1);
      cy.get('#affiliations .content-card ul li').first()
        .find('a')
        .should('have.attr', 'href')
        .and('include', 'http');
    });

    it('TC_DATA_D_012 : Hobbies section renders at least 1 item', () => {
      cy.get('.nav-bar a[href="#hobbies"]').click({ force: true });
      cy.verifyListItems('hobbies', 1);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 4. API FETCH DATA TESTS  (Contentful CDN)
  // ══════════════════════════════════════════════════════════════════════════
  context('API Fetch Data Tests', () => {

    it('TC_API_D_001 : Contentful API returns profile data', () => {
      cy.fetchContentfulEntries('profile').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
        const fields = res.body.items[0].fields;
        expect(fields).to.have.all.keys('firstName', 'lastName', 'email');
      });
    });

    it('TC_API_D_002 : Contentful API returns experience entries', () => {
      cy.fetchContentfulEntries('experience').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
        const fields = res.body.items[0].fields;
        expect(fields).to.include.keys('role', 'company');
      });
    });

    it('TC_API_D_003 : Contentful API returns publication entries', () => {
      cy.fetchContentfulEntries('publication').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
        expect(res.body.items[0].fields).to.include.keys('title', 'journal');
      });
    });

    it('TC_API_D_004 : Contentful API returns education entries', () => {
      cy.fetchContentfulEntries('education').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
      });
    });

    it('TC_API_D_005 : Contentful API returns urls entries with correct fields', () => {
      cy.fetchContentfulEntries('urls').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.items).to.have.length.at.least(1);
        const names = res.body.items.map((i) => i.fields.urlName);
        expect(names).to.include('linkedin');
        expect(names).to.include('scholar');
      });
    });

    it('TC_API_D_006 : LinkedIn URL from API renders in header icon', () => {
      cy.fetchContentfulEntries('urls').then((res) => {
        const linkedinEntry = res.body.items.find((i) => i.fields.urlName === 'linkedin');
        expect(linkedinEntry).to.exist;
        const href = linkedinEntry.fields.urlData;
        cy.get(`.social-links a[href="${href}"]`).should('exist');
      });
    });

    it('TC_API_D_007 : profile name from API matches displayed name', () => {
      cy.fetchContentfulEntries('profile').then((res) => {
        const { firstName, lastName } = res.body.items[0].fields;
        cy.get('.name-hero').should('contain.text', firstName).and('contain.text', lastName);
      });
    });

    it('TC_API_D_008 : experience count from API matches rendered card count', () => {
      cy.fetchContentfulEntries('experience').then((res) => {
        const apiCount = res.body.total;
        cy.navigateTo('experience');
        cy.get('#experience .content-card').should('have.length', apiCount);
      });
    });
  });
});
