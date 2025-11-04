import { BaseLayout } from "@/components/layout/client/EventLayout";
import { HomeSection } from "@/components/ui/home/home-section";
import { Box, Button } from "@chakra-ui/react";
import slide from "src/assets/slide.jpg";

const LandingPage = () => {
  return (
    <BaseLayout>
      <main className="main">
        <section
          className="slider"
          style={{
            backgroundImage: `url(${slide})`,
            height: "500px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-slide">
            Votre billet pour des expériences inoubliables.
            <br />
            Rejoignez notre communauté et trouvez les événements qui vous font
            vibrer.
          </div>
          <Button variant={"solid"} size={"xl"} className="btn-slider">
            Créer votre compte
          </Button>
        </section>
        <Box mb={8} mt={8}>
          <HomeSection />
        </Box>
      </main>
    </BaseLayout>
  );
};

export default LandingPage;
