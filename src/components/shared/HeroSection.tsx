import { LandingButton } from "./LandingButton";
import hero from '../../assets/hero.jpg';

export const HeroSection = () => {
  // const backgroundImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuALR7JIBYCjh4pSajCvOg1hbWhwzRdyDgWTuEvMoQg_7uuc_Mh7vc93ib0d27Lf-lKVeW5j-zJmYvyQdcDiBa-dptaGzWJiPb4TsZjUyGmeKmAUrRe7V3v705Fbg5boBSbup6TkgRDPcAfRrftdm8KALH33YDLIiXhzZYIb24jLjuSKCRCzgyW6QH_cVw2IU02NzaMYvFvVx3WscwcbNPeepT99Z01o8wqV2AJGLCM-a_ljPihDd2Es2m8qyiiAPF2Eez0egmya9Fw";

  return (
    <section className="w-full">
      <div
        className="relative flex flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-6 pb-10 text-center shadow-lg overflow-hidden text-center"
      >
        {/* Image de fond avec flou */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("${hero}")`,
            filter: 'blur(4px) brightness(0.7)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col gap-4 items-center">
          <p className="text-gray-200 text-base font-normal leading-relaxed sm:text-lg max-w-2xl">
            Votre billet pour des expériences inoubliables. Rejoignez notre communauté et
            trouvez les événements qui vous font vibrer.
          </p>
        </div>

        {/* Boutons CTA */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
          <LandingButton
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Découvrir les événements
          </LandingButton>

          <LandingButton
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Créer un compte
          </LandingButton>
        </div>
      </div>
    </section>
  );
};