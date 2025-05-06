import React from 'react';
import { Trophy, Star, Activity, Check } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';

interface Reward {
  icon: React.ReactNode;
  title: string;
  description: string;
  goal: string;
  progress: number;
  isEarned: boolean;
}

const Rewards: React.FC = () => {
  const rewards: Reward[] = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: 'Bono de lealtad',
      description: '1 Año de Aniversario - ¡5% Off en el siguiente mes!',
      goal: 'Haber sido un miembro KÜID por 12 meses seguidos',
      progress: 100,
      isEarned: true
    },
    {
      icon: <Activity className="h-6 w-6 text-green-500" />,
      title: 'Meta Fitness',
      description: 'Caminar 10,000 pasos diarios por 30 días seguidos - COP 10.000 en Cashback',
      goal: 'Ten un promedio de 10,000 pasos diarios por 30 días',
      progress: 80,
      isEarned: false
    },
    {
      icon: <Trophy className="h-6 w-6 text-primary" />,
      title: 'Community Contributor',
      description: 'Successfully referred a friend - $20 credit!',
      goal: 'Refer a friend who joins KÜID',
      progress: 100,
      isEarned: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Recompensas y Logros</h1>
        <p className="text-secondary">Aquí hay un resumen de los beneficios y recompensas que has desbloqueado con KÜID.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg hover:shadow-sm transition-all flex flex-col h-full"
              >
                <div className="flex flex-col items-center mb-4 relative">
                  <div className={`p-3 rounded-full ${
                    reward.isEarned 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {reward.icon}
                  </div>
                  {reward.isEarned && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-medium text-center mb-2">{reward.title}</h3>
                
                <div className="h-12 mb-4 flex items-center justify-center">
                  <p className="text-secondary text-sm text-center">{reward.description}</p>
                </div>
                
                <div className="w-full mt-auto">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Objetivo:</span>
                    <span className="text-gray-500 text-right flex-1 ml-2">{reward.goal}</span>
                  </div>
                  <Progress value={reward.progress} className="h-2 mb-1" />
                  <div className="flex justify-between text-xs mt-1">
                    <span>0%</span>
                    <span className={reward.isEarned ? "text-green-600 font-semibold" : "text-secondary"}>
                      {reward.progress}%
                    </span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Badge className={`${reward.isEarned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {reward.isEarned ? 'Conseguido' : 'En progreso'}
                  </Badge>
                </div>
                
                <div className="h-8 mt-3 flex items-center justify-center">
                  {!reward.isEarned && reward.progress > 0 && (
                    <Button 
                      variant="link" 
                      className="w-full text-primary text-sm p-0 h-auto"
                    >
                      Ver detalles
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Rewards;