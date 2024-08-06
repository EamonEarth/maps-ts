import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { cn } from "@/lib/utils";
import { routes } from "./main-nav";
import { X } from "lucide-react";
import Link from "next/link";
import headerBgOpac from "/public/header-opac3.png"

const MobileSidebar: React.FC = () => {
  const { isOpen, toggleSidebar } = useMobileSidebar();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-80 transition-opacity z-40",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <div
        style={{ 
          backgroundImage: `url(${headerBgOpac.src})`,
          transition: "transform 0.5s ease-in-out" }}
        className={cn(
          "fixed -right-1 top-0 h-screen w-[70%] max-w-[300px] bg-cyan-600 p-4 flex flex-col z-50",
          "transform-gpu",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="self-end text-white"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <X size={24} />
        </button>

        {/* Links */}
        <nav className="flex flex-col mt-4">
          {routes.map((route) => (
            <Link href={route.href} key={`mob-${route.title}`}>
              <div
                onClick={toggleSidebar}
                className="py-2 text-white text-lg hover:underline"
                role="menuitem"
              >
                {route.title}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
