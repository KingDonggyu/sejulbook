import { useEffect, useMemo, useState } from 'react';
import type { Book } from 'book';
import NewBookRepository from '@/repository/localStorage/NewBookRepository';

interface FetchInfo {
  newBook: Book | null;
  isLoading: boolean;
}

// 로컬 스토리지에 저장된 책 정보 fetch
const useNewBookStorage = () => {
  const [fetchInfo, setFetchInfo] = useState<FetchInfo>({
    newBook: null,
    isLoading: true,
  });

  const newBookRepository = useMemo(() => new NewBookRepository(), []);

  useEffect(() => {
    setFetchInfo({
      newBook: newBookRepository.get(),
      isLoading: false,
    });
  }, [newBookRepository]);

  return fetchInfo;
};

export default useNewBookStorage;
