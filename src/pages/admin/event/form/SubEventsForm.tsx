import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import SubEventsGenerator from "../components/SubEventsGenerator";
import { useSubEvents, type SubEvent } from "@/hooks/use-sub-events";

const SubEventsForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: null as File | null
    });
    const { setSubEvents } = useSubEvents();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

     const handleSubEventsChange = (events: SubEvent[]) => {
        setSubEvents(events);
        console.log('Sous-événements mis à jour:', events);
    };

    const handleCancel = () => {
        // Logique d'annulation
        console.log('Formulaire annulé');
    };



    return (
        <div className="space-y-6">
            {/* Gestion des sous-événements */}
            <div className="mb-8">
                <SubEventsGenerator
                    onSubEventsChange={handleSubEventsChange}
                    eventDate={new Date().toDateString()}
                />
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
        </div>
    );
};


export default SubEventsForm;