import React from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import { useTranslation } from 'react-i18next';
import { Button, FormGroup, TextField } from '@material-ui/core';
import Cards from 'react-credit-cards';
import useCreditCardForm from '../../customHooks/useCreditCardForm';
import styles from './CreditCardForm.module.scss';

function CreditCardForm() {
  const { handleChange, handleFocus, handleSubmit, values, errors } =
    useCreditCardForm();
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDiv}>
          <div className={styles.creditCard}>
            <Cards
              className={styles.creditCardImage}
              cvc={values.cardSecurityCode}
              expiry={values.cardExpiration}
              focused={values.focus}
              name={values.cardName}
              number={values.cardNumber}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputs}>
              <FormGroup className={styles.input}>
                <TextField
                  error={errors.message ? Boolean(errors.message.name) : false}
                  helperText={errors.message ? errors.message.name : null}
                  label={t('cardholder')}
                  variant="outlined"
                  type="text"
                  id="cardName"
                  data-testid="cardName"
                  name="cardName"
                  value={values.cardName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </FormGroup>
              <FormGroup className={styles.input}>
                <TextField
                  error={
                    errors.message ? Boolean(errors.message.number) : false
                  }
                  helperText={errors.message ? errors.message.number : null}
                  variant="outlined"
                  type="number"
                  id="cardNumber"
                  data-testid="cardNumber"
                  name="cardNumber"
                  label={t('cardNumber')}
                  value={values.cardNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 16);
                  }}
                />
              </FormGroup>
              <FormGroup className={styles.input}>
                <TextField
                  error={errors.message ? Boolean(errors.message.exp) : false}
                  helperText={errors.message ? errors.message.exp : null}
                  variant="outlined"
                  type="text"
                  id="cardExpiration"
                  data-testid="cardExpiration"
                  name="cardExpiration"
                  label={t('cardExpiration')}
                  value={values.cardExpiration}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </FormGroup>
              <FormGroup className={styles.input}>
                <TextField
                  error={errors.message ? Boolean(errors.message.cvv) : false}
                  helperText={errors.message ? errors.message.cvv : null}
                  variant="outlined"
                  type="number"
                  id="cardSecurityCode"
                  data-testid="cardSecurityCode"
                  name="cardSecurityCode"
                  label={t('securityCode')}
                  value={values.cardSecurityCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                />
              </FormGroup>
            </div>
            <Button
              id="makeOrderButton"
              variant="contained"
              color="primary"
              type="submit"
            >
              {t('makeOrder')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
