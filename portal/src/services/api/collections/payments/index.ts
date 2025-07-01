import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import PaymentModel from "./model";

export const PaymentApis = new DefaultApiService<PaymentModel>(
  ServiceName.PAYMENTS
);

const getPaymentStatusApi = (id: string): ServiceName =>
  `${ServiceName.PAYMENTS}/${id}/check-status` as ServiceName;

export const PaymentStatusApis = (id: string) =>
  new DefaultApiService(getPaymentStatusApi(id));
