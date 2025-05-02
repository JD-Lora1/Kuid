
import React from 'react';
import { Bell, Shield, Watch, Calendar, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
  icon: React.ReactNode;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: 'Pago próximo a vencer',
      message: 'Su pago mensual vence en 3 días. Por favor, asegúrese de tener fondos suficientes.',
      date: '02/06/2025',
      read: false,
      type: 'warning',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Objetivo casi completado',
      message: 'Estás a 2,000 pasos de completar tu objetivo diario. ¡Sigue así!',
      date: '01/06/2025',
      read: false,
      type: 'info',
      icon: <Watch className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Recordatorio de cita médica',
      message: 'Tu cita médica anual está programada para el 27 de junio. No olvides asistir para mantener tus beneficios.',
      date: '01/06/2025',
      read: false,
      type: 'info',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 4,
      title: 'Alerta de clima extremo',
      message: 'Se han detectado condiciones meteorológicas extremas en tu área. Ten precaución y revisa tu cobertura para estos eventos.',
      date: '28/05/2025',
      read: true,
      type: 'warning',
      icon: <AlertTriangle className="h-5 w-5" />
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notificaciones</h1>
          <p className="text-secondary">Mantente informado sobre alertas y actualizaciones importantes.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {unreadCount} sin leer
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Marcar todas como leídas
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas y Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg ${
                    notification.read ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200'
                  } transition-all hover:shadow-sm`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      notification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      notification.type === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block ml-2 w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </h3>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                      <p className="text-secondary text-sm mb-3">{notification.message}</p>
                      {!notification.read && (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-primary"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marcar como leída
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tienes notificaciones en este momento.
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;
