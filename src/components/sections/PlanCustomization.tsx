
import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, Baby, Cat } from 'lucide-react';

interface CoverageOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  iconColor: string;
}

const PlanCustomization: React.FC = () => {
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [costBarWidth, setCostBarWidth] = useState<string>("0%");
  
  const coverageOptions: CoverageOption[] = [
    {
      id: "health",
      title: "Health",
      description: "Coverage for your well-being.",
      icon: <Heart className="text-health" size={42} />,
      cost: 50,
      iconColor: "text-health"
    },
    {
      id: "income",
      title: "Income",
      description: "Protect your earnings.",
      icon: <DollarSign className="text-income" size={42} />,
      cost: 40,
      iconColor: "text-income"
    },
    {
      id: "children",
      title: "Children",
      description: "Secure their future.",
      icon: <Baby className="text-children" size={42} />,
      cost: 30,
      iconColor: "text-children"
    },
    {
      id: "pets",
      title: "Pets",
      description: "Care for your furry friends.",
      icon: <Cat className="text-pets" size={42} />,
      cost: 20,
      iconColor: "text-pets"
    }
  ];

  const handleToggleCoverage = (coverageId: string) => {
    setSelectedCoverages(prev => 
      prev.includes(coverageId)
        ? prev.filter(id => id !== coverageId)
        : [...prev, coverageId]
    );
  };

  // Calculate total cost when selected coverages change
  useEffect(() => {
    const newTotalCost = coverageOptions
      .filter(option => selectedCoverages.includes(option.id))
      .reduce((sum, option) => sum + option.cost, 0);
    
    setTotalCost(newTotalCost);
    
    // Calculate width percentage for cost bar (max 140 for this example)
    const maxCost = 140;
    const widthPercentage = Math.min((newTotalCost / maxCost) * 100, 100);
    setCostBarWidth(`${widthPercentage}%`);
  }, [selectedCoverages]);

  return (
    <section id="plan-customization" className="py-12">
      <div className="container text-center">
        <h2 className="text-3xl font-semibold mb-4 text-primary">Build Your Personalized Plan</h2>
        <p className="max-w-2xl mx-auto text-secondary mb-8">
          Select the coverages you need. Activate or pause anytime.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {coverageOptions.map((coverage) => (
            <div 
              key={coverage.id}
              className={`bg-white p-6 rounded-lg shadow-kuid flex flex-col justify-between w-52 transition-all hover:transform hover:-translate-y-1.5 hover:shadow-kuid-hover text-center ${selectedCoverages.includes(coverage.id) ? 'border-2 border-active-border bg-active-bg' : 'border-2 border-transparent'}`}
            >
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-4 text-4xl">{coverage.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-dark">{coverage.title}</h3>
                <p className="text-sm text-secondary">{coverage.description}</p>
              </div>
              <button 
                className={`w-full py-3 px-4 rounded font-semibold text-white transition-colors ${selectedCoverages.includes(coverage.id) ? 'bg-secondary hover:bg-gray-500' : 'bg-primary hover:bg-primary-hover'}`}
                onClick={() => handleToggleCoverage(coverage.id)}
              >
                {selectedCoverages.includes(coverage.id) ? 'Remove from Plan' : 'Add to Plan'}
              </button>
            </div>
          ))}
        </div>
        
        {/* Cost Tracker */}
        <div className="bg-white p-6 mt-10 rounded-lg shadow-kuid border border-[#F1EAF4] max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-primary">Estimated Monthly Cost</h3>
          <p className="text-2xl font-bold text-dark mb-4">${totalCost.toFixed(2)} / month</p>
          <div className="cost-bar-outer">
            <div 
              className="cost-bar-inner"
              style={{ width: costBarWidth }}
            >
              {totalCost > 0 ? '$' + totalCost : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanCustomization;
