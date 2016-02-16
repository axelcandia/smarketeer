var lock = new Auth0Lock('uIFEZxZWrVlLsHeRCSRqfuaFzJGvPUbm', 'smarketeer.auth0.com');
  
  
  function signin() {
    lock.show({
        callbackURL: 'http://smarketeer.io/home/dashboard'
      , responseType: 'code'
      , authParams: {
        scope: 'openid profile'
      }
    });
  }