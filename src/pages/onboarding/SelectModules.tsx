
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, DollarSign, Baby, Cat, Plane, Send, CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';

interface InsuranceModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cost: string;
  recommended: boolean;
}

const SelectModules: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>(["health", "income", "pets"]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const modules: InsuranceModule[] = [
    {
      id: "health",
      title: "Salud",
      description: "Cobertura para tu bienestar físico y mental.",
      icon: <Heart className="text-health" size={42} />,
      cost: (80000).toLocaleString('es-CO'),
      recommended: true
    },
    {
      id: "income",
      title: "Protección de Ingresos",
      description: "Protege tus ganancias en caso de imposibilidad para trabajar.",
      icon: <DollarSign className="text-income" size={42} />,
      cost: (120000).toLocaleString('es-CO'),
      recommended: true
    },
    {
      id: "children",
      title: "Familia",
      description: "Asegura el futuro de tus hijos.",
      icon: <Baby className="text-children" size={42} />,
      cost: (300000).toLocaleString('es-CO'),
      recommended: false
    },
    {
      id: "pets",
      title: "Mascotas",
      description: "Cuidado para tus amigos peludos.",
      icon: <Cat className="text-pets" size={42} />,
      cost: (50000).toLocaleString('es-CO'),
      recommended: true
    },
    {
      id: "travel",
      title: "Viajes",
      description: "Cobertura para imprevistos durante tus viajes.",
      icon: <Plane className="text-blue-500" size={42} />,
      cost: (200000).toLocaleString('es-CO'),
      recommended: false
    }
  ];

  const totalCost = modules
    .filter(module => selectedModules.includes(module.id))
    .reduce((sum, module) => sum + parseInt(module.cost.replace(/\./g, ""), 10), 0);

  const fullCost = modules.reduce((sum, module) => sum + parseInt(module.cost.replace(/\./g, ""), 10), 0);

  const handleToggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Pregunta vacía",
        description: "Por favor, escribe una pregunta para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsAskingQuestion(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsAskingQuestion(false);
      let response = "";
      
      if (question.toLowerCase().includes("choque") || question.toLowerCase().includes("carro")) {
        response = "Con tu configuración actual de módulos, la cobertura para accidentes de tránsito estaría incluida en el módulo de Salud para tus gastos médicos, y en el módulo de Protección de Ingresos si necesitas tiempo de recuperación. Sin embargo, para la cobertura del vehículo en sí, necesitarías agregar el módulo específico de Automóvil que no está entre tus selecciones actuales.";
      } else {
        response = "Basado en los módulos que has seleccionado (Salud, Protección de Ingresos y Mascotas), tendrás cobertura para gastos médicos personales, compensación por pérdida de ingresos debido a enfermedad o accidente, y atención veterinaria para tus mascotas. Para preguntas más específicas, por favor contáctanos directamente.";
      }
      
      setAnswer(response);
    }, 1500);
  };

  const handleConfirm = () => {
    if (selectedModules.length === 0) {
      toast({
        title: "Selección requerida",
        description: "Por favor, selecciona al menos un módulo para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    // Save selected modules to local storage
    localStorage.setItem('kuid_selected_modules', JSON.stringify(selectedModules));
    
    navigate('/onboarding/connect-devices');
  };

  return (
    <div className="min-h-screen bg-very-light-alt py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Selecciona tus módulos de protección</h1>
          <p className="text-secondary text-lg">
            Basado en tus necesidades, hemos recomendado los siguientes módulos. Puedes ajustar según tus preferencias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className={`transition-all hover:transform hover:-translate-y-1 ${
                selectedModules.includes(module.id) ? 'border-2 border-primary bg-primary/5' : 'border-2 border-transparent'
              }`}
            >
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="relative mb-4">
                  {module.recommended && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                  <div className="text-4xl">{module.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark">{module.title}</h3>
                <p className="text-sm text-secondary mb-4 flex-grow">{module.description}</p>
                <div className="mt-auto w-full">
                  <p className="font-semibold mb-3">${module.cost}/mes</p>
                  <Button 
                    type="button"
                    variant={selectedModules.includes(module.id) ? "outline" : "default"}
                    className={`w-full ${selectedModules.includes(module.id) ? 'border-primary text-primary hover:bg-primary/10' : ''}`}
                    onClick={() => handleToggleModule(module.id)}
                  >
                    {selectedModules.includes(module.id) ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Seleccionado
                      </>
                    ) : (
                      'Seleccionar'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Costo mensual total: ${totalCost}</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min((totalCost / fullCost) * 100, 100)}%` }}></div>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">¿Tienes preguntas sobre tu cobertura?</h2>
            
            <Textarea 
              placeholder="Ejemplo: ¿Esta configuración me cubriría en caso de un choque con mi carro?" 
              className="mb-4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            
            <div className="flex justify-end mb-4">
              <Button 
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleAskQuestion}
                disabled={isAskingQuestion}
              >
                {isAskingQuestion ? "Procesando..." : "Preguntar"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {answer && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium mb-2">Respuesta:</p>
                <p className="text-secondary">{answer}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            type="button"
            size="lg"
            onClick={handleConfirm}
            className="px-8"
          >
            Confirmar selección
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectModules;
