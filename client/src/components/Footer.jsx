import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6 mt-0 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          © 2025 Quizzo - AI Quiz Generator — Made with{" "}
          <span className="text-red-400">❤️</span>.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          
          <a
            target="_blank"
            href="https://github.com/SgAtjiit"
            className="hover:text-blue-400"
          >
            Github
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/shrish-gupta-94711b280"
            className="hover:text-blue-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
