import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    bannerTitle: { type: String },
    bannerImage: { type: String }, 
    sectionImage: { type: String }, 
    sectionContent: { type: String },
    imageFirst: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
