import Dashboard from "../../../components/Dashboard/MainDashboard";
import CreatePost from "../../../components/Dashboard/CreatePost";
import Profile from "../../../components/Profile";
import EditProfile from "../../../components/Profile/Components/editProfile";

const DashboardRoutes = [
  {
    url: "/*",
    name: "Dashboard",
    element: Dashboard,
  },
  {
    url: "/create-post",
    name: "Post",
    element: CreatePost,
  },
  {
    url: "/profile",
    name: "Profile",
    element: Profile,
  },
  {
    url: "/edit-profile",
    name: "Edit Profile",
    element: EditProfile,
  },
  {
    url: "/profile/pictures",
    name: "Profile pictures",
    element: Profile,
  },
  {
    url: "/profile/videos",
    name: "Profile videos",
    element: Profile,
  },
];

export default DashboardRoutes;
