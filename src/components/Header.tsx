
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldHalf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-6 shadow">
      <div className="container flex justify-between items-center">
        <div className="text-left">
          <h1 className="flex items-center text-2xl font-semibold">
            <ShieldHalf className="mr-2" /> KÜID
          </h1>
          <p className="text-sm">Protection that adapts to your life.</p>
        </div>
        
        <Link 
          to="/login" 
          className="bg-white text-primary px-4 py-2 rounded font-semibold text-sm transition-colors whitespace-nowrap hover:bg-very-light-alt hover:text-primary-hover"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
