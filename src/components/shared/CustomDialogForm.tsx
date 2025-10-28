import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type { PropsWithChildren } from "react";


interface CustomDialogFormProps {
    title: string;
    description: string;
    open: boolean;
    actionTitle?: string;
    cancelTitle?: string;
    variant?: 'default' | 'destructive' | 'warning';
    onClose: () => void;
    handleSubmit?: () => void;
}


export function CustomDialogForm({
    title,
    description,
    open,
    actionTitle = 'Creer',
    cancelTitle = 'Cancel',
    variant = 'default',
    onClose,
    handleSubmit,
    children,
}: PropsWithChildren<CustomDialogFormProps>) {

    const handleAction = (event: any) => {
        event.preventDefault();
        handleSubmit?.();
    }

    const getVariant = (variant: string) => {
        const VARIANTS: Record<string, string> = {
            'defaut': '',
            'destructive': 'bg-destructive text-destructive-foreground',
            'warning': 'bg-amber text-amber-foreground'
        }
        return VARIANTS[variant];
    }


    return (
        <Dialog open={open}>
            <DialogContent className="min-w-[800px] md:w-full overflow-y-auto">
                <form action={handleAction}>
                    <DialogHeader>
                        <DialogTitle> {title} </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                        {children}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={onClose}>
                                {cancelTitle}
                            </Button>
                        </DialogClose>
                        <Button type="submit" className={getVariant(variant)}>
                            {actionTitle}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}