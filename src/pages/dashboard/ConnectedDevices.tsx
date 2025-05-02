
import React, { useState } from 'react';
import { Watch, Smartphone, Check, CalendarDays, Landmark, BookOpen } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { Separator } from '../../components/ui/separator';

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSynced?: string;
}

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
}

const ConnectedDevices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: 'watch', 
      name: 'Smartwatch', 
      icon: <Watch className="h-6 w-6" />, 
      connected: true,
      lastSynced: '02/06/2025 09:15'
    },
    { 
      id: 'phone', 
      name: 'Smartphone', 
      icon: <Smartphone className="h-6 w-6" />, 
      connected: false 
    },
  ]);

  const [apps, setApps] = useState<App[]>([
    { 
      id: 'calendar', 
      name: 'Calendario', 
      description: 'Sincroniza tus planes de viaje para posibles alertas.',
      icon: <CalendarDays className="h-8 w-8 text-green-500" />, 
      connected: true,
      lastSync: '01/06/2025 18:30'
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

  const handleConnectDevice = (deviceId: string) => {
    toast({
      title: "Conectando dispositivo",
      description: "Por favor espere mientras establecemos la conexión...",
    });

    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === deviceId 
          ? { ...device, connected: true, lastSynced: new Date().toLocaleString() } 
          : device
      ));

      toast({
        title: "Dispositivo conectado",
        description: "El dispositivo ha sido conectado exitosamente.",
      });
    }, 1500);
  };

  const handleDisconnectDevice = (deviceId: string) => {
    toast({
      title: "Desconectando dispositivo",
      description: "Por favor espere...",
    });

    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === deviceId ? { ...device, connected: false, lastSynced: undefined } : device
      ));

      toast({
        title: "Dispositivo desconectado",
        description: "El dispositivo ha sido desconectado exitosamente.",
      });
    }, 1000);
  };

  const handleConnectApp = (appId: string) => {
    toast({
      title: "Conectando aplicación",
      description: "Por favor espere mientras establecemos la conexión...",
    });

    setTimeout(() => {
      setApps(apps.map(app => 
        app.id === appId 
          ? { ...app, connected: true, lastSync: new Date().toLocaleString() } 
          : app
      ));

      toast({
        title: "Aplicación conectada",
        description: "La aplicación ha sido conectada exitosamente.",
      });
    }, 1500);
  };

  const handleDisconnectApp = (appId: string) => {
    toast({
      title: "Desconectando aplicación",
      description: "Por favor espere...",
    });

    setTimeout(() => {
      setApps(apps.map(app => 
        app.id === appId ? { ...app, connected: false, lastSync: undefined } : app
      ));

      toast({
        title: "Aplicación desconectada",
        description: "La aplicación ha sido desconectada exitosamente.",
      });
    }, 1000);
  };

  const handleSyncAll = () => {
    toast({
      title: "Sincronizando todos los dispositivos",
      description: "Por favor espere mientras sincronizamos sus datos...",
    });

    setTimeout(() => {
      const now = new Date().toLocaleString();
      
      setDevices(devices.map(device => 
        device.connected ? { ...device, lastSynced: now } : device
      ));
      
      setApps(apps.map(app => 
        app.connected ? { ...app, lastSync: now } : app
      ));

      toast({
        title: "Sincronización completada",
        description: "Todos los dispositivos y aplicaciones conectadas han sido sincronizadas.",
      });
    }, 2000);
  };

  const connectedDevicesCount = devices.filter(d => d.connected).length;
  const connectedAppsCount = apps.filter(a => a.connected).length;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dispositivos y Aplicaciones</h1>
          <p className="text-secondary">
            Controla tus dispositivos wearables y aplicaciones conectadas a KÜID.
          </p>
        </div>
        
        <div>
          <Button 
            variant="outline" 
            onClick={handleSyncAll}
            disabled={connectedDevicesCount + connectedAppsCount === 0}
          >
            Sincronizar todo ahora
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dispositivos wearables</CardTitle>
          <CardDescription>
            Conecta tus dispositivos para monitorear tu actividad y salud para una protección más inteligente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div 
                key={device.id}
                className="border border-gray-100 rounded-lg overflow-hidden"
              >
                <div className="flex items-center p-4">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    {device.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{device.name}</h3>
                    {device.connected && device.lastSynced && (
                      <div className="text-xs text-gray-500">
                        Última sincronización: {device.lastSynced}
                      </div>
                    )}
                  </div>
                  {device.connected ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-green-600 text-sm mr-2">
                        <Check className="h-4 w-4 mr-1" />
                        Conectado
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisconnectDevice(device.id)}
                      >
                        Desconectar
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnectDevice(device.id)}
                    >
                      Conectar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <p className="text-sm text-secondary">
              Conectar más dispositivos ayuda a KÜID a ofrecer una protección más adaptada a tus necesidades.
            </p>
            <Button variant="link" size="sm" className="text-primary">
              + Agregar dispositivo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aplicaciones</CardTitle>
          <CardDescription>
            Vincula otras aplicaciones relevantes para una visión más completa y una protección aún más inteligente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div 
                key={app.id}
                className="border border-gray-100 p-4 rounded-lg h-full flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <div className="mr-3">{app.icon}</div>
                  <h3 className="font-medium">{app.name}</h3>
                </div>
                <p className="text-sm text-secondary mb-4 flex-1">{app.description}</p>
                {app.connected && app.lastSync && (
                  <p className="text-xs text-gray-500 mb-3">Última sincronización: {app.lastSync}</p>
                )}
                <div className="mt-auto">
                  {app.connected ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Conectada
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-2"
                        onClick={() => handleDisconnectApp(app.id)}
                      >
                        Desconectar
                      </Button>
                    </div>
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
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <p className="text-sm text-secondary">
              Conectar aplicaciones permite a KÜID acceder a datos relevantes para mejorar tu protección.
            </p>
            <Button variant="link" size="sm" className="text-primary">
              + Agregar aplicación
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ConnectedDevices;
