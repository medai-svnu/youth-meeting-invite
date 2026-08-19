/**
 * Design philosophy: «Wednesday Pulse» — الدعوة الشخصية وأداة الخدمة تستخدمان مدار الاسم وخط الرحلة بوضوح.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Invite from "./pages/Invite";
import Generator from "./pages/Generator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/invite" component={Invite} />
      <Route path="/generator" component={Generator} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
