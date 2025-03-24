import { genresList } from "../../src/shared/constants";

describe("App page", () => {
  it("should contain the main-page div wrapper with correct buttons and have correct click behavior", () => {
    cy.visit("http://localhost:3000");

    cy.get("#main-page").should("be.visible");
    cy.get('[class*="genreSelectContainer"]').should("be.visible");
    cy.get('[class*="genreButton"]').should("have.length", 5);
    cy.get('[class*="genreButton"]')
      .first()
      .should("have.text", genresList[0].name.toUpperCase());
    cy.get('[class*="genreButton"]')
      .eq(1)
      .should("have.text", genresList[1].name.toUpperCase());
    cy.get('[class*="genreButton"]')
      .eq(2)
      .should("have.text", genresList[2].name.toUpperCase());
    cy.get('[class*="genreButton"]')
      .eq(3)
      .should("have.text", genresList[3].name.toUpperCase());
    cy.get('[class*="genreButton"]')
      .last()
      .should("have.text", genresList[4].name.toUpperCase());

    cy.get('[class*="genreButton"]').first().click();
    cy.get("#for-cypress").should("have.text", "Selected genre: All");
  });
});
