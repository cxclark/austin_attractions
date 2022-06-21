## Austin Attractions CRUD App with Google Login
The purpose of this project was to build a full-stack CRUD (Create, Read, Update,Delete) application using Node.js, Express, EJS, and Mongoose. Since I recently moved to Austin, TX, I used this opportunity to build an application around Austin attractions and things to do in the area.

In my app, users can:

1. View all attractions
2. See details of a single attraction
3. Edit details of an attraction
4. Delete an attraction
5. Add an attraction
6. Login with Google
7. Add reviews (comments + ratings) 


### Unsolved Problems/Next Steps
1. Build in logic so that only logged in users can add commments
1. Add [`passport-local`](https://www.passportjs.org/packages/passport-local/) to my `passport.js` to give users the option to login locally.
1. Add [`bcrypt`](https://www.npmjs.com/package/bcrypt) for password encryption.
