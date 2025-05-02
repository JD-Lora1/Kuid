
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Watch, Smartphone, ArrowRight, CalendarDays, Landmark, BookOpen, Check } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
}

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
}

const ConnectDevices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 'watch', name: 'Smartwatch', icon: <Watch className="h-6 w-6" />, connected: false },
    { id: 'phone', name: 'Smartphone', icon: <Smartphone className="h-6 w-6" />, connected: false },
  ]);

  const [apps, setApps] = useState<App[]>([
    { 
      id: 'calendar', 
      name: 'Calendario', 
      description: 'Sincroniza tus planes de viaje para posibles alertas.',
      icon: <CalendarDays className="h-8 w-8 text-green-500" />, 
      connected: false 
    },
    { 
      id: 'finance', 
      name: 'Agregador Financiero', 
      description: 'Verifica cambios de ingresos automáticamente.',
      icon: <Landmark className="h-8 w-8 text-teal-500" />, 
      connected: false 
    },
    { 
      id: 'health', 
      name: 'Portal de Salud', 
      description: 'Comparte información de diagnóstico de forma segura.',
      icon: <BookOpen className="h-8 w-8 text-red-400" />, 
      connected: false 
    },
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConnectDevice = (deviceId: string) => {
    // Simulate device connection
    toast({
      title: "Conectando dispositivo",
      description: "Por favor espere mientras establecemos la conexión...",
    });

    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === deviceId ? { ...device, connected: true } : device
      ));

      toast({
        title: "Dispositivo conectado",
        description: "El dispositivo ha sido conectado exitosamente.",
      });
    }, 1500);
  };

  const handleConnectApp = (appId: string) => {
    // Simulate app connection
    toast({
      title: "Conectando aplicación",
      description: "Por favor espere mientras establecemos la conexión...",
    });

    setTimeout(() => {
      setApps(apps.map(app => 
        app.id === appId ? { ...app, connected: true } : app
      ));

      toast({
        title: "Aplicación conectada",
        description: "La aplicación ha sido conectada exitosamente.",
      });
    }, 1500);
  };

  const handleFinish = () => {
    // Update user status to no longer be a new user
    const savedUser = localStorage.getItem('kuid_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      user.isNewUser = false;
      localStorage.setItem('kuid_user', JSON.stringify(user));
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-very-light-alt py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Conecta tus dispositivos y aplicaciones</h1>
          <p className="text-secondary text-lg mb-1">
            Personaliza tu experiencia conectando tus dispositivos y aplicaciones favoritas.
          </p>
          <p className="text-sm text-secondary">
            (Este paso es opcional - puedes omitirlo y configurarlo más tarde)
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Dispositivos wearables</h2>
          <p className="text-secondary mb-6">
            Conecta tus dispositivos para monitorear tu actividad y salud para una protección más inteligente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <Card key={device.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      {device.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{device.name}</h3>
                      {device.connected && (
                        <div className="flex items-center text-green-600 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          Conectado
                        </div>
                      )}
                    </div>
                    {!device.connected && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConnectDevice(device.id)}
                      >
                        Conectar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Aplicaciones</h2>
          <p className="text-secondary mb-6">
            Vincula otras aplicaciones relevantes para una visión más completa y una protección aún más inteligente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apps.map((app) => (
              <Card key={app.id}>
                <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4">
                    {app.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{app.name}</h3>
                  <p className="text-sm text-secondary mb-4 flex-grow">{app.description}</p>
                  <div className="mt-auto w-full">
                    {app.connected ? (
                      <Button 
                        variant="outline" 
                        className="w-full text-green-600 border-green-600 flex items-center justify-center"
                        disabled
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Conectado
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleConnectApp(app.id)}
                      >
                        Conectar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleFinish}
            size="lg"
            className="flex items-center gap-2 px-8"
          >
            Finalizar y continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectDevices;
