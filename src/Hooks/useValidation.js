//IMPORTS
import { toast } from "react-toastify";

//REGEX
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

//Email and Password
const useValidateEmailAndPass = (email, password) => {
  if (!emailRegex.test(email)) {
    toast.error(
      `Introduce an email with the correct format: example@gmail.com,  👨‍🏫`,
      { position: toast.POSITION.BOTTOM_CENTER }
    );
    return;
  } else if (!passwordRegex.test(password)) {
    toast.error(
      `The password need at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number:  👨‍🏫`,
      { position: toast.POSITION.BOTTOM_CENTER }
    );
    return;
  }
};

export { useValidateEmailAndPass };

/*
Email Validation:
- as per RFC2822 standards.

Passwrd validation:
- at least 8 characters
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
- Can contain special characters
*/
