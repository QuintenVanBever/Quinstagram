describe("Login Page", () => {
  beforeEach(() => {});

  it("logintest", () => {
    cy.login();
  });

  it("login page", () => {
    cy.visit("/login");
    cy.get("[data-cy=login-email]").type("admin@admin.be");
    cy.get("[data-cy=login-password]").type("admin");
    cy.get("[data-cy=login-button").click();
    // at last one recipe should be visible (i.e. we should have been forwarded to the recipe page)
  });
});
