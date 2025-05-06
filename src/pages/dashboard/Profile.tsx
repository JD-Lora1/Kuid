
import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    cellphone: user?.cellphone || 'Sin número',
    address: user?.address || 'Sin dirección',
    birth_date: user?.birth_date || 'Sin fecha',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await fetch(
      `http://localhost:8000/api/users/email/${user?.email}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );

    if (!response.ok) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la información. Intenta nuevamente.",
        variant: 'destructive',
      });
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      cellphone: formData.cellphone,
      address: formData.address,
      birth_date: formData.birth_date,
    };

    localStorage.setItem('kuid_user', JSON.stringify(updatedUser));

    setIsSaving(true);
    
    setIsSaving(false);
    setIsEditing(false);
    
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada exitosamente.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-secondary">Administra tu información personal y preferencias.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Información Personal</span>
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium mb-1">Apellido</label>
                <Input 
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              
              <div>
                <label htmlFor="cellphone" className="block text-sm font-medium mb-1">Teléfono</label>
                <Input 
                  id="cellphone"
                  name="cellphone"
                  value={formData.cellphone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Dirección</label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              
              <div>
                <label htmlFor="birth_date" className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
                <Input 
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-3">
                Cambiar contraseña
              </Button>
              <Button variant="outline" className="w-full">
                Configurar autenticación de dos factores
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="text-sm">Notificaciones por email</label>
                  <input type="checkbox" id="notifications" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="marketing" className="text-sm">Comunicaciones de marketing</label>
                  <input type="checkbox" id="marketing" className="toggle" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
