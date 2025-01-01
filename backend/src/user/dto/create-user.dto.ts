export class CreateUserDto {
  googleId?: string;
  email: string;
  first_name: string;
  last_name: string;
  picture?: string;
  full_name?: string;
  email_verified?: boolean;
}
