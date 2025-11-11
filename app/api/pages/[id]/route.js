import dbConnect from "../../../../lib/db";
import Page from "../../../../models/Page";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    const page = await Page.findById(id);
    
    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const data = await req.json();

   
    const slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { ...data, slug },
      { new: true, runValidators: true }
    );

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page: updatedPage });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedPage = await Page.findByIdAndDelete(id);

    if (!deletedPage) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page: deletedPage });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}