
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Landmark, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';

const ConnectApp: React.FC = () => {
  const handleConnect = (service: string) => {
    toast({
      title: `Connecting to ${service}`,
      description: `Initiating connection to ${service}...`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container">
          <Link to="/" className="text-primary hover:text-primary-hover flex items-center gap-2 mb-6">
            <ArrowLeft size={16} />
            <span>Volver al Dashboard</span>
          </Link>
          
          <section id="app-content" className="bg-very-light-alt p-8 rounded-lg shadow-kuid">
            <div className="text-center mb-8">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-2">Conectar Aplicaciones</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Vincula otras aplicaciones relevantes (como calendarios, aplicaciones financieras, registros de salud) para una visión más completa y una protección KÜID aún más inteligente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <CalendarDays className="text-[#34A853] text-5xl mb-4" />
                <h3 className="font-semibold text-xl mb-2">Calendar App</h3>
                <p className="text-secondary text-sm mb-6">Sync travel plans for potential alerts.</p>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Calendar App')}
                >
                  Conectar
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <Landmark className="text-[#00D1B2] text-5xl mb-4" />
                <h3 className="font-semibold text-xl mb-2">Financial Aggregator</h3>
                <p className="text-secondary text-sm mb-6">Verify income changes automatically.</p>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Financial Aggregator')}
                >
                  Conectar
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <BookOpen className="text-[#FF6B6B] text-5xl mb-4" />
                <h3 className="font-semibold text-xl mb-2">Health Record Portal</h3>
                <p className="text-secondary text-sm mb-6">Share diagnostic info securely.</p>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Health Record Portal')}
                >
                  Conectar
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConnectApp;
