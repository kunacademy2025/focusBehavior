import {
  ChangePasswordApis,
  ForgotPasswordApis,
  VerifyPasswordApis,
  LoginApis,
  CreateApis,
  ResetPasswordApis,
} from ".";

// export const addEvent = async (
//   userId: string,
//   eventId: number,
//   ticketId: number
// ) => {
//   try {
//     const response = await UserEventAccessApis.post({
//       user: { connect: [{ id: userId }] },
//       event: { connect: [{ id: eventId }] },
//       ticket: { connect: [{ id: ticketId }] },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error in:", error);
//   }
// };

export const createUser = async (
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string
) => {
  try {
    const response = await CreateApis.post({
      first_name,
      last_name,
      username: email.split("@")[0],
      phone_number,
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error("Error in createUser:", error);
  }
};

export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await LoginApis.post({
      identifier,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error in updateUserLoginDate:", error);
    return {};
  }
};

export const verifyUserPassword = async (currentPassword: string) => {
  try {
    const response = await VerifyPasswordApis.post({
      password: currentPassword,
    });
    return response;
  } catch (error) {
    console.error("Error verifying user password:", error);
    return {};
  }
};

export const forgotPassword = async (email: string, jwt: string) => {
  const baseUrl: string = String(process.env.NEXT_PUBLIC_API_URL);
  const fullUrl = `${baseUrl}/auth/forgot-password`;

  try {
    const response = await fetch(fullUrl, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    // const response = await ForgotPasswordApis.post({ email });
    return response;
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return {};
  }
};

export const ResetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string,
  jwt: string
) => {
  const baseUrl: string = String(process.env.NEXT_PUBLIC_API_URL);
  const fullUrl = `${baseUrl}/auth/reset-password`;

  try {
    const response = await fetch(fullUrl, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });

    // const response = await ForgotPasswordApis.post({ email });
    return response;
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return {};
  }
};

export const changeUserPassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
  jwt: string
) => {
  const baseUrl: string = String(process.env.NEXT_PUBLIC_API_URL);
  const fullUrl = `${baseUrl}/auth/change-password`;

  try {
    const response = await fetch(fullUrl, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        currentPassword,
        password,
        passwordConfirmation,
      }),
    });

    // const response = await ChangePasswordApis.post({
    //   currentPassword,
    //   password,
    //   passwordConfirmation,
    // });
    return response;
  } catch (error) {
    console.error("Error in changeUserPassword:", error);
    return {};
  }
};

export const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    const response = await ResetPasswordApis.post({
      code,
      password,
      passwordConfirmation,
    });
    return response;
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return {};
  }
};
