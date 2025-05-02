
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mic, Send } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '../../components/ui/card';

const ConfigureInsurance: React.FC = () => {
  const [concerns, setConcerns] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Grabación iniciada",
      description: "Cuéntanos tus preocupaciones y en qué casos te gustaría estar cubierto.",
    });

    // Simulate a recording session
    setTimeout(() => {
      setIsRecording(false);
      setConcerns("Me preocupa no poder trabajar si tengo un accidente. También tengo mascotas y me gustaría que estuvieran cubiertas. Viajo bastante por trabajo y me preocupan los imprevistos durante mis viajes.");
      toast({
        title: "Grabación finalizada",
        description: "Hemos capturado tus preocupaciones.",
      });
    }, 3000);
  };

  const handleSubmit = () => {
    if (!concerns.trim()) {
      toast({
        title: "Información requerida",
        description: "Por favor, cuéntanos tus preocupaciones para poder recomendarte una cobertura adecuada.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing with AI
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/onboarding/select-modules');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-very-light-alt pt-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-primary rounded-full mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Configura tu seguro personalizado</h1>
          <p className="text-secondary text-lg">
            Cuéntanos sobre tus preocupaciones y necesidades para recomendarte la mejor cobertura.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <label className="block text-lg font-semibold mb-2">
              Cuéntanos, ¿qué te preocupa y en qué casos te gustaría estar cubierto?
            </label>
            <Textarea 
              placeholder="Ejemplos: Me preocupa no poder trabajar si tengo un accidente. Tengo mascotas que quisiera asegurar. Viajo con frecuencia y necesito cobertura para imprevistos..." 
              className="min-h-[150px] mb-4"
              value={concerns}
              onChange={(e) => setConcerns(e.target.value)}
            />
            
            <div className="flex items-center justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleStartRecording}
                disabled={isRecording}
              >
                <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500' : ''}`} />
                {isRecording ? "Grabando..." : "Grabar voz"}
              </Button>
              
              <Button 
                type="button"
                className="flex items-center gap-2"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? "Analizando..." : "Continuar"}
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-secondary">
          Esta información nos ayudará a ofrecerte un seguro personalizado que se adapte a tus necesidades específicas.
        </p>
      </div>
    </div>
  );
};

export default ConfigureInsurance;
