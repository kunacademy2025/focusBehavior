import { apiDelete, apiPost, apiPut } from "@/utils/apiFetch";

export async function uploadFile(file: File): Promise<unknown> {
  const formData = new FormData();
  formData.append("files", file);

  const response = await apiPost(`/api/upload/`, formData, false, true);

  return response?.data[0];
}

export async function disconnectFile(data: unknown, routes: string) {
  const resp = await apiPut(`/api/${routes}`, {
    data,
  });
  return resp;
}

export async function deleteFile(id: string) {
  const resp = await apiDelete(`/api/upload/files/${id}`);
  return resp;
}
