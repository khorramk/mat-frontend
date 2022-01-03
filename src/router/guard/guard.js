export const InitRoute = (to, from, next) => {
    next();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && to.name == 'Signup') {
        return next({ name: 'Signup' });
    }
    /**please explain how this home route works */
    else if (!user && to.name == 'Home') {
        return next();
    }
    else if (!user) {
        return next({ name: 'Login' });
    }
    else if (user.is_verified == 0) {
        return next({ name: 'EmailVerification' });
    }
    else if (user.account_type === 1 && user.data_input_status <= 5) {

        return next({ name: 'CandidateRegistration' });
    }
    else if (user.account_type === 2) {
        return next({ name: 'RepresentativeRegistration' });
    }
    else if (user && (to.name == 'Signup' || to.name == 'Login' || user && to.name == 'Home')) {
        return next({ name: 'root' });
    }
    else {
        next();
    }

}