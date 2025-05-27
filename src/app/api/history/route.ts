import Usuario from "@/lib/models/Usuario";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  // Validar datos de entrada
  if (!body || !body.email || !Array.isArray(body.history)) {
    return NextResponse.json({ error: 'Faltan datos requeridos o formato incorrecto' }, { status: 400 });
  }

  // Actualizar el atributo history del usuario
  const usuarioActualizado = await Usuario.findOneAndUpdate(
    { email: body.email },
    { history: body.history },
    { new: true }
  );

  if (!usuarioActualizado) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  return NextResponse.json(usuarioActualizado);
}