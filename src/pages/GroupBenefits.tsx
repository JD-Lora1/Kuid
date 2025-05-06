
import React, { useState } from 'react';
import { Users, UserPlus, Check } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';
import { Progress } from '../components/ui/progress';

interface Member {
  name: string;
  relationship: string;
  joinDate?: string;
  discount?: number;
}

const GroupBenefits: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  
  const members: Member[] = [
    { name: 'Tú', relationship: 'Admin', joinDate: '01/01/2024', discount: 5 },
    { name: 'Jane Doe', relationship: 'Esposo', joinDate: '02/15/2024', discount: 3 },
    { name: 'Timmy Doe', relationship: 'Hijo', joinDate: '03/10/2024', discount: 2 },
  ];
  
  const totalDiscount = members.reduce((acc, member) => acc + (member.discount || 0), 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Invitación Enviada',
      description: `Se ha enviado una invitación a ${name}.`,
      duration: 3000,
    });
    setName('');
    setEmail('');
    setRelationship('');
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Seguro Compartido</h1>
        <p className="text-secondary">Añade miembros de tu familia o amigos a tu plan para obtener mejores beneficios y descuentos.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Miembros del Grupo Actual</h3>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Descuento Total</span>
                  <Badge className="bg-green-100 text-green-800">{totalDiscount}%</Badge>
                </div>
                <Progress value={Math.min(totalDiscount * 5, 100)} className="h-2 mb-4" />
                <p className="text-sm text-secondary mb-4">
                  Cuantos más miembros agregues a tu grupo, mayor será el descuento acumulado.
                </p>
                
                <div className="space-y-3 mt-4">
                  {members.map((member, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 border rounded-md hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${
                          member.name === "Tú" 
                            ? 'bg-primary text-white' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-secondary">{member.relationship}</p>
                        </div>
                      </div>
                      <Badge className={member.name === "You" ? 'bg-primary' : 'bg-secondary'}>
                        {member.discount}%
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    className="text-primary text-sm p-0 h-auto"
                  >
                    Ver historial de descuentos
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary">Añadir Nuevo Miembro</h3>
              
              <div className="p-4 border rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-name">Nombre Completo:</Label>
                    <Input 
                      id="member-name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ej. Juan Pérez"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email:</Label>
                    <Input 
                      id="member-email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ej. juan@ejemplo.com" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="member-relationship">Relación:</Label>
                    <Input 
                      id="member-relationship" 
                      placeholder="Ej. Cónyuge, Hijo/a, Amigo/a" 
                      value={relationship} 
                      onChange={(e) => setRelationship(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Enviar Invitación
                  </Button>
                </form>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>La persona invitada recibirá un 2% de descuento inicial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary mt-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Tú recibirás un 1% adicional por cada persona que se una</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default GroupBenefits;
