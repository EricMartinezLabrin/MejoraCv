export interface Credential {
  clientId?: string;
  credential: string;
  select_by?: string;
}
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  picture: string;
  full_name: string;
  email_verified: boolean;
  google_id: string;
}
