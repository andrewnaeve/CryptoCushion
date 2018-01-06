import gql from 'graphql-tag';

export const signUpMutation = gql`
	mutation signUp($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
		signUp(user: { first_name: $first_name, last_name: $last_name, email: $email, password: $password })
	}
`;
