
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      quote: 'My flight got cancelled last minute due to weather. KÜID detected my location change from my connected calendar and alerted me about potential travel disruptions covered under my plan. The reimbursement process for the hotel was surprisingly simple!',
      author: 'Sarah K.',
      tags: ['Income Protection', 'App Integration']
    },
    {
      title: 'Swift Support for a Furry Friend',
      quote: 'Our dog suddenly fell ill. KÜID\'s Pet coverage was active, and the claim was processed quickly after the vet visit. Knowing that part of the bill was covered reduced so much stress during a difficult time.',
      author: 'Mark T.',
      tags: ['Pet Coverage']
    },
    {
      title: 'Proactive Health Alert',
      quote: 'My smartwatch data, connected via KÜID, showed an unusual heart rate pattern. The platform sent me a notification suggesting I consult a doctor. It turned out to be a minor issue, but the early warning was incredibly reassuring.',
      author: 'Elena R.',
      tags: ['Health Coverage', 'Wearable Integration']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container">
          <Link to="/" className="text-primary hover:text-primary-hover flex items-center gap-2 mb-6">
            <ArrowLeft size={16} />
            <span>Volver al Dashboard</span>
          </Link>
          
          <section id="stories-content" className="bg-very-light-alt p-8 rounded-lg shadow-kuid">
            <div className="text-center mb-8">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-2">Historias Reales, Protección Real</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre cómo la protección adaptativa de KÜID ha ayudado a los miembros en situaciones de la vida real.
              </p>
            </div>
            
            <div className="space-y-6 mt-10">
              {stories.map((story, index) => (
                <Card key={index} className="text-left">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">{story.title}</h3>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-secondary my-4">
                      "{story.quote}"
                    </blockquote>
                    <p className="font-bold">- {story.author}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {story.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-very-light-alt text-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RealStories;
