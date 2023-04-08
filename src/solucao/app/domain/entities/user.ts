import { Email } from './email';
import { Name } from './name';
import { Password } from './password';

interface UserProps {
  fullName: Name;
  email: Email;
  password: Password;
}

export class User {
  props: UserProps;

  constructor(userData: UserProps) {
    this.props = userData;
  }
}
