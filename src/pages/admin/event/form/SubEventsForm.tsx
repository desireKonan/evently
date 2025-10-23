import { useEventStore } from "@/stores/eventStore";
import SubEventsGenerator from "../components/SubEventsGenerator";
import type { EventFormData } from "@/app/schema/event.schema";
import type { UseFormReturn } from "react-hook-form";

interface SubEventsFormProps {
    form: UseFormReturn<EventFormData>;
    isReadOnly?: boolean;
}

const SubEventsForm: React.FC<SubEventsFormProps> = ({ form, isReadOnly = false }) => {
    const { setValue } = form;
    const { subEvents, setSubEvents } = useEventStore();

    const handleSubEventsChange = (events: string[]) => {
        if (isReadOnly) return;
        setValue('sub_events', events, { shouldValidate: true });
        setSubEvents(events);
    };
    
    return (
        <div className="space-y-6">
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