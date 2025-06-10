import Usuario from "@/lib/models/Usuario";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "esteesunsecretogenericonisiquieraintentesusarloyaquenofuncionará";

function getEmailFromToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, SECRET) as jwt.JwtPayload;
    return typeof payload === "object" && payload && "email" in payload ? String(payload.email) : null;
  } catch {
    return null;
  }
}

export async function PUT(req: Request) {
   await connectToDatabase();
  const email = getEmailFromToken(req);
  if (!email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { history } = await req.json();
  // Actualizar el atributo history del usuario
  const usuarioActualizado = await Usuario.findOneAndUpdate(
    { email: email },
    { history},
    { new: true }
  );

  if (!usuarioActualizado) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  return NextResponse.json(usuarioActualizado);
}