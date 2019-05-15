import Dashboard from "views/Dashboard.jsx";
import Team from "views/Team";
import Participants from "views/Participants";
import Modules from "views/Modules";
import Ambassador from "views/Ambassador";
import University from "views/University";
import Organizers from './views/Organizer';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/participants",
    name: "Participants",
    icon: "pe-7s-add-user",
    component: Participants,
    layout: "/admin"
  },
  {
    path: "/Team",
    name: "Teams",
    icon: "pe-7s-users",
    component: Team,
    layout: "/admin"
  },
  {
    path: "/modules",
    name: "Modules",
    icon: "pe-7s-network",
    component: Modules,
    layout: "/admin"
  },
  {
    path: "/ambassador",
    name: "Ambassadors",
    icon: "pe-7s-user",
    component: Ambassador,
    layout: "/admin"
  },
  {
    path: "/university",
    name: "University",
    icon: "pe-7s-study",
    component: University,
    layout: "/admin"
  },
  {
    path: "/organizers",
    name: "Organizers",
    icon: "pe-7s-note2",
    component: Organizers,
    layout: "/admin"
  },
];

export default dashboardRoutes;
