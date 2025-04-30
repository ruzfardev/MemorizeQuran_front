import {
  Box,
  Card,
  Checkbox,
  Divider,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import { useUnit } from "effector-react";
import {
  $isLoadingPlanForDay,
  $isLoadingPlanForMonth,
  $planForDay,
  $planForMonth,
  pageMounted,
  plansForDayFetched,
  plansForMonthFetched,
  planStatusChanged,
} from "../model";
import { useCallback, useEffect, useState } from "react";
import { StarBadge } from "@/shared/ui";
import { $currentUser } from "@/shared/state";
import "./style.css";
import { DatePicker, DayProps } from "@mantine/dates";
const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [mountPage, fetchPlansForDay, fetchPlansForMonth, changePlanStatus] =
    useUnit([
      pageMounted,
      plansForDayFetched,
      plansForMonthFetched,
      planStatusChanged,
    ]);
  const [plans, plansForDay, currentUser] = useUnit([
    $planForMonth,
    $planForDay,
    $currentUser,
  ]);
  const [isLoadingPlanForMonth, isLoadingPlanForDay] = useUnit([
    $isLoadingPlanForMonth,
    $isLoadingPlanForDay,
  ]);
  useEffect(() => {
    if (!currentUser) return;
    mountPage({
      userId: currentUser?.userId,
      date: new Date().toDateString(),
    });
  }, [currentUser]);
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    fetchPlansForDay({
      userId: currentUser?.userId,
      date: date.toDateString(),
    });
  };

  const handleDateChange = (date: Date) => {
    if (!date) return;
    setSelectedDate(date);
    fetchPlansForMonth({
      userId: currentUser?.userId,
      date: new Date(date).toDateString(),
    });
  };

  const handleStatus = (id: number) => {
    if (!selectedDate) return;
    changePlanStatus({
      date: selectedDate.toDateString(),
      planId: id,
    });
  };
  const generateDayProps = useCallback(
    (date: Date) => {
      let hasPlan = plans.find(
        (plan) =>
          new Date(date).toDateString() === new Date(plan.today).toDateString()
      )?.hasPlan;
      return {
        date: date,
        outside: false,
        selected: false,
        renderDay(date) {
          return (
            <Flex
              justify="center"
              align="center"
              w="100%"
              h="100%"
              onClick={() => handleDayClick(date)}
              classNames={{
                root:
                  selectedDate?.toDateString() === date.toDateString()
                    ? "hasPlan"
                    : hasPlan
                    ? "selected"
                    : "",
              }}
            >
              {date.getDate()}
            </Flex>
          );
        },
      } as DayProps;
    },
    [plans, selectedDate]
  );

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      w="100%"
      pt={50}
      bg="#F6FAFC"
      h="calc(100vh - 70px)"
    >
      <Box p={10} mih="60%">
        {isLoadingPlanForMonth ? (
          <Flex direction="column" w="100%" gap={5}>
            <Flex gap={10} justify="space-between">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width="75%" />
              <Skeleton height={40} width={40} />
            </Flex>
            <SimpleGrid
              verticalSpacing="3px"
              spacing="3px"
              cols={7}
              w="100%"
              h="100%"
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} height={33} width={42} />
              ))}
            </SimpleGrid>
            <SimpleGrid
              verticalSpacing="3px"
              spacing="3px"
              cols={7}
              w="100%"
              h="100%"
            >
              {Array.from({ length: 6 }).map((_) =>
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} height={42} width={42} />
                ))
              )}
            </SimpleGrid>
          </Flex>
        ) : (
          <DatePicker
            firstDayOfWeek={1}
            date={selectedDate}
            onDateChange={handleDateChange}
            minDate={new Date("2024-01-01")}
            weekdayFormat={"ddd"}
            getDayProps={generateDayProps}
            size="md"
          />
        )}
      </Box>
      <Divider
        mb={10}
        w="80%"
        label={`
        Plan for ${selectedDate?.toDateString()}
        `}
        labelPosition="center"
      />
      <Flex direction="column" gap={10} px={20} w="100%" h="30%">
        {isLoadingPlanForDay
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} h={120} width="100%" />
            ))
          : plansForDay.map((plan) => (
              <Card
                className="plan-for-day__card"
                py={5}
                px={10}
                shadow="xs"
                radius="md"
                key={plan.id}
              >
                <Flex align="center" gap={10}>
                  <StarBadge color="white" size={36} />
                  <Flex direction="column">
                    <Text fw="500">
                      {plan.surahName ? plan.surahName : "By Pages"} {plan.from}{" "}
                      - {plan.to}
                    </Text>
                    <Text fz={12}>repeat after 15 minutes</Text>
                  </Flex>
                  <Checkbox
                    checked={plan.isCompleted}
                    onChange={() => handleStatus(plan.id)}
                    color="var(--mantine-primary-color-filled)"
                    variant="filled"
                    ml="auto"
                    size="sm"
                  />
                </Flex>
              </Card>
            ))}
        {plansForDay?.length <= 0 && !isLoadingPlanForDay && (
          <Flex align="center" justify="center" w="100%" h="100%">
            No plans for {selectedDate?.toDateString()}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const Tasks = {
  route: "/tasks",
  component: Page,
};
