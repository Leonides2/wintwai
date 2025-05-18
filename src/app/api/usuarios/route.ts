// src/app/api/usuarios/route.ts
import { connectToDatabase } from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const usuarios = await Usuario.find();
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const nuevoUsuario = await Usuario.create(body);
  return NextResponse.json(nuevoUsuario, { status: 201 });
}
