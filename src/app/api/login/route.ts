import Usuario from "@/lib/models/Usuario";
import { connectWithMongoose } from "@/lib/mongodb-config";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "esteesunsecretogenericonisiquieraintentesusarloyaquenofuncionará";

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

    // No enviar la contraseña en la respuesta
    const { password: _, username, nombre, history, ...rest } = user as { password?: string; username?: string; nombre?: string; history?: any; [key: string]: any };
    const userWithoutPassword = { email, username, nombre, history, ...rest };

    const token = jwt.sign({ email, username }, SECRET, { expiresIn: "24h" });
    return NextResponse.json({ token, user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}