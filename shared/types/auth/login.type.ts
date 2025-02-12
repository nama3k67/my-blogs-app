export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  errors: {
    [K in keyof LoginData]?: [string];
  };
};
