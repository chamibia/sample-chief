import Link from "next/link";

export default function CollabButton() {
  return (
    <Link 
      href="/contact" 
      className="font-sans font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#202020] hover:border-[#202020] hover:text-white rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center justify-center px-6 py-3 text-[#202020] w-full"
    >
      Collab with Us
    </Link>
  );
}