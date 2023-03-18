import TypographyH4 from "../ui/typography/h4";

export interface ReducedCardProps {
  name: string;
  url: string;
  image: string;
}

export default function ReducedCard({
  name,
  url,
  image,
}: ReducedCardProps): JSX.Element {
  return (
    <div className="max-h-40 max-w-[13em] rounded-md bg-slate-200 duration-100 hover:ring-4 dark:bg-slate-800">
      <div
        className="h-[80px] rounded-t-md bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="p-2">
        <TypographyH4 className="truncate">{name}</TypographyH4>
      </div>
    </div>
  );
}
