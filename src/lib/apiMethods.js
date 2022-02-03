const ApiMethods = {
    setUserData(data) {
        localStorage.setItem('instaUser', JSON.stringify(data));
      },
    
      getUserData() {
        return JSON.parse(localStorage.getItem('instaUser'));
      },
    
      removeUserData() {
        localStorage.clear('instaUser');
      },
    
      logoutUser() {
        localStorage.clear('instaUser');
        localStorage.clear('x-access-token');
      },
    
      isLoggedIn() {
        return localStorage.getItem('x-access-token') ? true : false;
      },
    
      setAccessToken(token) {
        localStorage.setItem('x-access-token', token);
      },
    
      getAccessToken() {
        return localStorage.getItem('x-access-token');
      },
};

window.$apiMethods = ApiMethods;

export default ApiMethods;