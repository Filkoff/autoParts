/* global describe, cy, it */

const customerName = 'john';
const customerMail = 'donavan1@gmail.com';
const customerPassword = '4567bnj';
const dealerName = 'jack';
const dealerMail = 'dealer@gmail.com';
const dealerPassword = '123456';
describe('Main functionality', () => {
  it('Register', () => {
    cy.visit('/registration');
    cy.get('#name').type(customerName);
    cy.get('#email').type(customerMail);
    cy.get('#password').type(customerPassword);
    cy.get('#type').select('customer');
    cy.get('#registrationButton').click();
  });
  it('Log in', () => {
    cy.visit('/login');
    cy.get('#email').type(customerMail);
    cy.get('#password').type(customerPassword);
    cy.get('#login').click();
    cy.get('#userAvatar').click({ force: true });
    cy.get('#profileHeading');
  });

  it('Change personal data', () => {
    cy.get('#nameEditIcon').click();
    cy.get('#nameInput')
      .clear()
      .should('have.value', '')
      .type('Tim')
      .should('have.value', 'Tim');
    cy.get('#changeNameButton').click();
    cy.get('#userName').contains('Tim');
    cy.get('#descriptionEditIcon').click();
    cy.get('#descriptionInput')
      .clear()
      .type('New user')
      .should('have.value', 'New user');
    cy.get('#changeDescriptionButton').click();
    cy.get('#userDescription').contains('New user');
  });

  it('Search parts', () => {
    cy.visit('/main');
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
  });

  it('Compare', () => {
    cy.visit('/main');
    cy.get('#compareTab').click();
    cy.get('#category').select('ПОДВЕСКА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('пружина');
    cy.get('#compareButton').click();
    cy.get('.CompareParts_partsField__2-Pfw button').first().click();
    cy.get('.Part_name__22588')
      .should('have.length', 2)
      .first()
      .contains('пружина');
  });

  it('Order item', () => {
    cy.visit('/login');
    cy.get('#email').type(customerMail);
    cy.get('#password').type(customerPassword);
    cy.get('#login').click();
    cy.get('#category').select('ВЫПУСКНАЯ СИСТЕМА');
    cy.get('#model').type('vesta');
    cy.get('#name').type('катализатор');
    cy.get('#searchButton').click();
    cy.get('.Part_card__35JVk').first().get('#addToCartButton').click();
    cy.get('#itemsAmount').should('have.text', '1');
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
    cy.get('#itemsAmount').should('have.text', '0');
    cy.get('#successOrderMessage');
  });
  it('Get your orders', () => {
    cy.get('#userAvatar').click();
    cy.get('#ordersTab').click();
    cy.get('.Order_order__2fmsX').should('have.length', 2);
  });
  it('Add part', () => {
    cy.get('#logOutButton').click();
    cy.visit('/registration');
    cy.get('#name').type(dealerName);
    cy.get('#email').type(dealerMail);
    cy.get('#password').type(dealerPassword);
    cy.get('#type').select('dealer');
    cy.get('#registrationButton').click();
    cy.visit('/login');
    cy.get('#email').type(dealerMail);
    cy.get('#password').type(dealerPassword);
    cy.get('#login').click();
    cy.get('#userAvatar').click({ force: true });
    cy.get('#addPart').click();
    cy.get('#selectButton').first().click();
    cy.get('#description').type('Длина - 325мм');
    cy.get('#condition').select('новая');
    cy.get('#price').clear().type('102030');
    cy.get('#production').type('KYB');
    cy.get('#addPartButton').click();
    cy.get('.DealerPart_info__8ksUP').contains('102030');
  });
  it('Change part', () => {
    cy.visit('/login');
    cy.get('#email').type(dealerMail);
    cy.get('#password').type(dealerPassword);
    cy.get('#login').click();
    cy.get('#userAvatar').click({ force: true });
    cy.get('#myParts').click();
    cy.get('#changeButton').first().click();
    cy.get('#price').clear().type('99999');
    cy.get('#saveButton').click();
    cy.get('.DealerPart_info__8ksUP').contains('99999');
  });
  it('Delete part', () => {
    cy.visit('/login');
    cy.get('#email').type(dealerMail);
    cy.get('#password').type(dealerPassword);
    cy.get('#login').click();
    cy.get('#userAvatar').click({ force: true });
    cy.get('#myParts').click();
    cy.get('#deleteButton').click();
    cy.get('.DealerPart_card__1XsNP').should('have.length', 20);
  });

  it('Send message and prevent XSS attack', () => {
    cy.get('#chatIcon').click();
    cy.get('.SideMessage_container__3FLL1').first().click();
    cy.get('.Input_input__29Wsp')
      .click()
      .type('<script>alert(123)</script> Hello!');
    cy.get('.Input_button__3Sstb').click();
    cy.get('.Message_message__13Y0K').last().should('not.have.text', '123');
  });
});
