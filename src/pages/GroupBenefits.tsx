
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';

interface Member {
  name: string;
  relationship: string;
}

const GroupBenefits: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  
  const members: Member[] = [
    { name: 'You', relationship: 'Admin' },
    { name: 'Jane Doe', relationship: 'Spouse' },
    { name: 'Timmy Doe', relationship: 'Child' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Invitation Sent',
      description: `An invitation has been sent to ${name}.`,
      duration: 3000,
    });
    setName('');
    setEmail('');
    setRelationship('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container">
          <Link to="/" className="text-primary hover:text-primary-hover flex items-center gap-2 mb-6">
            <ArrowLeft size={16} />
            <span>Volver al Dashboard</span>
          </Link>
          
          <section id="group-content" className="bg-very-light-alt p-8 rounded-lg shadow-kuid">
            <div className="text-center mb-8">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-2">Administra tu Grupo KÜID</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Benefíciate de precios más bajos añadiendo miembros de familia o grupo. ¡Cuantos más miembros, mejores serán las tarifas potenciales!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Miembros del Grupo Actual</h3>
                  <ul className="space-y-2">
                    {members.map((member, index) => (
                      <li key={index} className="flex justify-between items-center border-b pb-2">
                        <span>{member.name}</span>
                        <span className="text-sm text-secondary">{member.relationship}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-6 text-primary">Descuento de Grupo Actual: 5%</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Añadir Nuevo Miembro</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="member-name">Nombre Completo del Miembro:</Label>
                      <Input 
                        id="member-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="member-email">Email del Miembro:</Label>
                      <Input 
                        id="member-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="member-relationship">Relación:</Label>
                      <Input 
                        id="member-relationship" 
                        placeholder="e.g., Spouse, Child, Friend" 
                        value={relationship} 
                        onChange={(e) => setRelationship(e.target.value)} 
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-accent text-dark hover:bg-accent-hover">
                      Enviar Invitación
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroupBenefits;
