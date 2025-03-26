"use client"; 
import ContentForm from "@/app/components/ContentForm";  // Import your form component

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">AI Content Refinement Tool</h1>
      <ContentForm />  {/* Your form component */}
    </main>
  );
}
