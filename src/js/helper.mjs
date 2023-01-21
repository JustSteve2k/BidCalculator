// Updates a specified field , Formatted for dollars
// @param {string} field - determines what element (id) is affected
// @param {float} value - money value to be converted
// Returns - none

export default function UpdateWDollars(field, value) {
  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.getElementById(field).innerText = dollarUSLocale.format(value);
}

// Updates a specific section with a provided value, Not formatted for dollars
// @param {string} field - determines what element (id) is affected
// @param {value} value - previous field is updated with provided value.
// Returns - none

export function UpdateOutput(field, value) {
  document.getElementById(field).value = value;
}

// Gets a random integer
// @param {integer} max - sets the maximum amount for the integer.
// Returns - none

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
