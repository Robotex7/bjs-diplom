let userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, result => {
        if (!result.success) {
            userForm.setLoginErrorMessage(result.error);
        } else {
            location.reload();
        }
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, result => {
        if (!result.success) {
            userForm.setRegisterErrorMessage(result.error);
        } else {
            location.reload();
        }
    });
};