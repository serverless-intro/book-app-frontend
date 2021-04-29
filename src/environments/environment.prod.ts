export const environment = {
  production: true,
  backendUrl: 'https://hpvtfeul5f.execute-api.eu-central-1.amazonaws.com',
  authConfig: {
    userPoolId: 'eu-central-1_5QiuwGB1A',
    userPoolWebClientId: '3e4f373o3vbglt3dmuobd20ov7',
    oauth: {
      region: 'eu-central-1',
      domain: 'book-app-users.auth.eu-central-1.amazoncognito.com',
      scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'https://d1dqn2amkmxnmo.cloudfront.net/',
      redirectSignOut: 'https://d1dqn2amkmxnmo.cloudfront.net/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
};
