import { gql, useMutation } from "@apollo/client";
import Error from "./Error";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY } from "./Signin";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
        email
        name
      }
    }
  }
`;

function Signin(props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <div className='signin-form'>
      <form
        method='post'
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await signin();
          console.log(res);
          props.close();
          resetForm();
        }}
      >
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor='email'>
            Email
            <input
              type='text'
              name='email'
              placeholder='email'
              value={inputs.email}
              onChange={handleChange}
              autoComplete='email'
            />
          </label>
          <label htmlFor='password'>
            Password
            <input
              type='password'
              name='password'
              placeholder='password'
              value={inputs.password}
              onChange={handleChange}
              autoComplete='new-password'
            />
          </label>

          <button type='submit'>Sign In</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Signin;
