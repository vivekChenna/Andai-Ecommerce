"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
          Empower Your Business with AI Solutions
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          <span className="">Andaihub</span> provides cutting-edge AI workflows, intelligent agents, advanced
          chatbots, easy-to-integrate AI Plugins, and a comprehensive AI
          Marketplace to revolutionize your operations.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            size="lg"
            className="bg-black text-white py-2 px-5 rounded-md font-medium transition-colors ease-in-out duration-300 hover:bg-black/80"
            onClick={() => {
              router.push("/latest");
            }}
          >
            Explore AI Plugins
          </button>
          <button
            size="lg"
            className=" bg-white border-2 border-gray-200 rounded-md text-black py-2 px-5 font-medium hover:bg-gray-100 transition-colors ease-in-out duration-300"
            onClick={() => {
              router.push("/search");
            }}
          >
            Visit AI Marketplace
          </button>
        </div>
      </div>
    </section>
  );
}
