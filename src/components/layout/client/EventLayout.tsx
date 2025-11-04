import React from "react";
import Footer from "../../shared/Footer";
import { Header } from "../../shared/Header";
import { HeaderLayout } from "../layout/HeaderLayout";

interface LayoutProps {
  classname?: string;
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
}

const EventLayout: React.FC<LayoutProps> = ({
  children,
  classname = "min-h-screen bg-event-background text-event-foreground",
}: LayoutProps) => {
  return (
    <div
      className={classname}
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderLayout />
      {children}
      <footer></footer>
    </>
  );
};

export default EventLayout;
