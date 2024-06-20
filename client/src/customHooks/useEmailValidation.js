import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useEmailValidation = (value) => {
  const [isEmailCorrect, setisEmailCorrect] = useState(true);
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

  // regex source: http://jsfiddle.net/ghvj4gy9/
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (value.length === 0) {
      setisEmailCorrect(false);
      setErrorText(`${t('emptyFieldError')}`);
    } else if (!re.test(String(value).toLowerCase())) {
      setisEmailCorrect(false);
      setErrorText(`${t('invalidEmail')}`);
    } else {
      setisEmailCorrect(true);
      setErrorText('');
    }
  }, [value]);
  return [isEmailCorrect, errorText];
};

export default useEmailValidation;
