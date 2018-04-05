export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function userFactory(username?: string,
                            email?: string,
                            password?: string,
                            passwordConfirmation?:string ): User {
  return {
    username,
    email,
    password,
    passwordConfirmation
  }
}
