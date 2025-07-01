import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import UserModel from "./model";

const VerifyPasswordApi: ServiceName =
  `${ServiceName.AUTH}/verify-password` as ServiceName;
const ForgotPasswordApi: ServiceName =
  `${ServiceName.AUTH}/forgot-password` as ServiceName;
const ChangePasswordApi: ServiceName =
  `${ServiceName.AUTH}/change-password` as ServiceName;
const LoginApi: ServiceName = `${ServiceName.AUTH}/local` as ServiceName;
const CreateApi: ServiceName = `${ServiceName.AUTH}/local/register` as ServiceName;
const ResetPasswordApi: ServiceName = `${ServiceName.AUTH}/reset-password` as ServiceName;

export const UserApis = new DefaultApiService<UserModel>(ServiceName.USERS);

// Auth
export const VerifyPasswordApis = new DefaultApiService<UserModel>(
  VerifyPasswordApi
);
export const ForgotPasswordApis = new DefaultApiService(ForgotPasswordApi);
export const ChangePasswordApis = new DefaultApiService(ChangePasswordApi);
export const LoginApis = new DefaultApiService(LoginApi);
export const CreateApis = new DefaultApiService(CreateApi);
export const ResetPasswordApis = new DefaultApiService(ResetPasswordApi);
