import { InitilaizedUser } from './features/user';

type Session = InitilaizedUser | Pick<InitilaizedUser, 'id'>;

export default Session;
