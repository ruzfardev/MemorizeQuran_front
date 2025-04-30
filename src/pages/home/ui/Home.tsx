import {
  Box,
  Card,
  Flex,
  Image,
  Loader,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useUnit } from "effector-react";
import {
  $allIssues,
  $allSurahs,
  $currentUser,
  $isUserRegisterInProgress,
  $telegramId,
} from "@/shared/state";
import { Icon, StarBadge } from "@/shared/ui";
import { useEffect } from "react";
import { $isLoading, pageMounted } from "../model";
import heroImg from "../../../assets/image-2.png";
import qr from "../../../assets/qr.png";
import WebApp from "@twa-dev/sdk";
const Page = () => {
  const [
    user,
    telegramId,
    allIssues,
    allSurahs,
    isLoading,
    isUserRegisterInProgress,
  ] = useUnit([
    $currentUser,
    $telegramId,
    $allIssues,
    $allSurahs,
    $isLoading,
    $isUserRegisterInProgress,
  ]);

  const [mountPage] = useUnit([pageMounted]);

  useEffect(() => {
    if (user) {
      mountPage(user.userId);
    }
  }, [user]);

  if (isUserRegisterInProgress) {
    return (
      <Flex
        bg="var(--mantine-primary-color-light)"
        h="100vh"
        direction="column"
        justify="center"
        align="center"
      >
        <Loader />
      </Flex>
    );
  }

  if (!telegramId) {
    // Detect if user is on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Create appropriate link based on device
    const telegramLink = isMobile
      ? `tg://resolve?domain=Easy_Memorize_Quran_Bot&start=${telegramId || ""}`
      : `https://t.me/Easy_Memorize_Quran_Bot?start=${telegramId || ""}`;

    return (
      <Flex
        bg="var(--mantine-primary-color-light)"
        h="100vh"
        direction="column"
        justify="center"
        align="center"
      >
        <Image src={qr} w={200} />
        <Text ta="center" p={4}>
          You are not connected as a Telegram user.
          <br />
          Please open this bot in <a href={telegramLink}>Telegram</a>.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      h="calc(100vh - 70px)"
      style={{
        overflow: "hidden",
      }}
      direction="column"
    >
      <Box h="45vh" pos="relative" style={{ overflow: "hidden" }}>
        <Flex
          direction="column"
          p={24}
          pb={0}
          pos="absolute"
          w="100%"
          h="100%"
          style={{
            background:
              "linear-gradient(0deg, #F6FAFC 21.78%, rgba(246, 250, 252, 0.85) 38.81%, rgba(246, 250, 252, 0.00) 74.1%)",
          }}
        >
          <Flex direction="column" mt="auto">
            <Title order={2} mb={40}>
              Assalomu aleykum, <br /> {WebApp.initDataUnsafe?.user?.first_name}
            </Title>
            <Carousel
              slideSize="90%"
              align="start"
              slideGap="xs"
              loop
              dragFree
              withControls={false}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <Carousel.Slide key={i} w="100%">
                  <Card shadow="lg" withBorder p={10} h="100px">
                    <Flex direction="column">
                      <Title order={5}>Easy Memoize Quran</Title>
                      <Text c="dimmed" size="xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rem vitae reprehenderit placeat.
                      </Text>
                    </Flex>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
            <Flex h={90} gap={10} align="center" justify="space-evenly">
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <Icon name="alarm" color="#E7BFEE" />
                <Text c="dimmed" size="sm" fw={500}>
                  Reminder
                </Text>
              </Flex>
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <Icon name="message" color="#B7D5F3" />
                <Text c="dimmed" size="sm" fw={500}>
                  Q&A
                </Text>
              </Flex>
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <Icon name="book" color="#F3B9B9" />
                <Text c="dimmed" size="sm" fw={500}>
                  Zikr
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Image src={heroImg} />
      </Box>
      <Box p={20} py={0} h="45vh">
        <Title my={5} order={5}>
          All Tasks
        </Title>
        <ScrollArea type="never" h="calc(100% - 40px)">
          {isLoading ? (
            <Flex h="100%" justify="center" align="center">
              <Text>Loading...</Text>
            </Flex>
          ) : (
            <Flex p={10} px={4} direction="column" gap={10}>
              {allIssues.map((issue) => (
                <Card shadow="md" key={issue.id} p={10}>
                  <Flex align="center" justify="space-between">
                    <Flex gap={10} align="center">
                      <StarBadge
                        size={36}
                        number={allSurahs[issue.surahId - 1]?.id}
                      />
                      <Flex direction="column">
                        <Text>{allSurahs[issue.surahId - 1]?.name}</Text>
                        <Text c="dimmed" size="xs">
                          Repeat after 15 minutes
                        </Text>
                      </Flex>
                    </Flex>
                    {issue.from} - {issue.to}
                  </Flex>
                </Card>
              ))}
            </Flex>
          )}
        </ScrollArea>
      </Box>
    </Flex>
  );
};

export const Home = {
  route: "/",
  component: Page,
};
