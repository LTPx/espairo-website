import { useTranslations } from "next-intl";

interface AuthorCardProps {
  authorName: string;
  description: string;
}

function AuthorCard(props: AuthorCardProps) {
  const { authorName, description } = props;

  return (
    <div className={"flex flex-col gap-[30px] lg:gap-[60px]"}>
      <div
        className="author-name font-regular lg:w-[550px]"
        dangerouslySetInnerHTML={{
          __html: authorName,
        }}
      />
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
