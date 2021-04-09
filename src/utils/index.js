export const validateNumber = event => {
  const keyCode = event.keyCode || event.which;
  const string = String.fromCharCode(keyCode);
  const regex = /[0-9,]|\./;

  if (!regex.test(string)) {
    event.returnValue = false;
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}

export const disableNewlines = event => {
  const keyCode = event.keyCode || event.which;

  if (keyCode === 13) {
    event.returnValue = false;
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}
