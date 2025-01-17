interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-muted-foreground">{message}</div>
    </div>
  );
}