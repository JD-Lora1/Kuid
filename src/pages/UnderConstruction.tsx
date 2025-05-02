
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

interface UnderConstructionProps {
  title: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 bg-very-light-alt">
        <div className="container max-w-md text-center px-4">
          <Construction size={64} className="text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
          <p className="text-secondary mb-8">
            This feature is coming soon. We're working hard to bring you the best experience possible.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UnderConstruction;
