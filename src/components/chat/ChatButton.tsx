import React, { useState } from 'react';
import { Button } from '../ui/button';
import { MessageCircle, X, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const [chatbotMessages, setChatbotMessages] = useState([
    {
      role: 'system',
      content: 'Eres un asistente virtual de una aplicación llamada KÜID. Estás preparado para responder preguntas acerca del funcionamiento de la aplicación. Debes ser muy cordial.',
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Hola, soy el asistente virtual de KÜID. ¿En qué puedo ayudarte hoy?',
      isUser: false
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: message,
      isUser: true
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    const response = await fetch(`http://localhost:8000/api/chat/ask-rag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: newUserMessage.content,
        messages: chatbotMessages,
      }),
    });

    if (!response.ok) {
      throw new Error('Error desconocido en el login');
    }

    const data = await response.json();

    const assistantResponse = data.answer || "Lo siento, no tengo una respuesta para eso.";
    const newMessages = data.messages;

    const assistantMessage: Message = {
      id: messages.length + 2,
      content: assistantResponse,
      isUser: false
    };

    setMessages(prev => [...prev, assistantMessage]);
    setChatbotMessages(newMessages);
  };

  const redirectToWhatsApp = () => {
    // WhatsApp business number - replace with your actual number
    const phoneNumber = "3127489843";
    const message = "Hola, necesito ayuda con mi cuenta KÜID.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl z-50"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 bg-white/85" align="end" side="top">
          <div className="grid gap-1">
            <Button 
              variant="ghost" 
              className="justify-start px-3 py-2 gap-2"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-4 w-4" />
              Chat con asistente
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start px-3 py-2 gap-2"
              onClick={redirectToWhatsApp}
            >
              <User className="h-4 w-4" />
              Hablar con un humano
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Asistente KÜID</DialogTitle>
            <DialogDescription>
              Pregúntame cualquier cosa sobre la aplicación
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4">
              {messages.map((msg) => (
                <Card 
                  key={msg.id} 
                  className={`p-3 max-w-[85%] ${
                    msg.isUser 
                      ? 'ml-auto bg-primary text-primary-foreground' 
                      : 'mr-auto bg-secondary/10'
                  }`}
                >
                  {msg.content}
                </Card>
              ))}
            </div>
            
            <Separator className="my-2" />
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu pregunta aquí"
                className="flex-1 min-h-[60px] max-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button type="submit" className="self-end">Enviar</Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                size="sm"
                className="text-primary"
                onClick={redirectToWhatsApp}
              >
                Hablar con un humano en WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatButton;