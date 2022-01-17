import { Route, Routes, Navigate } from "react-router-dom";

const NavigateUsers = ({element, ...rest}) => {
    const token = localStorage.getItem('token');

    return (
        <>
        {token ? (
            <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        ) : (
            <Routes>
                <Route path="/" element={element} />
            </Routes>
        )}
        </>
    )
};

export default NavigateUsers;