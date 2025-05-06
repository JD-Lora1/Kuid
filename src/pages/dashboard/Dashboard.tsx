
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Calendar, Zap, BarChart3, ArrowRight, Trophy } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get the selected modules from local storage
  const selectedModulesData = localStorage.getItem('kuid_selected_modules');
  const selectedModules = selectedModulesData ? JSON.parse(selectedModulesData) : [];
  
  // Mock data for the dashboard
  const coverageStatus = {
    active: true,
    nextPayment: '15 de junio, 2025',
    monthlyPayment: (110000).toLocaleString('es-CO'),
  };
  
  const recentActivity = [
    { date: '01/06/2025', description: 'Pago mensual procesado', amount: '$110.000' },
    { date: '25/05/2025', description: 'Conexión con smartwatch', amount: '' },
    { date: '15/05/2025', description: 'Premio de fidelidad aplicado', amount: '-$5.500' }
  ];
  
  const objectives = [
    { name: 'Pasos diarios', progress: 80, target: '10.000 pasos', current: '8.000 pasos' },
    { name: 'Verificaciones médicas', progress: 33, target: '3 por año', current: '1 de 3' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Bienvenido, {user?.name.split(' ')[0]}</h1>
        <p className="text-secondary">Aquí está el estado actual de tu protección KÜID.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">Estado de tu cobertura</h2>
              </div>
              <div className="flex items-center">
                <span className="flex h-3 w-3 me-2">
                  <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${coverageStatus.active ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${coverageStatus.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </span>
                <span className={`text-sm font-medium ${coverageStatus.active ? 'text-green-600' : 'text-red-600'}`}>
                  {coverageStatus.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-secondary mb-1">Próximo pago:</p>
                <p className="font-medium">{coverageStatus.nextPayment}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-secondary mb-1">Pago mensual:</p>
                <p className="font-medium">${coverageStatus.monthlyPayment}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Módulos contratados:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedModules.includes('health') && (
                  <span className="bg-health/10 text-health px-3 py-1 text-sm rounded-full">Salud</span>
                )}
                {selectedModules.includes('income') && (
                  <span className="bg-income/10 text-income px-3 py-1 text-sm rounded-full">Protección de Ingresos</span>
                )}
                {selectedModules.includes('children') && (
                  <span className="bg-children/10 text-children px-3 py-1 text-sm rounded-full">Familia</span>
                )}
                {selectedModules.includes('pets') && (
                  <span className="bg-pets/10 text-pets px-3 py-1 text-sm rounded-full">Mascotas</span>
                )}
                {selectedModules.includes('travel') && (
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full">Viajes</span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                className="text-primary"
                onClick={() => navigate('/insurance-settings')}
              >
                Ajustar cobertura
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-semibold text-lg">Próximos eventos</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-3">
                <p className="text-sm font-medium">Vencimiento de pago</p>
                <p className="text-xs text-gray-500">15 de junio, 2025</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-3">
                <p className="text-sm font-medium">Revisión médica anual</p>
                <p className="text-xs text-gray-500">27 de junio, 2025</p>
              </div>
            </div>

            <Button 
              variant="link" 
              className="w-full mt-4 text-primary"
              size="sm"
            >
              Ver todos los eventos
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-semibold text-lg">Actividad reciente</h2>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  {activity.amount && (
                    <span className={activity.amount.includes('-') ? 'text-green-600' : ''}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">Objetivos y recompensas</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs flex items-center"
                onClick={() => navigate('/rewards')}
              >
                Ver todas
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {objectives.map((objective, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium">{objective.name}</p>
                    <p className="text-sm text-gray-500">{objective.current}</p>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Objetivo: {objective.target}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-3">
              <div className="flex items-start">
                <Trophy className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">¡A punto de desbloquear!</p>
                  <p className="text-xs text-gray-600">Completa 10.000 pasos diarios por 30 días para ganar $10.000 de reembolso.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
