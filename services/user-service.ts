import { apiClient } from "@/lib/http/api-client";
import { UserProfile } from "@/types/user";

export const userService = {
  /**
   * Obtiene el perfil detallado del usuario por su ID desde el backend.
   */
  getProfile: async (id: string, token: string): Promise<UserProfile> => {
    return apiClient.get<UserProfile>(`/users/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Actualiza los datos del perfil de un usuario.
   */
  updateProfile: async (
    id: string,
    data: Partial<UserProfile>,
    token: string
  ): Promise<UserProfile> => {
    return apiClient.patch<UserProfile>(`/users/${id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
