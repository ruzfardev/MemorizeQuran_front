import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home } from "@/pages/home";
import { Tasks } from "@/pages/tasks";
import { Learn } from "@/pages/learn";
import { Layout } from "./ui/layout";
import { FormLayout } from "./ui/layout/FormLayout";
import { useUnit } from "effector-react";
import {
  appInitialized,
  locationAttached,
  navigateAttached,
} from "@/shared/state";
import { useEffect } from "react";
import { Alert, Flex } from "@mantine/core";

export const Router = () => {
  return (
    <Routes>
      <Route path="" element={<InitApp />}>
        <Route element={<Layout />}>
          <Route path={Home.route} element={<Home.component />} />
          <Route element={<FormLayout />}>
            <Route path={Tasks.route} element={<Tasks.component />} />
            <Route path={Learn.route} element={<Learn.component />}>
              <Route path=":taskId" element={<Learn.component />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <Flex
                w="100%"
                h="calc(100vh - 90px)"
                align="center"
                justify="center"
              >
                <Alert
                  title="404: Page is under development."
                  variant="light"
                />
              </Flex>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export const InitApp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initializeApp, attachNavigate, attachLocation] = useUnit([
    appInitialized,
    navigateAttached,
    locationAttached,
  ]);
  useEffect(() => {
    attachNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    attachLocation(location);
  }, [location]);

  useEffect(() => {
    initializeApp();
  }, []);

  return <Outlet />;
};
