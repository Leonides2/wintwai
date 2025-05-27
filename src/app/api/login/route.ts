import Usuario from "@/lib/models/Usuario";
import { connectWithMongoose } from "@/lib/mongodb-config";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectWithMongoose();

    const user = await Usuario.findOne({ email }).lean() as { password: string; [key: string]: any } | null;

    if (!user) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    //No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user as { password?: string; [key: string]: any };

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}