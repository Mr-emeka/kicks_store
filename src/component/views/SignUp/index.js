import React from 'react';
import FormInput from '../../custom/Input/';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions';
import { useHistory } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';

const SignUp = ({ registerUserAction, state }) => {
  const history = useHistory();
  const [user, setUser] = React.useState({
    displayName: '',
    email: '',
    password: '',
    confirmPass: '',
  });
  const { displayName, email, password, confirmPass } = user;
  console.log(state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert('passwords do not match');
      return;
    }
    if (
      // eslint-disable-next-line no-control-regex
      !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        email
      )
    ) {
      alert('Invalid Email Address');
      return;
    }
    return registerUserAction({ displayName, email, password, history });
  };
  const handleChange = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <AuthLayout>
      <div className="container">
        <div className="d-flex justify-content-center align-self-center">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Full Name</label>
              <FormInput
                type="text"
                id="name"
                name="displayName"
                ariaDescribedby="name"
                placeholder="John Doe"
                callback={handleChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <FormInput
                type="email"
                id="email"
                name="email"
                ariaDescribedby="emailHelp"
                placeholder="Email."
                callback={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <FormInput
                type="password"
                id="password"
                name="password"
                ariaDescribedby="password"
                placeholder="***********"
                callback={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <FormInput
                type="password"
                id="confirm_password"
                name="confirmPass"
                ariaDescribedby="confirm-password"
                placeholder="***********"
                callback={handleChange}
              />
            </div>
            <div className="d-lg-flex justify-content-between">
              <div>
                <p>
                  Already have an account <a href="login">Login</a>
                </p>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={state.loading}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = ({ authUser }) => ({
  state: authUser,
});

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(SignUp);
