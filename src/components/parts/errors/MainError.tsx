export interface MainErrorProps {
  message: string;
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
}

export default function MainError({
  Icon,
  message,
}: MainErrorProps): JSX.Element {
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/70">
        <Icon className="h-12 w-12" />
      </div>
      <span className="text-slate-400">{message}</span>
    </div>
  );
}
