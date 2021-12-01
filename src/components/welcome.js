import { NavLink } from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <NavLink to='/register'>Sign Up</NavLink>
            <br />
            <NavLink to='/login'>Sign In</NavLink>
        </div>
    )
};

export default Welcome;