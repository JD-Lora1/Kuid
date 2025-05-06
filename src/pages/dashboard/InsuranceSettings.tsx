
import React, { useState } from 'react';
import { Heart, DollarSign, Baby, Cat, Plane, Send } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';

interface InsuranceModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cost: string;
}

const InsuranceSettings: React.FC = () => {
  // Get the selected modules from local storage
  const savedModules = localStorage.getItem('kuid_selected_modules');
  const initialSelectedModules = savedModules ? JSON.parse(savedModules) : ["health", "income"];

  const [chatbotMessages, setChatbotMessages] = useState([
    {
      role: 'system',
      content: 'Eres un asistente virtual de una aplicación llamada KÜID. Estás preparado para responder preguntas acerca de la cobertura de un plan de seguros ante situaciones que el cliente plantee. Debes ser muy cordial.',
    },
  ]);
  
  const [selectedModules, setSelectedModules] = useState<string[]>(initialSelectedModules);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const modules: InsuranceModule[] = [
    {
      id: "health",
      title: "Salud",
      description: "Cobertura para tu bienestar físico y mental.",
      icon: <Heart className="text-health" size={42} />,
      cost: (50000).toLocaleString('es-CO'),
    },
    {
      id: "income",
      title: "Protección de Ingresos",
      description: "Protege tus ganancias en caso de imposibilidad para trabajar.",
      icon: <DollarSign className="text-income" size={42} />,
      cost: (40000).toLocaleString('es-CO'),
    },
    {
      id: "children",
      title: "Familia",
      description: "Asegura el futuro de tus hijos.",
      icon: <Baby className="text-children" size={42} />,
      cost: (30000).toLocaleString('es-CO'),
    },
    {
      id: "pets",
      title: "Mascotas",
      description: "Cuidado para tus amigos peludos.",
      icon: <Cat className="text-pets" size={42} />,
      cost: (20000).toLocaleString('es-CO'),
    },
    {
      id: "travel",
      title: "Viajes",
      description: "Cobertura para imprevistos durante tus viajes.",
      icon: <Plane className="text-blue-500" size={42} />,
      cost: (15000).toLocaleString('es-CO'),
    }
  ];

  const totalCost = modules
    .filter(module => selectedModules.includes(module.id))
    .reduce((sum, module) => sum + parseInt(module.cost.replace(/\./g, ""), 10), 0);

  const handleToggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Pregunta vacía",
        description: "Por favor, escribe una pregunta para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsAskingQuestion(true);
    
    const response = await fetch(
      `https://kuid-back-production.up.railway.app/api/chat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: question,
          messages: chatbotMessages,
        }),
      }
    );

    setTimeout(() => {
      setIsAskingQuestion(false);
      let response = "";
      
      if (question.toLowerCase().includes("choque") || question.toLowerCase().includes("carro")) {
        response = "Con tu configuración actual de módulos, la cobertura para accidentes de tránsito estaría incluida en el módulo de Salud para tus gastos médicos, y en el módulo de Protección de Ingresos si necesitas tiempo de recuperación. Sin embargo, para la cobertura del vehículo en sí, necesitarías agregar el módulo específico de Automóvil que no está entre tus selecciones actuales.";
      } else {
        response = "Basado en los módulos que has seleccionado, tendrás cobertura para los casos que mencionas. Recuerda que siempre puedes ajustar tu cobertura según cambien tus necesidades. Si tienes preguntas específicas sobre alguna situación particular, el equipo de atención al cliente estará encantado de ayudarte.";
      }
      
      setAnswer(response);
    }, 1500);
  };

  const handleSaveChanges = () => {
    if (selectedModules.length === 0) {
      toast({
        title: "Selección requerida",
        description: "Por favor, selecciona al menos un módulo para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate saving changes
    setTimeout(() => {
      setIsSaving(false);
      // Save selected modules to local storage
      localStorage.setItem('kuid_selected_modules', JSON.stringify(selectedModules));
      
      toast({
        title: "Cambios guardados",
        description: "Tu cobertura de seguro ha sido actualizada exitosamente.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Configuración de Seguro</h1>
        <p className="text-secondary">Personaliza tu cobertura según tus necesidades actuales.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Módulos de protección</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className={`border rounded-lg p-4 transition-all hover:shadow-sm cursor-pointer ${
                    selectedModules.includes(module.id) ? 'border-primary bg-primary/5' : 'border-gray-100'
                  }`}
                  onClick={() => handleToggleModule(module.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3">{module.icon}</div>
                    <h3 className="font-medium mb-2">{module.title}</h3>
                    <p className="text-sm text-secondary mb-3">{module.description}</p>
                    <p className="font-semibold">${module.cost}/mes</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Costo mensual total:</span>
                <span className="font-bold text-primary">${totalCost.toLocaleString('es-CO')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min((totalCost / 150000) * 100, 100)}%` }}></div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? 'Guardando cambios...' : 'Guardar cambios'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preguntas sobre tu cobertura</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary mb-4">
              ¿Tienes dudas sobre tu cobertura actual? Pregunta aquí y te responderemos.
            </p>
            
            <Textarea 
              placeholder="Ejemplo: ¿Esta configuración me cubriría en caso de un choque con mi carro?" 
              className="mb-4 min-h-[100px]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            
            <div className="flex justify-end mb-4">
              <Button 
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
      </div>
    </DashboardLayout>
  );
};

export default InsuranceSettings;
