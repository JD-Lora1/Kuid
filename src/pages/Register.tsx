
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldHalf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      toast({
        title: "Registro exitoso",
        description: "Bienvenido a KÜID. Configuremos tu seguro personalizado.",
      });
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "No se pudo completar el registro. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-body min-h-screen flex items-center justify-center bg-very-light-alt p-4">
      <div className="auth-container w-full max-w-md bg-white rounded-lg shadow-kuid p-8">
        <div className="text-4xl font-bold mb-5 text-dark flex justify-center items-center">
          <ShieldHalf className="mr-2" /> KÜID
        </div>
        
        <h2 className="text-2xl font-semibold mb-8 text-dark text-center">Crear una cuenta</h2>
        
        {/* Google Signup Button */}
        <button className="flex items-center justify-center gap-3 w-full py-3 px-4 text-base font-medium text-dark bg-white border border-gray-300 rounded-md transition-colors hover:bg-gray-50 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
            <path fill="#4285f4" d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" />
            <path fill="#34a853" d="M41.869 113.38l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" />
            <path fill="#fbbc05" d="M41.869 78.12c-3.295 9.836-5.1 20.333-5.1 31.19s1.805 21.354 5.1 31.19l31.65-24.56-31.65-37.82z" />
            <path fill="#ea4335" d="M95.25 37.75c14.176 0 26.944 4.882 37.249 14.403l27.325-27.325C143.13 10.099 120.62 0 95.25 0 57.577 0 25.149 22.122 9.81 53.647l31.65 24.54c7.41-22.514 28.574-40.437 53.79-40.437z" />
          </svg>
          Registrarse con Google
        </button>
        
        {/* Divider */}
        <div className="flex items-center text-center text-secondary my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm">o registrarse con email</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-left">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-dark">
              Nombre completo
            </label>
            <Input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="mb-5 text-left">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-dark">
              Email
            </label>
            <Input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-dark">
              Contraseña
            </label>
            <Input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="mb-6 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4 cursor-pointer" required />
              <label htmlFor="terms" className="text-secondary cursor-pointer">
                Acepto los <a href="#" className="text-primary">términos y condiciones</a>
              </label>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white rounded-md transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #E0BBE4 0%, #9B59B6 100%)" }}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>
        
        <div className="mt-8 text-sm text-secondary text-center">
          ¿Ya tienes una cuenta? {" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
