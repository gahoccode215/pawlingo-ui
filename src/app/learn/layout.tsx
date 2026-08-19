import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LearnLayout(props: LayoutProps<"/learn">) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
