
import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';
import Watch from '../components/icons/Watch';

const ConnectWearables: React.FC = () => {
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
          
          <section id="wearables-content" className="bg-very-light-alt p-8 rounded-lg shadow-kuid">
            <div className="text-center mb-8">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Watch className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-2">Conecta tu Wearable</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Integra tu rastreador de actividad física o smartwatch para desbloquear recomendaciones de salud personalizadas, alertas de riesgo y posibles recompensas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <Apple className="text-[#A2AAAD] text-5xl mb-4" />
                <h3 className="font-semibold text-xl mb-4">Apple Health</h3>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Apple Health')}
                >
                  Conectar
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <div className="text-[#4285F4] text-5xl mb-4">
                  <svg viewBox="0 0 24 24" height="48" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-4">Google Fit</h3>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Google Fit')}
                >
                  Conectar
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <div className="text-[#00B0B9] text-5xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-4">Fitbit</h3>
                <Button 
                  variant="default"
                  className="mt-auto"
                  onClick={() => handleConnect('Fitbit')}
                >
                  Conectar
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-kuid transition-all flex flex-col items-center text-center">
                <LinkIcon className="text-accent text-5xl mb-4" />
                <h3 className="font-semibold text-xl mb-4">Otros (Manual/API)</h3>
                <Button 
                  variant="secondary"
                  className="mt-auto"
                  onClick={() => handleConnect('otras opciones')}
                >
                  Explorar
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

export default ConnectWearables;
