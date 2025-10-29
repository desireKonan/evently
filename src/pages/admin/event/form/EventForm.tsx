import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CategoricalPricing from "../components/CategorialPricing";
import { type UseFormReturn } from "react-hook-form";
import { eventTypeOptions, type EventFormData } from "@/app/schema/event.schema";
import { useEventStore } from "@/stores/eventStore";
import { DateTimePicker } from "@/components/shared/DatetimePicker";
import type { EventFormPageMode } from "../EventFormPage";

interface EventFormProps {
    form: UseFormReturn<EventFormData>;
    mode: EventFormPageMode;
}


const EventForm: React.FC<EventFormProps> = ({ form, mode }) => {
    const { register, formState: { errors }, setValue, watch, getValues } = form;
    const { currentEvent } = useEventStore();
    const isReadOnly = mode === 'view';
    const isEditable = mode === 'edit';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isReadOnly) return;
        const file = e.target.files?.[0] || null;
        const files = [];
        files.push(file ?? new File([], ''));
        setValue('images', files, { shouldValidate: true });
    };

    const handleCategoriesChange = (categories: any[]) => {
        if (isReadOnly) return;
        setValue('ticket_prices', categories, { shouldValidate: true });
    };

    const imageFile = watch('images');
    const type = watch('type');

    // Récupérer les catégories initiales depuis le store ou le formulaire
    const getInitialCategories = () => {
        // Priorité au store
        if (currentEvent?.ticket_prices) {
            return currentEvent.ticket_prices;
        }
        // Fallback au formulaire
        const formCategories = watch('ticket_prices');
        return formCategories || [];
    };

    const handleStartDateChange = (date: Date | undefined) => {
        if (isReadOnly) return;
        setValue('start_date', date ?? new Date(), { shouldValidate: true });
    };

    const handleEndDateChange = (date: Date | undefined) => {
        if (isReadOnly) return;
        setValue('end_date', date ?? new Date(), { shouldValidate: true });
    };


    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="title">
                    Titre de l'événement
                </label>
                <div className="mt-2">
                    <Input
                        {...register('name')}
                        id="name"
                        placeholder="ex: Conférence Tech 2024"
                        className={
                            `block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 ${errors.name ? 'ring-red-500' : 'ring-gray-300'
                            } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`
                        }
                        required
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="description">
                    Description
                </label>
                <div className="mt-2">
                    <Textarea
                        {...register('description')}
                        id="description"
                        placeholder="Décrivez votre événement en détail"
                        rows={4}
                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 ${errors.description ? 'ring-red-500' : 'ring-gray-300'
                            } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
                    Nombre de place
                </label>
                <div className="mt-2">
                    <Input
                        id="limit"
                        {...register('limit')}
                        type="number"
                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 ${errors.limit ? 'ring-red-500' : 'ring-gray-300'
                            } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {errors.limit && (
                        <p className="mt-1 text-sm text-red-600">{errors.limit.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
                    Addresse
                </label>
                <div className="mt-2">
                    <Input
                        id="limit"
                        {...register('address')}
                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 ${errors.address ? 'ring-red-500' : 'ring-gray-300'
                            } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
                    Lieu
                </label>
                <div className="mt-2">
                    <Input
                        id="limit"
                        {...register('place')}
                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 ${errors.place ? 'ring-red-500' : 'ring-gray-300'
                            } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isReadOnly}
                        readOnly={isReadOnly}
                    />
                    {errors.place && (
                        <p className="mt-1 text-sm text-red-600">{errors.place.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="eventType">
                    Type d'événement
                </label>
                <div className="mt-2">
                    <select
                        {...register('type')}
                        id="eventType"
                        defaultValue={type}
                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6 
                            ${errors.type ? 'ring-red-500' : 'ring-gray-300'}`
                        }
                        disabled={isReadOnly}
                    >
                        {eventTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
                        Date de début
                    </label>
                    <div className="mt-2">
                        <DateTimePicker
                            date={getValues('start_date')}
                            setDate={handleStartDateChange}
                            disabled={isReadOnly}
                        />
                    </div>
                    {errors.start_date && (
                        <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
                        Date de fin
                    </label>
                    <div className="mt-2">
                        <DateTimePicker
                            date={getValues('end_date')}
                            setDate={handleEndDateChange}
                            disabled={isReadOnly}
                        />
                        {errors.end_date && (
                            <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <CategoricalPricing
                    onCategoriesChange={handleCategoriesChange}
                    initialCategories={getInitialCategories()}
                    isDisabled={isReadOnly}
                />
                {errors.ticket_prices && (
                    <p className="mt-1 text-sm text-red-600">{errors.ticket_prices.message}</p>
                )}
            </div>

            {
                !isReadOnly && (
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
                                {imageFile && imageFile.length !== 0 && (
                                    <p className="mt-2 text-sm text-event-primary">
                                        Fichier sélectionné: {imageFile[0].name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }


            {
               (isReadOnly || isEditable) && imageFile && imageFile.length > 0 && imageFile[0].name && (
                    <div>
                        <label className="block text-sm font-medium leading-6 text-event-foreground">
                            Image de couverture
                        </label>
                        <div className="mt-2">
                            <img src={ imageFile[0].name } />
                        </div>
                    </div>
                )
            }
        </div>
    );
};


export default EventForm;