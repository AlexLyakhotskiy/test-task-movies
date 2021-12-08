export function errorSerializer(error) {
  return Object.entries(error).reduce((acc, [key, value]) => {
    if (key.includes('data')) {
      const newKey = key.replace('data/', '');
      acc[newKey] = value;
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
}

export function validate(name, value, setErrors, regex, message) {
  if (!value) return;

  if (regex.test(value)) {
    setErrors(prev => ({
      ...prev,
      [name]: message,
    }));
  }
}

export function checkForSpaces(name, value, setErrors) {
  const regex = /\s/;
  const message = 'Field cannot contain spaces';

  validate(name, value, setErrors, regex, message);
}

export function checkForSpacesAtBeginAndEnd(name, value, setErrors) {
  const regex = /^\s+|\s+$/g;
  const message = 'Field cannot contain spaces at begin or end of the sentence';

  validate(name, value, setErrors, regex, message);
}

export function checkForSpecialCharacters(name, value, setErrors) {
  const regex = /^[^,#%$@<>;№*&?!`~"'/\\|(){}[\]+=^:]+$/gm;

  if (!value) return;

  if (!regex.test(value)) {
    setErrors(prev => ({
      ...prev,
      [name]: 'Field cannot contain special characters',
    }));
  }
}
