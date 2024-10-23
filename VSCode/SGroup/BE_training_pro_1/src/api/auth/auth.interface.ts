interface Login {
    email: string;
    password: string;
}
interface Token {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}

  
export type { Login, Token };
  