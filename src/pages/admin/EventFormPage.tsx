import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/layout/client/EventLayout';

const EventFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log('Données du formulaire:', formData);
    // Ici vous ajouteriez la logique pour envoyer les données à votre API
  };

  const handleCancel = () => {
    // Logique d'annulation
    console.log('Formulaire annulé');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-event-foreground sm:text-5xl">
              Créer un événement
            </h1>
            <p className="mt-3 text-lg text-event-muted-foreground">
              Remplissez les informations ci-dessous pour mettre votre événement en ligne.
            </p>
          </div>
          
          <Card className="p-6">
            <CardContent className="p-0">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="title">
                    Titre de l'événement
                  </label>
                  <div className="mt-2">
                    <Input
                      id="title"
                      name="title"
                      placeholder="ex: Conférence Tech 2024"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="description">
                    Description
                  </label>
                  <div className="mt-2">
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Décrivez votre événement en détail"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
                      Date
                    </label>
                    <div className="mt-2">
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
                      Heure
                    </label>
                    <div className="mt-2">
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="location">
                    Lieu
                  </label>
                  <div className="mt-2">
                    <Input
                      id="location"
                      name="location"
                      placeholder="ex: Centre des congrès, Ville"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="price">
                    Prix
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">€</span>
                    </div>
                    <Input
                      id="price"
                      name="price"
                      placeholder="25.00"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 bg-white py-3 pl-7 pr-4 text-event-foreground ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="image">
                    Image de couverture
                  </label>
                  <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10">
                    <div className="text-center">
                      <svg 
                        className="mx-auto h-12 w-12 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          className="relative cursor-pointer rounded-md font-semibold text-event-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-event-primary focus-within:ring-offset-2 focus-within:ring-offset-event-background hover:text-event-secondary"
                          htmlFor="image-upload"
                        >
                          <span>Téléchargez un fichier</span>
                          <Input 
                            className="sr-only" 
                            id="image-upload" 
                            name="image" 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">ou glissez-déposez</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                      {formData.image && (
                        <p className="mt-2 text-sm text-event-primary">
                          Fichier sélectionné: {formData.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="text-sm font-semibold leading-6 text-event-foreground hover:text-gray-600 transition-colors"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-full bg-event-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-event-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-event-primary transition-colors"
                  >
                    Créer l'événement
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EventFormPage;