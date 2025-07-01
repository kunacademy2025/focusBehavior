import { UserApis } from ".";

export const updateUserLoginDate = async (id: number) => {
  try {
    const response = await UserApis.put(id, { lastLoginDate: new Date() });
    return response || {};
  } catch (error) {
    console.error("Error in updateUserLoginDate:", error);
    return {};
  }
};

export const deactivateUser = async (id: number) => {
  try {
    const response = await UserApis.put(id, { blocked: true });
    return response || {};
  } catch (error) {
    console.error("Error in updateUserLoginDate:", error);
    return {};
  }
};

export const updateUserInfo = async (id: number, data: any) => {
  try {
    const response = await UserApis.put(id, data);
    return response;
  } catch (error) {
    console.error("Error in updateUserLoginDate:", error);
    return {};
  }
};
