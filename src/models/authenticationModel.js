export class AuthenticationModel {
    constructor (id, name, email, password) {
        this.id = id,
            this.name = name;
        this.email = email,
            this.password = password;
    }

    static addUser(name, email, password) {
        // check if user already exists or not
        const userExists = users.find(u => u.email == email);
        if (userExists) {
            return true;
        }

        const newUser = new AuthenticationModel(
            users.length + 1,
            name,
            email,
            password
        )
        users.push(newUser);
        return false;
    }

    static isValidUser(email, password) {
        const user = users.find(u => u.email == email && u.password == password);
        return user;
    }
}

var users = [
    {
        id: 1,
        name: 'Tom Cruise',
        email: 'tom01@gmail.com',
        password: '1234',
    }
]