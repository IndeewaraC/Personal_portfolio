// ─── Navigation ───────────────────────────────────────────────────────────────

Cypress.Commands.add('navigateTo', (sectionId) => {
  cy.get(`.nav-bar a[href="#${sectionId}"]`).click();
  cy.get(`#${sectionId}`).should('be.visible');
});

Cypress.Commands.add('mobileNavigateTo', (sectionId) => {
  cy.get('.mobile-menu-btn').click();
  cy.get(`.nav-bar a[href="#${sectionId}"]`).should('be.visible').click({ force: true });
  cy.get(`#${sectionId}`).should('be.visible');
});

// ─── Content Card Assertions ──────────────────────────────────────────────────

Cypress.Commands.add('verifyContentCards', (sectionId, minCount = 1) => {
  cy.get(`#${sectionId} .content-card`).should('have.length.at.least', minCount);
});

Cypress.Commands.add('verifyListItems', (sectionId, minCount = 1) => {
  cy.get(`#${sectionId} .content-card ul li`).should('have.length.at.least', minCount);
});

// ─── Social Link Assertions ───────────────────────────────────────────────────

Cypress.Commands.add('verifySocialIcon', (hrefContains) => {
  cy.get('.social-links')
    .find(`a[href*="${hrefContains}"]`)
    .should('exist')
    .and('have.attr', 'target', '_blank');
});

// ─── Contentful API ───────────────────────────────────────────────────────────

Cypress.Commands.add('fetchContentfulEntries', (contentType) => {
  const spaceId = Cypress.env('CONTENTFUL_SPACE_ID');
  const token   = Cypress.env('CONTENTFUL_ACCESS_TOKEN');
  return cy.request({
    url: `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=${contentType}`,
    headers: { Authorization: `Bearer ${token}` },
  });
});
