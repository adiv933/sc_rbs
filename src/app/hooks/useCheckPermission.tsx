import useAccess from "../store/AccessService";

const useCheckPermission = (permission: string) => {
  const { accessData } = useAccess();

  if (!accessData) {
    return false;
  }
  if (accessData.includes(permission)) {
    return true;
  } else {
    return false;
  }
};

export default useCheckPermission;
