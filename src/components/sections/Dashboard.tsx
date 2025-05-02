
import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, AlertTriangle, Trophy, PiggyBank, Users, Smartphone, Award } from 'lucide-react';
import Watch from '../icons/Watch';

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-12 bg-very-light-alt">
      <div className="container">
        <h2 className="text-3xl font-semibold mb-8 text-primary text-center">Your Adaptive Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <Lightbulb className="text-idea mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-3 text-dark">Recommendations</h3>
            <p className="text-secondary text-sm mb-auto">Smart suggestions based on your connected life.</p>
          </div>
          
          {/* Risk Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <AlertTriangle className="text-warning mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-3 text-dark">Risk Alerts</h3>
            <p className="text-secondary text-sm mb-auto">Real-time warnings based on integrated data.</p>
          </div>
          
          {/* Rewards */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <Award className="text-primary mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-3 text-dark">Rewards & Benefits</h3>
            <p className="text-secondary text-sm mb-auto">Achievements unlocked and benefits earned.</p>
            <Link to="/rewards" className="btn-link">Ver Recompensas</Link>
          </div>
          
          {/* Savings */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <PiggyBank className="text-secondary-accent mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-3 text-dark">Savings & Cashback</h3>
            <p className="text-secondary text-sm mb-auto">Get cashback for protection you didn't need.</p>
          </div>
          
          {/* Group Benefits */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <Users className="text-primary mb-4 text-4xl" />
            <h3 className="text-xl font-semibold mb-3 text-dark">Group Benefits</h3>
            <p className="text-secondary text-sm mb-auto">Lower prices by joining the community.</p>
            <Link to="/group-benefits" className="btn-link">Manage Group</Link>
          </div>
          
          {/* Integrations */}
          <div className="bg-white p-6 rounded-lg shadow-kuid hover:transform hover:-translate-y-1 hover:shadow-kuid-hover transition-all flex flex-col">
            <h3 className="text-xl font-semibold mb-3 text-dark">Integrations</h3>
            <p className="text-secondary text-sm mb-auto">Connect your world for smarter protection.</p>
            <Link to="/connect-wearables" className="btn-link primary">
              <Watch className="w-4 h-4 inline mr-1" /> Conectar Wearables
            </Link>
            <Link to="/connect-app" className="btn-link primary mt-2">
              <Smartphone size={16} /> Conectar Aplicación
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
