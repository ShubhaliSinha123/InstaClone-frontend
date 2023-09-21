import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from '../../components/login';
import Register from '../../components/register';
import NavigateUsers from './NavigateUsers';
import AuthGuard from '../routes/AuthGuard';
import DashboardRoutes from './DashboardRoutes';

const MainRouter = (props) => {
    const DashboardLayout = React.lazy(() => import('../../layout/index'));

    return (
        <Routes>
            {/* <Route exact path='/' element={<Navigate to="/login" />} /> */}
            <Route 
            path="/login/*"
            element={
                <NavigateUsers
                path="/"
                element={
                    <Routes>
                        <Route path="/" element={<Login/>} />
                    </Routes>
                }
                />
            }
            />
            <Route exact path='/register' element={<Register />} />
            <Route
            path="/*"
            element={
                <AuthGuard
                role={"client"}
                path="/*"
                element={
                    <>
                    <DashboardLayout {...props}>
                        <Routes>
                            {DashboardRoutes.map((el) => (
                                <Route path={el.url} key={el.url} element={<el.element />} />
                            ))}
                        </Routes>
                    </DashboardLayout>
                    </>
                }
                />
            }
            />
            {/* <Route path='/logout' element={<Login/>} /> */}
        </Routes>
    )
};

export default MainRouter;