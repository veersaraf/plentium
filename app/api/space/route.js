import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const costFile = path.join(process.cwd(), 'public', 'data', 'launch_cost.json');
  const countryFile = path.join(process.cwd(), 'public', 'data', 'launch_country.json');
  const rocketFile = path.join(process.cwd(), 'public', 'data', 'launch_rocket.json');
  const starlinkFile = path.join(process.cwd(), 'public', 'data', 'starlink.json');
  
  const cost = JSON.parse(await fs.readFile(costFile, 'utf8'));
  const country = JSON.parse(await fs.readFile(countryFile, 'utf8'));
  const rocket = JSON.parse(await fs.readFile(rocketFile, 'utf8'));
  const starlink = JSON.parse(await fs.readFile(starlinkFile, 'utf8'));

  return NextResponse.json({ cost, country, rocket, starlink });  
}