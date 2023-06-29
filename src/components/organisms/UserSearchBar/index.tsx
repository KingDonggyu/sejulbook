import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import type { User } from 'user';
import UserRepository from '@/repository/api/UserRepository';
import { TextFieldProps } from '@/components/atoms/TextField';
import SearchBar from '@/components/molecules/SearchBar';
import Route from '@/constants/routes';
import * as s from './style';

const UserSearchedItem = ({ id, name, introduce }: User) => (
  <li>
    <Link href={`${Route.LIBRARY}/${id}`}>
      <s.UserName>
        <span>{name}</span>의 서재
      </s.UserName>
      <s.UserIntroduce>{introduce}</s.UserIntroduce>
    </Link>
  </li>
);

const UserSearchBar = ({ ...textFieldProps }: TextFieldProps) => {
  const [searchedList, setSearchedList] = useState<User[]>([]);
  const userRepository = useMemo(() => new UserRepository(), []);

  const handleDebounce = useCallback(
    async (value: string) => {
      if (!value) {
        setSearchedList([]);
        return;
      }
      const searchedUsers = await userRepository.search(value);
      setSearchedList(searchedUsers);
    },
    [userRepository],
  );

  return (
    <SearchBar onDebounce={handleDebounce} {...textFieldProps}>
      {searchedList.map(({ id, name, introduce }) => (
        <UserSearchedItem key={id} id={id} name={name} introduce={introduce} />
      ))}
    </SearchBar>
  );
};

export default UserSearchBar;
