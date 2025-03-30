
interface Props {
  children: any;
  locale: "en" | "es" | "de";
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    <div className="lg:hidden bg-body">{children}</div>
  );
}

export default App;
