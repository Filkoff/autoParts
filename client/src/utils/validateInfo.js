import valid from 'card-validator';
import i18next from 'i18next';

export default function validateInfo(values) {
  const errors = {
    message: {
      default: i18next.t('unknownError'),
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
    default: i18next.t('unknownError'),
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
    errors.message.cvv = i18next.t('emptyCVC');
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message.cvv = i18next.t('CVCError');
  }

  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message.exp = i18next.t('emptyExp');
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message.exp = i18next.t('expError');
  }

  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message.number = i18next.t('emptyCardNumber');
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message.number = i18next.t('cardNumberError');
  }

  if (values.cardName === null || !values.cardName.trim()) {
    errors.message.name = i18next.t('emptyCardName');
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message.name = i18next.t('cardNameError');
  }

  if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
    errors.valid = true;
  }

  return errors;
}
