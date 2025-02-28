import { getWordPressPage } from "../_services/api";
import ScrollPages from "../components/ScrollPages";

interface Props {
  children: any;
  locale: 'en' | 'es' | 'de';
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    // <ScrollPages>
      <div className="bg-body">{children}</div>
    // </ScrollPages>
  );
}

export default App;
