
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Activity } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

interface Reward {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Rewards: React.FC = () => {
  const rewards: Reward[] = [
    {
      icon: <Star className="h-10 w-10 text-yellow-500" />,
      title: 'Loyalty Bonus',
      description: '1 Year Anniversary - 5% discount applied next month!'
    },
    {
      icon: <Activity className="h-10 w-10 text-green-500" />,
      title: 'Fitness Goal Achieved',
      description: 'Reached 10,000 steps daily for 30 days - $10 Cashback!'
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: 'Community Contributor',
      description: 'Successfully referred a friend - $20 credit!'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container">
          <Link to="/" className="text-primary hover:text-primary-hover flex items-center gap-2 mb-6">
            <ArrowLeft size={16} />
            <span>Volver al Dashboard</span>
          </Link>
          
          <section id="rewards-content" className="bg-very-light-alt p-8 rounded-lg shadow-kuid">
            <div className="text-center mb-8">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-2">Tus Recompensas y Logros</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Aquí hay un resumen de los beneficios y recompensas que has desbloqueado con KÜID.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {rewards.map((reward, index) => (
                <Card key={index} className="text-center hover:shadow-kuid transition-all">
                  <CardContent className="pt-6 flex flex-col items-center">
                    <div className="mb-4">
                      {reward.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                    <p className="text-secondary">{reward.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rewards;
