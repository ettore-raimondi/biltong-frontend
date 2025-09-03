export type RegisterUserPayload = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
