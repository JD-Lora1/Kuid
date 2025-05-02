
import React from 'react';
import { Sparkles } from 'lucide-react';

const Onboarding: React.FC = () => {
  return (
    <section id="onboarding" className="py-12 bg-very-light-alt">
      <div className="container text-center">
        <Sparkles className="mx-auto mb-5 text-primary text-4xl" />
        <h2 className="text-3xl font-semibold mb-4 text-primary">Welcome to KÜID Intelligent Protection</h2>
        <p className="text-lg max-w-2xl mx-auto text-dark">
          Experience protection that understands and evolves with you. Simple, caring, and always active.
        </p>
      </div>
    </section>
  );
};

export default Onboarding;
