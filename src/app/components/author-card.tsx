import { useTranslations } from "next-intl";

interface AuthorCardProps {
  authorName: string;
  description: string;
}

function AuthorCard(props: AuthorCardProps) {
  const { authorName, description } = props;

  return (
    <div className={"flex flex-col gap-[50px]"}>
      <h2 className="tracking-[-0.05em] text-[40px] font-regular leading-[43px]">{authorName}</h2>
      <div
        className="font-regular w-[550px]"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  );
}

export default AuthorCard;
