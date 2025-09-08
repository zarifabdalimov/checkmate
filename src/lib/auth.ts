import {
  confirmResetPassword,
  type ConfirmResetPasswordInput,
  confirmSignUp,
  type ConfirmSignUpInput,
  fetchUserAttributes as awsFetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  type ResetPasswordInput,
  signIn,
  type SignInInput,
  signOut,
  signUp,
  type SignUpInput,
} from "aws-amplify/auth";

export async function signUpUser(input: SignUpInput) {
  return await signUp(input);
}

export async function fetchUserAttributes() {
  return await awsFetchUserAttributes();
}

export async function confirmSignUpUser(input: ConfirmSignUpInput) {
  return await confirmSignUp(input);
}

export async function signInUser(input: SignInInput) {
  return await signIn(input);
}

export async function signOutUser() {
  return await signOut();
}

export async function getCurrentAuthUser() {
  return await getCurrentUser();
}

export async function resendVerificationCode(username: string) {
  return await resendSignUpCode({ username });
}

export async function resetUserPassword(input: ResetPasswordInput) {
  return await resetPassword(input);
}

export async function confirmPasswordReset(input: ConfirmResetPasswordInput) {
  return await confirmResetPassword(input);
}

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return "An unknown error occurred";

  const errorWithCode = error as {
    name?: string;
    code?: string;
    message?: string;
  };
  const errorCode = errorWithCode.name || errorWithCode.code;

  switch (errorCode) {
    case "UserAlreadyExistsException":
      return "An account with this email already exists";
    case "UsernameExistsException":
      return "This username is already taken";
    case "InvalidPasswordException":
      return "Password does not meet requirements";
    case "CodeMismatchException":
      return "Invalid verification code";
    case "ExpiredCodeException":
      return "Verification code has expired";
    case "NotAuthorizedException":
      return "Incorrect email or password";
    case "UserNotConfirmedException":
      return "Please verify your email before signing in";
    case "UserNotFoundException":
      return "No account found with this email";
    case "TooManyRequestsException":
      return "Too many requests. Please try again later";
    case "LimitExceededException":
      return "Too many attempts. Please try again later";
    default:
      return errorWithCode.message || "An error occurred during authentication";
  }
}
