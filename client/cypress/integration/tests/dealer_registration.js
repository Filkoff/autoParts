/* global cy */
describe('Dealer registration', () => {
  it('Register', () => {
    cy.visit('/registration');
    cy.get('#name').type('john');
    cy.get('#email').type('donavan1@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#type').select('customer');
    cy.get('#registrationButton').click();
  });
  it('Log in', () => {
    cy.visit('/login');
    cy.get('#email').type('donavan1@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
    cy.visit('/profile/about');
    cy.get('.Profile_userInfo__1fTwx');
  });
  it('Change personal data', () => {
    // cy.visit('/login');
    // cy.get('#email').type('donavan1@gmail.com');
    // cy.get('#password').type('4567bnj');
    // cy.get('#login').click();
    // cy.visit('/profile/about');
    cy.get('.Profile_createIcon__QGY9t').first().click();
    cy.get('.Profile_nameInfo__2VPTi input')
      // .should('have.value', 'john')
      .clear()
      .should('have.value', '')
      .type('Tim')
      .should('have.value', 'Tim');
    cy.get('#changeNameButton').click();
    cy.get('.Profile_userInfo__1fTwx').contains('Tim');
    cy.get('.Profile_createIcon__QGY9t').last().click();
    cy.get('.Profile_descriptionInfo__2FDEA textarea')
      .type('New user')
      .should('have.value', 'New user');
    cy.get('#changeDescriptionButton').click();
    cy.get('.Profile_userInfo__1fTwx').contains('New user');
    const fixtureFile = 'logo2.png';
    cy.get('.Profile_btnLoadInput__1LJQC').attachFile(fixtureFile);
  });

  it('Search parts', () => {
    //
    cy.visit('/login');
    cy.get('#email').type('donavan1@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
    //
    cy.get('#category').select('ВЫПУСКНАЯ СИСТЕМА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('катализатор');
    cy.get('#searchButton').click();
    cy.get('.Part_card__35JVk').should('have.length', 21);
  });
  it('Sort by distance', () => {
    cy.visit('/main', {
      onBeforeLoad(win) {
        const latitude = 54.302903;
        const longitude = 26.848515;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (cb) => {
            return cb({ coords: { latitude, longitude } });
          }
        );
      },
    });
    cy.get('#category').select('ВЫПУСКНАЯ СИСТЕМА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('катализатор');
    cy.get('#searchButton').click();
    cy.get('#sortByDistButton').click();
    cy.get('.Part_card__35JVk').first().contains('Paul');
    cy.get('.Part_card__35JVk').last().contains('Mark');
    // 
    cy.get('.Part_card__35JVk').first().get('#addToCartButton').click();
  
  //
    cy.visit('/main');
    // cy.get('#email').type('donavan@gmail.com');
    // cy.get('#password').type('4567bnj');
    // cy.get('#login').click();
    onBeforeLoad(win) {
        // e.g., force Barcelona geolocation
        const latitude = 41.38879;
        const longitude = 2.15899;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (cb) => {
            return cb({ coords: { latitude, longitude } });
          }
        );
      };
    cy.get('#searchButton').click();
    cy.get('#sortByDistButton').click();
  });
  it('Compare', () => {
    cy.visit('/main');
    cy.get('#compareTab').click();
    cy.get('#compareButton').click();
    cy.get('.CompareParts_partsField__2-Pfw button').first().click();
    cy.get('.Part_name__22588').first().contains('пружина');
  });
  it('Get orders', () => {
    // cy.visit('/profile/orders');
    cy.get('#ordersTab').click();
    cy.get('#orders').should('have.length', 2);
  });
  it('Order item', () => {
    //
    cy.visit('/login');
    cy.get('#email').type('donavan1@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
    //
    cy.visit('/profile/orders');
    cy.get('#cartIcon').click();
    cy.get('#cartButton').click();
  });
  //
  it('Order item', () => {
    //
    cy.visit('/login');
    cy.get('#email').type('donavan1@gmail.com');
    cy.get('#password').type('4567bnj');
    cy.get('#login').click();
    //
    cy.get('#category').select('ВЫПУСКНАЯ СИСТЕМА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('катализатор');
    cy.get('#searchButton').click();
    cy.get('.Part_card__35JVk').first().get('#addToCartButton').click();

    cy.get('#cartIcon').click();
    cy.get('#cartButton').click();
    cy.get('#orderButton').click();
    cy.get('#nameInput').type('Иван');
    cy.get('#surnameInput').type('Иванов');
    cy.get('#addressInput').type('г. Минск, ул. Коласа 23-31');
    cy.get('#phoneInput').type(' +375-29-111-11-11');
    cy.get('#timeSelect').select('10:00-15:00');
    cy.get('#goToPayment').click();
    cy.get('#payByCardButton').click();
    cy.get('#cardName').type('Ivan Ivanov');
    cy.get('#cardNumber').type('4118567650298895');
    cy.get('#cardExpiration').type('11/22');
    cy.get('#cardSecurityCode').type('123');
    cy.get('#makeOrderButton').click();
    cy.contains('#successOrderMessage');
  });
});
