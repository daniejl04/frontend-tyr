import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/get-session";
import { getAccessTokenFromCookies } from "@/lib/auth/session-server";
import { userService } from "@/services/user-service";

export async function GET() {
  try {
    const session = await getServerSession();
    const token = await getAccessTokenFromCookies();

    if (!session || !token) {
      return NextResponse.json(
        { error: "No autorizado. Sesión inválida o expirada." },
        { status: 401 }
      );
    }

    const userProfile = await userService.getProfile(session.userId, token);
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error in /api/profile endpoint:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al obtener el perfil de usuario",
      },
      { status: 500 }
    );
  }
}
