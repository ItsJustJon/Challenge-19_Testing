import Quiz from '../../client/src/components/Quiz.tsx';


describe('Quiz component test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions')
  });

  // it('should show an error message if no questions are available', () => {
  //   cy.intercept('GET', '/api/questions/random', { fixture: 'empty_questions.json' }).as('getEmptyQuestions')
  //   cy.mount(<Quiz />);
  //   cy.get('button').contains('Start Quiz').click()
  //   cy.wait('@getEmptyQuestions');

  //   cy.get('.alert-danger').should('contain', 'No questions available');
  // });

  it('should render the Quiz component with the proper content', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible')
  });

  it('should display the quiz and answer it correctly', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click()
    cy.wait('@getQuestions');

    // cy.get('h2').should('contain', 'What is the capital of Taiwan?')
    cy.contains('What is the capital of Taiwan?').should('exist');
    // cy.get('.alert').should('have.length', 4)
    // cy.get('.alert').first().should('contain', 'Taipei')
    cy.contains('button', '2').click();

    // cy.get('h2').should('contain', 'What is the Mandarin Chinese for horse?')
    cy.contains('What is the Mandarin Chinese for horse?').should('exist');
    // cy.get('.alert').should('have.length', 4)
    // cy.get('.alert').first().should('contain', 'ma')
    cy.contains('button', '3').click();

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 2/2').should('exist');
  });
});