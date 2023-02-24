import { InitilaizedUser } from './domain/user';

type Session = InitilaizedUser | Pick<InitilaizedUser, 'id'>;

export default Session;
