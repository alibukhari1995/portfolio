import dbConnect from "../../../lib/db";
import Page from "../../../models/Page";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();


    const slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");

    const newPage = await Page.create({ ...data, slug });

    return NextResponse.json({ success: true, page: newPage });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnect();
    const pages = await Page.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
