// import { PostIssue } from "@/shared/models";
// import { $allSurahs, $currentUser } from "@/shared/state";
// import {
//   ActionIcon,
//   Button,
//   Checkbox,
//   Collapse,
//   Flex,
//   Select,
// } from "@mantine/core";
// import { DateInput, TimeInput } from "@mantine/dates";
// import { useUnit } from "effector-react";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "@mantine/form";
// import {
//   $isIssueCreating,
//   $issue,
//   $issueFetching,
//   issueCreated,
//   issueRequested,
// } from "../model";
// import { useParams } from "react-router-dom";
// import { Icon } from "@/shared/ui";
// const Page = () => {
//   const [allSurahs, currentUser, issue, issueFetching, isIssueCreating] =
//     useUnit([
//       $allSurahs,
//       $currentUser,
//       $issue,
//       $issueFetching,
//       $isIssueCreating,
//     ]);
//   const { taskId } = useParams();
//   const [createIssue, fetchTask] = useUnit([issueCreated, issueRequested]);
//   const [fromValue, setFromValue] = useState<string>("");
//   const [toValue, setToValue] = useState<string>("");
//   const [from, setFrom] = useState<string[]>(
//     Array.from({ length: 604 }, (_, i) => (i + 1).toString())
//   );
//   const [to, setTo] = useState<string[]>([]);
//   const [remindMe, setRemindMe] = useState(false);
//   const handleFromValue = (value: any) => {
//     setFromValue(value as string);
//     form.setFieldValue("from", value);
//     const selectedIndex = from.indexOf(value);
//     const newToOptions = from.slice(selectedIndex + 1);
//     setTo(newToOptions);
//   };

//   const handleToValue = (value: any) => {
//     if (to.includes(value)) {
//       setToValue(value);
//       form.setFieldValue("to", value);
//     }
//   };

//   const form = useForm<PostIssue>({
//     initialValues: {
//       learnTypeId: 0,
//       surahId: null,
//       from: 0,
//       to: 0,
//       notifyAt: "",
//       dateLearned: new Date().toISOString(),
//       durationMinutes: 0,
//       repetitionCount: 0,
//       userId: currentUser ? currentUser.userId : 0,
//     },
//     validate: {
//       learnTypeId: (value) => (value > 0 ? null : "Select learning type"),
//       surahId: (value, values) =>
//         // @ts-ignore
//         values.learnTypeId === "1" && value <= 0 ? "Select surah" : null,
//       from: (value) => (value <= 0 ? "Select from" : null),
//       to: (value) => (value <= 0 ? "Select to" : null),
//     },
//     transformValues: (values) => {
//       return {
//         ...values,
//         surahId: Number(values.surahId),
//         from: Number(values.from),
//         to: Number(values.to),
//         learnTypeId: Number(values.learnTypeId),
//       };
//     },
//     onValuesChange: (values) => {
//       // if changed field if surahId, update from and to options
//       if (values.surahId !== form.values.surahId) {
//         const selectedSurahSize = allSurahs?.find(
//           (s) => s.id === Number(values.surahId)
//         )?.ayahSize;
//         setFrom(
//           Array.from({ length: selectedSurahSize || 0 }, (_, i) =>
//             (i + 1).toString()
//           )
//         );
//       }
//     },
//   });

//   const ref = useRef<HTMLInputElement>(null);

//   const pickerControl = (
//     <ActionIcon
//       variant="subtle"
//       color="gray"
//       onClick={() => ref.current?.showPicker()}
//     >
//       <Icon name="alarm" size={16} />
//     </ActionIcon>
//   );

//   const handleClear = (field: string) => {
//     switch (field) {
//       case "from":
//         setFromValue("");
//         form.setFieldValue("from", 0);
//         break;
//       case "to":
//         setToValue("");
//         form.setFieldValue("to", 0);
//         break;
//       default:
//         return;
//     }
//   };

//   // Reset related fields when learning type changes
//   useEffect(() => {
//     //@ts-ignore
//     if (form.values.learnTypeId === "2") {
//       form.setFieldValue("surahId", null);
//       form.setFieldValue("from", 0);
//       form.setFieldValue("to", 0);
//       setFromValue("");
//       setToValue("");
//       setFrom(Array.from({ length: 604 }, (_, i) => (i + 1).toString()));
//     }
//   }, [form.values.learnTypeId]);

//   const handleCreateTask = (values: PostIssue) => {
//     if (taskId) {
//       // Edit action
//     } else {
//       // Create action
//       createIssue({
//         ...values,
//         surahId: values.surahId === 0 ? null : values.surahId,
//         userId: currentUser ? currentUser.userId : 0,
//       });
//     }
//   };

//   useEffect(() => {
//     if (taskId) {
//       fetchTask(Number(taskId));
//     }
//   }, [taskId]);

//   useEffect(() => {
//     if (issue) {
//       form.setValues({
//         dateLearned: issue.dateLearned,
//         learnTypeId: issue.learnTypeId,
//         notifyAt: issue.notifyAt,
//         surahId: issue.surahId,
//         from: issue.from,
//         to: issue.to,
//         userId: issue.userId,
//       });
//       if (issue.notifyAt !== "") {
//         setRemindMe(true);
//       }
//       setFromValue(issue.from.toString());
//       setToValue(issue.to.toString());
//     }
//   }, [issue, issueFetching]);

//   return (
//     <Flex w="100%" h="100%" direction="column" justify="center" align="center">
//       <form style={{ width: "85%" }} onSubmit={form.onSubmit(handleCreateTask)}>
//         <Flex direction="column" gap={15} w="100%">
//           <Select
//             {...form.getInputProps("learnTypeId")}
//             label="Learn by"
//             placeholder="Pick value"
//             data={[
//               { value: "1", label: "Surah" },
//               { value: "2", label: "Pages" },
//             ]}
//             w="100%"
//             clearable
//           />

//           {String(form.values.learnTypeId) === "1" && (
//             <Select
//               label="Surah"
//               placeholder="Pick surah"
//               data={allSurahs?.map((surah) => ({
//                 value: surah.id.toString(),
//                 label: surah.name,
//               }))}
//               clearable
//               searchable
//               w="100%"
//               key={form.key("surahId")}
//               {...form.getInputProps("surahId")}
//             />
//           )}
//           <Flex gap={10}>
//             <Select
//               error={form.errors.from}
//               label="Enter range"
//               placeholder="from"
//               data={from}
//               onChange={(e) => handleFromValue(e as any)}
//               value={fromValue}
//               onClear={() => handleClear("from")}
//               clearable
//               w="100%"
//             />
//             <Select
//               error={form.errors.to}
//               label={<></>}
//               disabled={!fromValue}
//               value={toValue}
//               onChange={(e) => handleToValue(e as any)}
//               placeholder="to"
//               data={to}
//               clearable
//               onClear={() => handleClear("to")}
//               w="100%"
//             />
//           </Flex>
//           <DateInput
//             label="Date learned"
//             placeholder="Pick date"
//             valueFormat="DD/MM/YYYY"
//             onChange={(date) =>
//               form.setFieldValue("dateLearned", date?.toISOString() || "")
//             }
//             value={new Date(form.values.dateLearned)}
//           />

//           <Checkbox
//             label="Remind me"
//             checked={remindMe}
//             onChange={(e) => setRemindMe(e.currentTarget.checked)}
//           />
//           <Collapse in={remindMe}>
//             <TimeInput
//               ref={ref}
//               label="Remind me at"
//               placeholder="Pick time"
//               rightSection={pickerControl}
//               {...form.getInputProps("notifyAt")}
//               value={form.getValues().notifyAt}
//               onChange={(date) => {
//                 form.setFieldValue("notifyAt", date.currentTarget.value);
//               }}
//             />
//           </Collapse>

//           <Button type="submit" mt="auto" fullWidth loading={isIssueCreating}>
//             Create Task
//           </Button>
//         </Flex>
//       </form>
//     </Flex>
//   );
// };

// export const Learn = {
//   route: "/learn",
//   component: Page,
// };

import { PostIssue } from "@/shared/models";
import { $allSurahs, $currentUser } from "@/shared/state";
import {
  ActionIcon,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Select,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  $isIssueCreating,
  $issue,
  $issueFetching,
  issueCreated,
  issueRequested,
  issueUpdated, // Assuming this exists based on component needs
} from "../model";
import { useParams } from "react-router-dom";
import { Icon } from "@/shared/ui";

// Helper function to format ISO date string to HH:MM time format
const formatTimeForInput = (isoString: string): string => {
  if (!isoString || isoString === "0001-01-01T00:00:00Z" || isoString === "") {
    return "";
  }
  try {
    const date = new Date(isoString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "";
    }
    // Format to HH:MM
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

// Helper function to convert HH:MM time to full ISO date string
const formatTimeToIso = (timeString: string): string => {
  if (!timeString) {
    return "";
  }
  // Create a new date with today's date and the given time
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date.toISOString();
};

const Page = () => {
  const [allSurahs, currentUser, issue, issueFetching, isIssueCreating] =
    useUnit([
      $allSurahs,
      $currentUser,
      $issue,
      $issueFetching,
      $isIssueCreating,
    ]);
  const { taskId } = useParams();
  const [createIssue, updateIssue, fetchTask] = useUnit([
    issueCreated,
    issueUpdated, // Assuming this exists for edit functionality
    issueRequested,
  ]);

  // State for range options
  const [rangeOptions, setRangeOptions] = useState<{
    from: string[];
    to: string[];
  }>({
    from: Array.from({ length: 604 }, (_, i) => (i + 1).toString()),
    to: [],
  });

  // State for reminder toggle and time input
  const [remindMe, setRemindMe] = useState(false);
  const [timeValue, setTimeValue] = useState("");
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Initialize form
  const form = useForm<PostIssue>({
    initialValues: {
      learnTypeId: 0,
      surahId: null,
      from: 0,
      to: 0,
      notifyAt: "",
      dateLearned: new Date().toISOString(),
      durationMinutes: 0,
      repetitionCount: 0,
      userId: currentUser ? currentUser.userId : 0,
    },
    validate: {
      learnTypeId: (value) => (value > 0 ? null : "Select learning type"),
      surahId: (value, values) =>
        Number(values.learnTypeId) === 1 && !value ? "Select surah" : null,
      from: (value) => (value <= 0 ? "Select from" : null),
      to: (value, values) => {
        if (value <= 0) return "Select to";
        if (value <= values.from) return "To must be greater than from";
        return null;
      },
    },
    transformValues: (values) => ({
      ...values,
      surahId: values.surahId ? Number(values.surahId) : null,
      from: Number(values.from),
      to: Number(values.to),
      learnTypeId: Number(values.learnTypeId),
      // Format time properly for submission
      notifyAt: remindMe && timeValue ? formatTimeToIso(timeValue) : "",
    }),
  });

  // Update range options when surah changes
  useEffect(() => {
    const surahId = Number(form.values.surahId);
    if (surahId && Number(form.values.learnTypeId) === 1) {
      const selectedSurah = allSurahs?.find((s) => s.id === surahId);
      if (selectedSurah) {
        const ayahCount = selectedSurah.ayahSize || 0;
        setRangeOptions((prev) => ({
          ...prev,
          from: Array.from({ length: ayahCount }, (_, i) => (i + 1).toString()),
        }));

        // Reset from/to if they're out of the new range
        const currentFrom = Number(form.values.from);
        if (currentFrom > ayahCount) {
          form.setFieldValue("from", 0);
          form.setFieldValue("to", 0);
        } else if (currentFrom > 0) {
          // Update "to" options based on current "from"
          updateToOptions(currentFrom.toString());
        }
      }
    } else if (Number(form.values.learnTypeId) === 2) {
      // Pages mode
      setRangeOptions((prev) => ({
        ...prev,
        from: Array.from({ length: 604 }, (_, i) => (i + 1).toString()),
      }));
    }
  }, [form.values.surahId, form.values.learnTypeId, allSurahs]);

  // Update "to" options when "from" changes
  const updateToOptions = (fromValue: string) => {
    const fromIndex = rangeOptions.from.indexOf(fromValue);
    if (fromIndex !== -1) {
      const newToOptions = rangeOptions.from.slice(fromIndex + 1);
      setRangeOptions((prev) => ({ ...prev, to: newToOptions }));
    }
  };

  // Handle "from" value change
  const handleFromChange = (value: string | null) => {
    if (!value) {
      form.setFieldValue("from", 0);
      form.setFieldValue("to", 0);
      setRangeOptions((prev) => ({ ...prev, to: [] }));
      return;
    }

    form.setFieldValue("from", Number(value));
    updateToOptions(value);

    // Reset "to" if it's now invalid
    const currentTo = Number(form.values.to);
    if (currentTo <= Number(value)) {
      form.setFieldValue("to", 0);
    }
  };

  // Handle task submission
  const handleSubmitTask = (values: PostIssue) => {
    const processedValues = {
      ...values,
      userId: currentUser ? currentUser.userId : 0,
    };

    if (taskId) {
      // Edit mode
      //@ts-ignore
      updateIssue({ ...processedValues, id: Number(taskId) });
    } else {
      // Create mode
      createIssue(processedValues);
    }
  };

  // Handle time input change
  const handleTimeChange = (value: string) => {
    setTimeValue(value);
    // No need to update form here as we'll do it in transformValues
  };

  // Load task data for edit mode
  useEffect(() => {
    if (taskId) {
      fetchTask(Number(taskId));
    }
  }, [taskId, fetchTask]);

  // Apply fetched issue data to form
  useEffect(() => {
    if (issue && !issueFetching) {
      form.setValues({
        ...issue,
        // Ensure correct types for form fields
        learnTypeId: issue.learnTypeId || 0,
        surahId: issue.surahId || null,
        from: issue.from || 0,
        to: issue.to || 0,
      });

      // Set reminder status based on notifyAt field
      // const hasReminder =
      //   issue.notifyAt &&
      //   issue.notifyAt !== "0001-01-01T00:00:00Z" &&
      //   issue.notifyAt !== "";
      if (issue.notifyAt) {
        setRemindMe(true);
      }

      // Format time for display
      const formattedTime = formatTimeForInput(issue.notifyAt);
      setTimeValue(formattedTime);

      // Update "to" options based on "from" value
      if (issue.from > 0) {
        updateToOptions(issue.from.toString());
      }
    }
  }, [issue, issueFetching]);

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <form style={{ width: "85%" }} onSubmit={form.onSubmit(handleSubmitTask)}>
        <Flex direction="column" gap={15} w="100%">
          <Select
            label="Learn by"
            placeholder="Pick value"
            data={[
              { value: "1", label: "Surah" },
              { value: "2", label: "Pages" },
            ]}
            w="100%"
            clearable
            value={
              form.values.learnTypeId
                ? form.values.learnTypeId.toString()
                : null
            }
            onChange={(value) =>
              form.setFieldValue("learnTypeId", value ? Number(value) : 0)
            }
            error={form.errors.learnTypeId}
          />

          {Number(form.values.learnTypeId) === 1 && (
            <Select
              label="Surah"
              placeholder="Pick surah"
              data={allSurahs?.map((surah) => ({
                value: surah.id.toString(),
                label: surah.name,
              }))}
              clearable
              searchable
              w="100%"
              value={
                form.values.surahId ? form.values.surahId.toString() : null
              }
              onChange={(value) =>
                form.setFieldValue("surahId", value ? Number(value) : null)
              }
              error={form.errors.surahId}
            />
          )}

          <Flex gap={10}>
            <Select
              error={form.errors.from}
              label="Enter range"
              placeholder="from"
              data={rangeOptions.from}
              value={form.values.from > 0 ? form.values.from.toString() : null}
              onChange={handleFromChange}
              clearable
              w="100%"
            />
            <Select
              error={form.errors.to}
              label={<></>}
              disabled={!form.values.from}
              value={form.values.to > 0 ? form.values.to.toString() : null}
              onChange={(value) =>
                form.setFieldValue("to", value ? Number(value) : 0)
              }
              placeholder="to"
              data={rangeOptions.to}
              clearable
              w="100%"
            />
          </Flex>

          <DateInput
            label="Date learned"
            placeholder="Pick date"
            valueFormat="DD/MM/YYYY"
            onChange={(date) =>
              form.setFieldValue(
                "dateLearned",
                date?.toISOString() || new Date().toISOString()
              )
            }
            value={new Date(form.values.dateLearned)}
          />

          <Checkbox
            label="Remind me"
            checked={remindMe}
            onChange={(e) => {
              const checked = e.currentTarget.checked;
              setRemindMe(checked);
              if (!checked) {
                // Clear time value if reminder is turned off
                setTimeValue("");
              }
            }}
          />

          <Collapse in={remindMe}>
            <TimeInput
              ref={timeInputRef}
              label="Remind me at"
              placeholder="Pick time"
              rightSection={
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => timeInputRef.current?.showPicker()}
                >
                  <Icon name="alarm" size={16} />
                </ActionIcon>
              }
              value={timeValue}
              onChange={(e) => handleTimeChange(e.currentTarget.value)}
            />
          </Collapse>

          <Button type="submit" mt="auto" fullWidth loading={isIssueCreating}>
            {taskId ? "Update Task" : "Create Task"}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export const Learn = {
  route: "/learn",
  component: Page,
};
