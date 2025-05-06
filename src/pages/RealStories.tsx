import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface Story {
  title: string;
  quote: string;
  author: string;
  tags: string[];
}

const RealStories: React.FC = () => {
  const stories: Story[] = [
    {
      title: 'Peace of Mind During an Unexpected Trip',
      quote: 'Mi vuelo fue cancelado debido al clima. KÜID detectó el cambio de ubicación desde mi calendario conectado y me alertó sobre posibles interrupciones de viaje cubiertas por mi plan. ¡El proceso de reembolso para el hotel fue sorprendentemente simple!',
      author: 'Sarah K.',
      tags: ['Protección de Ingresos', 'App Integration']
    },
    {
      title: 'Swift Support for a Furry Friend',
      quote: "Nuestro perro se enfermó repentinamente. La cobertura para mascotas de KÜID estaba activa, y la reclamación se procesó rápidamente después de la visita al veterinario. Saber que parte de la factura estaba cubierta redujo mucho el estrés durante un momento difícil.",
      author: 'Mark T.',
      tags: ['Mascotas']
    },
    {
      title: 'Proactive Health Alert',
      quote: "Los datos de mi smartwatch, conectados a través de KÜID, mostraron un patrón inusual de frecuencia cardíaca. La plataforma me envió una notificación sugiriendo que consultara a un médico. Resultó ser un problema menor, pero la advertencia temprana fue increíblemente tranquilizadora.",
      author: 'Elena R.',
      tags: ['Salud', 'Wearable Integration']
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Historias Reales</h1>
        <p className="text-secondary">Descubre cómo la protección adaptativa de KÜID ha ayudado a los miembros en situaciones de la vida real.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="space-y-6">
            {stories.map((story, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg hover:shadow-sm transition-all"
              >
                <h3 className="text-lg font-medium text-primary mb-2">{story.title}</h3>
                <blockquote className="border-l-4 border-primary/30 pl-4 italic text-secondary my-4">
                  "{story.quote}"
                </blockquote>
                <p className="font-medium">- {story.author}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {story.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default RealStories;