import dbConnect from "../../lib/db";
import Page from "@/models/Page";

export default async function PageView({ params }) {
  const { slug } = await params; 
  
  await dbConnect();
  const page = await Page.findOne({ slug: slug });

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        404 – Page Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {page.bannerImage && (
        <div className="mb-10">
          <img
            src={page.bannerImage}
            alt={page.bannerTitle || page.name}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
          {page.bannerTitle && (
            <h1 className="text-4xl font-bold text-center mt-6">{page.bannerTitle}</h1>
          )}
        </div>
      )}

      
      <div
        className={`flex flex-col md:flex-row items-center gap-10 ${
          page.imageFirst ? "md:flex-row-reverse" : ""
        }`}
      >
        {page.sectionImage && (
          <img
            src={page.sectionImage}
            alt="Section"
            className="w-full md:w-1/2 rounded-xl shadow-md"
          />
        )}
        {page.sectionContent && (
          <div
            className="w-full md:w-1/2 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.sectionContent }}
          />
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  await dbConnect();
  const pages = await Page.find({}, { slug: 1 });
  
  return pages.map((page) => ({
    slug: page.slug,
  }));
}