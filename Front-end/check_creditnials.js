/**
 * It takes a string and returns true if the string is a valid email address, and false if it is not.
 * @param string - The string to be checked.
 * @returns A boolean value.
 */
let check_email = (string) => {
  let email_reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email_reg.test(string);
};

/**
 * The password must contain at least one number, one lowercase and one uppercase letter. It must be at
 * least eight characters long.
 * @param string - The string to be tested.
 * @returns A boolean value.
 */
let check_password = (string) => {
  let pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return pass_reg.test(string);
};
let check_name = (string) => {
  let name_Reg = /^[a-z ,.'-]+$/i;
  return name_Reg.test(string);
};

export { check_email, check_password, check_name };
