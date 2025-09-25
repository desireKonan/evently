import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";


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
    onAction
}: CustomDialogFormProps) {

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
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}> {cancelTitle} </AlertDialogCancel>
                    <AlertDialogAction className={getVariant(variant)} onClick={handleAction}> {actionTitle} </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}