export default function formatNumber(input) {
  let inputString = input.toString();
  let result = "";

  let count = 0;

  for (let i = inputString.length - 1; i >= 0; i--) {
    count++;
    result = inputString.charAt(i) + result;

    if (count % 3 === 0 && i !== 0) {
      result = " " + result;
    }
  }
  return result;
}
