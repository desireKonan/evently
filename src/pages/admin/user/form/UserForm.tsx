import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { UserFormData } from "@/app/schema/user.schema";


interface UserFormProps {
    formReturn: UseFormReturn<UserFormData>;
}

export const UserForm = ({ formReturn }: UserFormProps) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="title">
                        Nom
                    </label>
                    <div className="mt-2">
                        <Input
                            id="firstname"
                            placeholder="ex: Harvey Konan"
                            {...formReturn.register('firstname')}
                            className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
                        Prenoms
                    </label>
                    <div className="mt-2">
                        <Input
                            id="lastname"
                            {...formReturn.register('lastname')}
                            className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                            required
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
                    Numero de telephone
                </label>
                <div className="mt-2">
                    <Input
                        id="phone-number"
                        {...formReturn.register('phoneNumber')}
                        className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
                    Email
                </label>
                <div className="mt-2">
                    <Input
                        id="email"
                        type="email"
                        {...formReturn.register('email')}
                        className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                        required
                    />
                </div>
            </div>
        </div>
    );
}