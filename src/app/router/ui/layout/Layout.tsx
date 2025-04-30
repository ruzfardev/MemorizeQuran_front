import { $telegramId } from "@/shared/state";
import { Icon } from "@/shared/ui";
import { AppShell, Button, Flex, LoadingOverlay, rem } from "@mantine/core";
import { useUnit } from "effector-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const navbar = [
  {
    label: "Home",
    link: "/",
    icon: <Icon name="home" />,
    enabled: true,
  },
  {
    label: "Learn",
    link: "/learn",
    icon: <Icon name="school" />,
    enabled: true,
  },
  {
    label: "Duas",
    link: "/duas",
    icon: <Icon name="menu_book" />,
    enabled: false,
  },
  {
    label: "Khatm",
    link: "/khatm",
    icon: <Icon name="menu_book" />,
    enabled: false,
  },
  {
    label: "Tasks",
    link: "/tasks",
    icon: <Icon name="calendar_month" />,
    enabled: true,
  },
];

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [telegramId] = useUnit([$telegramId]);
  const handleRouting = (route: string) => {
    navigate(route);
  };
  return (
    <AppShell footer={{ height: 70 }} header={{ height: 50 }} padding="md">
      <AppShell.Main
        style={{ overflow: "hidden" }}
        pt={0}
        pl={0}
        pr={0}
        pb={70}
        bg="#F6FAFC"
        styles={{
          main: {
            overflow: "hidden",
          },
        }}
      >
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p={0} px={20}>
        <Flex w="100%" h="100%" gap="md" justify="space-between" align="center">
          {navbar.map((item, index) => (
            <Button
              h={65}
              w={65}
              p={0}
              key={index}
              onClick={() => handleRouting(item.link)}
              variant="transparent"
              disabled={!item.enabled || !telegramId}
              bg="transparent"
              c={
                telegramId && location.pathname === item.link
                  ? "var(--mantine-primary-color-filled)"
                  : "var(--mantine-color-gray-5)"
              }
              styles={{
                label: {
                  display: "flex",
                  fontSize: rem(10),
                  flexDirection: "column",
                  gap: rem(6),
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};
