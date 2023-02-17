const initialState = {
    users: [],
    loggedInUser: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            const newUser = action.payload;
            const existingUser = state.users.find(user => user.email === newUser.email);
            if (existingUser) {
                return {
                    ...state,
                    error: 'User with that email already exists',
                };
            } else {
                return {
                    ...state,
                    users: [...state.users, newUser],
                    loggedInUser: newUser,
                    error: null,
                };
            }
        case 'LOGIN_USER':
            const { email, password } = action.payload;
            const user = state.users.find(user => user.email === email && user.password === password);
            if (user) {
                return {
                    ...state,
                    loggedInUser: user,
                    error: null,
                };
            } else {
                return {
                    ...state,
                    error: 'Invalid email or password',
                };
            }
        default:
            return state;
    }
};

export default userReducer;
