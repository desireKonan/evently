import { Card, Heading, Text, Timeline, VStack } from "@chakra-ui/react";
import { FaFireFlameSimple } from "react-icons/fa6";
import { LiaUsersSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";

export const HomeSection = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <VStack>
            <Heading size="md" letterSpacing="tight">
              Notre mission
            </Heading>
            <Text fontSize="md" textAlign={"left"}>
              Connecter les gens à travers des expériences uniques
            </Text>
            <Text fontSize="md" color="fg.muted">
              Chakra UI is a simple, modular and accessible component library
              that gives you the building blocks you need.
            </Text>
          </VStack>
        </div>
        <div className="col-md-6">
          <Card.Root width="full" variant={"elevated"}>
            <Card.Body gap="2">
              <Text fontWeight={"600"} textAlign={"center"} fontSize={"md"}>
                Pourquoi choisir PMI Côte d'Ivoire Events ?
              </Text>
              <Timeline.Root maxW="400px">
                <Timeline.Item>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator>
                      <FaFireFlameSimple />
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title>Simplicité d'utilisation</Timeline.Title>
                    <Text textStyle="sm">
                      Une interface claire et épurée pour une navigation sans
                      effort.
                    </Text>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator>
                      <LiaUsersSolid />
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title textStyle="sm">
                      Communauté engagée
                    </Timeline.Title>
                    <Text textStyle="sm">
                      Rejoignez des milliers d'utilisateurs passionnés par les
                      événements.
                    </Text>
                  </Timeline.Content>
                </Timeline.Item>

                <Timeline.Item>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator>
                      <MdOutlinePayment />
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Timeline.Title textStyle="sm">
                      Transactions sécurisées
                    </Timeline.Title>
                    <Text textStyle="sm">
                      Achetez et vendez vos billets en toute confiance grâce à
                      nos systèmes de paiement fiables.
                    </Text>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline.Root>
            </Card.Body>
          </Card.Root>
        </div>
      </div>
    </div>
  );
};
