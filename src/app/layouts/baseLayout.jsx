import { Layout } from "shared/ui";
import { Footer } from "widgets/Footer";
import { Header } from "widgets/Header";
import { SubHeader } from "widgets/SubHeader";

export const baseLayout = (
  <Layout
    subheaderSlot={<SubHeader/>}
    headerSlot={<Header/>}
    footerSlot={<Footer/>}
  />
)