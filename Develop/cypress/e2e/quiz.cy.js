describe('Quiz e2e Tests', () => {
  let fixtureQuestions;

  beforeEach(() => {
    cy.fixture('questions').then((data) => {
      fixtureQuestions = data;
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: fixtureQuestions,
      }).as('getQuestions');
    });
    // cy.visit('/')
  });


  it('should start the quiz', () => {
    cy.visit('http://localhost:3001');
    // cy.mount(<Quiz />);
    // cy.get('button').contains('Start Quiz').should('be.visible')
    cy.contains('Start Quiz');
  });

  it('should display the first question when "Start Quiz" is clicked', () => {
    cy.visit('http://localhost:3001');
    // cy.mount(<Quiz />);

    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.contains('What is the capital of Taiwan?').should('exist');
    cy.contains('Tainan').should('exist');
    cy.contains('Taipei').should('exist');
    cy.contains('Kaohsiung').should('exist');
    cy.contains('Taichung').should('exist');
  });
  
  it('should complete the quiz and show the score', () => {
    // cy.mount(<Quiz />);
    cy.visit('http://localhost:3001');

    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.contains('button', '2').click(); 
    cy.contains('button', '3').click();

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 2/2').should('exist');
  });
});