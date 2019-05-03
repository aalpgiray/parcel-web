const authState: any = {
  token: null,
  username: null,
};

let userRoles: any = {
  permissions: [],
  roleName: null,
};

export const getAuthState = () => {
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  };
};

export const getUserRoles = () => {
  const cachedRoles = localStorage.getItem("roles");
  userRoles = cachedRoles ? JSON.parse(cachedRoles) : userRoles;
  return userRoles;
};

export const saveUserRoles = (roles: {
  permissions: any[];
  roleName: string[];
}) => {
  return new Promise((resolve) => {
    if (roles) {
      userRoles = roles;
      if (true || roles) {
        localStorage.setItem("roles", JSON.stringify(roles));
      }
    }
    resolve();
  });
};

export const saveUserCompanyToLocalStorage = (company: any) => {
  return new Promise((resolve) => {
    localStorage.setItem("userCompany", JSON.stringify(company));
    resolve();
  });
};

export const saveUserInfoToLocalStorage = (user: any) => {
  return new Promise((resolve) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    resolve();
  });
};

export const getUserCompany = () => {
  const userCompany = localStorage.getItem("userCompany");
  return userCompany ? JSON.parse(userCompany) : undefined;
};

export const saveLoginData = (loginData: {
  token: string;
  userName: string;
}) => {
  return new Promise((resolve) => {
    authState.token = loginData.token;
    authState.username = loginData.userName;
    // if (remember )
    {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("username", loginData.userName);
    }
    resolve(true);
  });
};

export const clearLoginData = () => {
  return new Promise((resolve) => {
    authState.token = null;
    authState.username = null;
    userRoles = {
      permissions: [],
      roleName: null,
    };
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    resolve(true);
  });
};

export const hasPermission = (permissionName: any) => {
  const result = getUserRoles().permissions.filter(
    (permission: { permissionName: string }) =>
      permission.permissionName === permissionName,
  );
  return result.length > 0;
};
