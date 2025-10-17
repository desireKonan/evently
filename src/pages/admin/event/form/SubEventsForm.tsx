import { useSubEventsStore } from "@/stores/subEventStore";
import SubEventsGenerator from "../components/SubEventsGenerator";
import type { EventFormData } from "@/app/schema/event.schema";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

interface SubEventsFormProps {
    form: UseFormReturn<EventFormData>;
}

const SubEventsForm: React.FC<SubEventsFormProps> = ({ form }) => {
    const { setValue, getValues } = form;
    const { subEvents, setSubEvents } = useSubEventsStore();

    const handleSubEventsChange = (events: string[]) => {
        setValue('sub_events', events, { shouldValidate: true });
    };

    // Initialiser avec les valeurs existantes du formulaire
    useEffect(() => {
        const existingSubEvents = getValues('sub_events');
        if (existingSubEvents && Array.isArray(existingSubEvents)) {
            setSubEvents(existingSubEvents);
        }
    }, []);

    return (
        <div className="space-y-6">
            {/* Gestion des sous-événements */}
            <div className="mb-8">
                <SubEventsGenerator
                    onSubEventsChange={handleSubEventsChange}
                    initialSubEvents={subEvents}
                />
            </div>
        </div>
    );
};


export default SubEventsForm;