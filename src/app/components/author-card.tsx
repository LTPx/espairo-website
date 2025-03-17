import { useTranslations } from "next-intl";

interface AuthorCardProps {
  authorName: string;
  description: string;
}

function AuthorCard(props: AuthorCardProps) {
  const { authorName, description } = props;

  return (
    <div className={"flex flex-col gap-[30px] lg:gap-[50px] px-[30px] lg:px-[30px]"}>
      <h2 className="tracking-[-0.05em] text-[40px] font-regular leading-[43px]">{authorName}</h2>
      <div
        className="font-regular lg:w-[550px]"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  );
}

export default AuthorCard;
