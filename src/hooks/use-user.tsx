import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const getUser = await getSession();
      setUser(getUser.user.name);
    };

    getUser();
  }, []);

  return user;
};
