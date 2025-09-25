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
    onAction?: () => void;
}


export function CustomDialogForm({
    title,
    description,
    open,
    actionTitle = 'Creer',
    cancelTitle = 'Cancel',
    variant = 'default',
    onClose,
    onAction,
    children,
}: PropsWithChildren<CustomDialogFormProps>) {

    const handleAction = () => {
        onAction?.();
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
            <DialogContent className="w-500 h-1/2 overflow-auto">
                <DialogHeader>
                    <DialogTitle> { title } </DialogTitle>
                    <DialogDescription>
                        { description }
                    </DialogDescription>
                </DialogHeader>
                { children }
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            { cancelTitle }
                        </Button>
                    </DialogClose>
                    <Button type="button" className={getVariant(variant)} onClick={handleAction}>
                        {actionTitle}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}