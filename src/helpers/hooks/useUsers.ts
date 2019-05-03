import { useStore, useActions } from "../../store";
import { useEffect } from "react";

const useUsers = (companyId: string) => {
  const users = useStore((state) => state.user.users);
  const fetchUsers = useActions((actions) => actions.user.fetchUsers);

  useEffect(() => {
    if (!users.some((u) => u.companyId === companyId)) {
      fetchUsers(companyId);
    }
  }, [companyId]);

  return users;
};

export default useUsers;
