import { HeartIcon, GithubIcon, LinkedinIcon, GlobeIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 px-4 h-16">
      <div className="h-full flex justify-center items-center">       
        <div className="flex gap-6">
          <a
            href="https://github.com/Ar1f007/verv-task"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black text-gray-700 transition"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ariful-hoque-al-amin/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 text-gray-700 transition"
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href="https://dev-arif-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 text-gray-700 transition"
          >
            <GlobeIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
