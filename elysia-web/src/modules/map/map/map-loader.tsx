export const MapLoader = () => {
  return (
    <div className="absolute size-screen inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    </div>
  );
};
