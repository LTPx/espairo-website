import AnimatePages from "../components/animate-pages";

interface Props {
  children: any;
  locale: "en" | "es" | "de";
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    <AnimatePages>
        <div className="bg-body">{children}</div>
    </AnimatePages>
  );
}

export default App;
