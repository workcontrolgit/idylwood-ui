export interface Token {
  role: string;
  displayname: string;
  email: string;
  sub: string;
  iss: string;
  aud: string;
  exp: number;
  nbf: number;
}
