import valid from 'card-validator';

export default function validateInfo(values) {
  const errors = {
    message: {
      default: 'Неизвестная ошибка. Попробуйте позже',
      cvv: '',
      name: '',
      exp: '',
      number: '',
    },
  };
  const creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);

  errors.valid = false;
  errors.message = {
    default: 'Неизвестная ошибка. Попробуйте позже',
    cvv: '',
    name: '',
    exp: '',
    number: '',
  };
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvv = false;

  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message.cvv = 'CVC не заполнен';
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message.cvv = 'Недействительный CVC';
  }

  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message.exp = 'Cрок действия карты не заполнен';
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message.exp = 'Недействительный срок действия карты';
  }

  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message.number = 'Номер карты не заполнен';
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message.number = 'Недействительный номер карты';
  }

  if (values.cardName === null || !values.cardName.trim()) {
    errors.message.name = 'Имя не заполнено';
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message.name = 'Неверное имя';
  }

  if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
    errors.valid = true;
    errors.message.all = 'Карта действительна';
  }

  return errors;
}
