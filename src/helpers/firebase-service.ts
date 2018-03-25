class FirebaseService {
  user: any;

  constructor() {}

  authCheck = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        let value = localStorage.getItem("USER") || null;
        if (value) {
          this.user = JSON.parse(value);
        } else {
          this.user = null;
        }

        resolve(this.user);
      }, 1000);
    });
  };

  login = ({ email, password }): Promise<any> => {
    return new Promise(resolve => {
      if (email && password) {
        this.user = { email };
        localStorage.setItem("USER", JSON.stringify(this.user));
        setTimeout(() => {
          return resolve(this.user);
        }, 1000);
      } else {
        localStorage.removeItem("USER");
        setTimeout(() => {
          return resolve({ error: "invalid user" });
        }, 1000);
      }
    });
  };

  logout = () => {
    return new Promise(resolve => {
      localStorage.removeItem("USER");
      setTimeout(() => {
        this.user = null;
        return resolve(null);
      }, 1000);
    });
  };

  getUser = () => this.user;
}

export const firebaseAPI = new FirebaseService();
