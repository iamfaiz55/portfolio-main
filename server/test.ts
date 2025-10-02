import mongoose from "mongoose";
import Feature from "./models/Feature.js";
// import Feature from "./models/Feature"; // adjust path as needed
// import Feature from "./models/Feature.js"; // adjust path as needed

// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

const features = [
  {
    title: "Full-Stack Development",
    desc: "Building robust backend APIs, dynamic frontend apps, and database integrations for complete web solutions.",
    iconKey: "code",
    color: "#1abc9c",
  },
  {
    title: "Mobile App Development",
    desc: "Creating responsive and performant cross-platform mobile applications using modern frameworks.",
    iconKey: "smartphone",
    color: "#3498db",
  },
  {
    title: "UI/UX Design",
    desc: "Designing user-centric interfaces with modern tools and best practices for seamless user experiences.",
    iconKey: "palette",
    color: "#e67e22",
  },
  {
    title: "API Integration",
    desc: "Seamless integration of third-party APIs for enhanced functionality and automation.",
    iconKey: "api",
    color: "#9b59b6",
  },
  {
    title: "Cloud Deployment",
    desc: "Deploying scalable applications on cloud platforms with CI/CD pipelines for faster delivery.",
    iconKey: "cloud",
    color: "#f1c40f",
  },
  {
    title: "Database Management",
    desc: "Efficient design, optimization, and management of relational and NoSQL databases.",
    iconKey: "database",
    color: "#e74c3c",
  },
  {
    title: "Performance Optimization",
    desc: "Improving app speed, SEO, and overall performance for a better user experience.",
    iconKey: "speedometer",
    color: "#2ecc71",
  },
  {
    title: "Cybersecurity Best Practices",
    desc: "Implementing authentication, authorization, and encryption for secure applications.",
    iconKey: "shield",
    color: "#34495e",
  },
];

async function seedFeatures() {
  try {
    

    // Optional: Remove existing features
    await Feature.deleteMany({});
    console.log("Existing features removed");

    // Insert bulk features
    const inserted = await Feature.insertMany(features);
    console.log(`Inserted ${inserted.length} features successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding features:", error);
    process.exit(1);
  }
}

seedFeatures();
