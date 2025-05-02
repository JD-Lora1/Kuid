
import { useState, useEffect } from 'react';

interface Plan {
  id: string;
  cost: number;
  title: string;
}

export const useSelectedPlans = (availablePlans: Plan[]) => {
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  
  // Toggle plan selection
  const togglePlan = (planId: string) => {
    setSelectedPlanIds(prev => 
      prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };
  
  // Calculate total cost whenever selected plans change
  useEffect(() => {
    const newTotalCost = availablePlans
      .filter(plan => selectedPlanIds.includes(plan.id))
      .reduce((sum, plan) => sum + plan.cost, 0);
      
    setTotalCost(newTotalCost);
  }, [selectedPlanIds, availablePlans]);
  
  // Get selected plans objects
  const getSelectedPlans = () => {
    return availablePlans.filter(plan => selectedPlanIds.includes(plan.id));
  };
  
  return {
    selectedPlanIds,
    togglePlan,
    totalCost,
    getSelectedPlans,
  };
};
