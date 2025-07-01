"use server";

import { apiPost } from "@/utils/apiFetch";

const api_name = "leads";

export async function registerLead(leadData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  source: string;
  related_items?: string;
}) {
  const response = await apiPost(`/api/${api_name}/register`, {
    data: leadData,
  });
  return response;
  // const options = {
  //   filters: {
  //     email: {
  //       $eq: leadData.email,
  //     },
  //   },
  // };

  // const response = await apiGet(
  //   `/api/${api_name}/register`,
  //   stringifyFilters(options),
  //   true
  // );

  // if (response?.data?.data?.length) {
  //   const existingLead = response.data.data[0];
  //   const leadId = existingLead.id;

  //   let updatedSource = existingLead.source ?? [];
  //   if (!updatedSource.includes(leadData.source)) {
  //     updatedSource = [...updatedSource, leadData.source];
  //   }

  //   let updatedRelatedItems = existingLead.related_items ?? "";
  //   if (leadData.related_items) {
  //     updatedRelatedItems += `\n${leadData.related_items}`;
  //   }

  //   const updatedLeadData = {
  //     first_name: leadData.first_name,
  //     last_name: leadData.last_name,
  //     phone_number: leadData.phone_number,
  //     source: updatedSource,
  //     related_items: updatedRelatedItems.trim(),
  //   };

  //   const updateResponse = await apiPut(`/api/${api_name}/${leadId}`, {
  //     data: updatedLeadData,
  //   });
  //   return updateResponse;
  // } else {
  //   const newLeadData = {
  //     ...leadData,
  //     source: [leadData.source],
  //   };

  //   const createResponse = await apiPost(`api/${api_name}/register`, {
  //     data: newLeadData,
  //   });
  //   return createResponse;
  // }
}
