interface LoadingPageProps {
    label: string
}


export const LoadingPage = ({ label }: LoadingPageProps) => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--secondary-color)]"></div>
        <span className="ml-2"> { label } </span>
    </div>
);