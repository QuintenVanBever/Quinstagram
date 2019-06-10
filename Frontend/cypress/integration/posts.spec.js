describe("Posts tests", function() {
  beforeEach(function() {
    cy.login();
  });
  it("mock post get", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/posts",
      status: 200,
      response: "fixture:posts.json"
    });

    cy.visit("/posts");
    cy.get("[data-cy=postItem]").should("have.length", 3);
  });

  it("mock post delete", function() {
    cy.server();
    cy.route({
      method: "DELETE",
      url: "/api/posts/1",
      status: 200
    });
  });

  it("mock add comment", function() {
    cy.visit("/posts/1");
    cy.get("[data-cy=messageField]").type("Not bad!");
    cy.get("[data-cy=messageSend]").click();
  });
});
