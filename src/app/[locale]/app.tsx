import { getWordPressPage } from "../_services/api";
import AnimatePages from "../components/animate-pages";
import LayoutPages from "../components/animate-pages";
import Navbar from "../components/navbar";
import NavbarSecond from "../components/navbar-second";
import ScrollPages from "../components/ScrollPages";

interface Props {
  children: any;
  locale: "en" | "es" | "de";
}

async function App(props: Props) {
  const { children, locale } = props;
  return (
    <NavbarSecond>
      {children}
    </NavbarSecond>
  )
  
}

export default App;
