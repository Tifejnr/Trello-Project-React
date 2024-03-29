const regex = /^[a-zA-Z\d\s,]+$/g;

export default function fullNamesValidation(input) {
  let invalidDetailsIndexArray = [];
  //convert to an array []
  const inputs = input.split(/\s*,\s*/);

  inputs.forEach((input, index) => {
    //push to array of failed validation if invalid
    if (!regex.test(input)) {
      invalidDetailsIndexArray.push(index);
    }
  });

  if (invalidDetailsIndexArray.length > 0) return { invalidDetailsIndexArray };

  return { usernamesValidationSucess: true };
}
