// src/app/api/usuarios/route.ts
import { connectToDatabase } from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  await connectToDatabase();
  const usuarios = await Usuario.find();
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  
  if (!body || !body.email || !body.password || !body.nombre) {
    return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string' || typeof body.nombre !== 'string') {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  if( body.password.length < 6) {
    return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
  }

  // Hashear la contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const nuevoUsuario = await Usuario.create({
    ...body,
    password: hashedPassword,
  });

  return NextResponse.json(nuevoUsuario, { status: 201 });
}
