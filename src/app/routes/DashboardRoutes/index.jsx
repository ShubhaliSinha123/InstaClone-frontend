import Dashboard from '../../../components/Dashboard/MainDashboard';
import CreatePost from '../../../components/Dashboard/CreatePost';
import Profile from '../../../components/Profile';

const DashboardRoutes = [
    {
        url: '/*',
        name: 'Dashboard',
        element: Dashboard
    },
    {
        url: '/create-post',
        name: 'Post',
        element: CreatePost
    },
    {
        url: '/profile',
        name: 'Profile',
        element: Profile
    },
    {
        url: '/profile/pictures',
        name: 'Profile pictures',
        element: Profile
    },
    {
        url: '/profile/videos',
        name: 'Profile videos',
        element: Profile
    }
];

export default DashboardRoutes;