import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
    >
      {children}
    </a>
  );
};
