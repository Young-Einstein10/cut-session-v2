import { Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <section>
      <Heading as="h1" size="2xl">
        Hello World
      </Heading>
    </section>
  );
};

Home.isAuthPage = false;

export default Home;
