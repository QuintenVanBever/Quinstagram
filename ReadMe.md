# Quinstagram - Project Webapplicaties 4

My name is Quinten Van Bever, student at HoGent.
This is the project I made for a class I follow. The name of this project is 'Quinstagram', an Instagram clone.
The website is made with an Angular Frontend accompanied with a .NET backend.

## How to open the Project

1. Clone the repository
2. Go to Frontend/ in CLI and use "npm i"
3. While the node modules are installing, open the solution in Backend in Visual Studio
4. Run backend
5. When "npm i" is finished you can use "npm start" The website will open by itself

## How to use

##### Login credentials:

- email: web4@admin.be
- password: gelukkiggeennetbeans

#### things you can do when:

##### not logged in:

1. Register
2. Log in
3. Watch all posts
4. Watch a post in detail by clicking on the image

##### logged in:

1. Log out
2. Watch all posts
3. Watch a post in detail by clicking on the image
4. Comment on a post
5. Make your own post
6. Delete your previously made posts

### Making a post

All fields, Title, Description, and Image are required.
When adding a picture, please use the given images in "frontend/src/assets/images" as saving images in the DB isn't working yet.
You will be redirected to the detail page of your post.

### Commenting

Commenting currently is anonymous. You can comment on all post, including your own.

## Work In Progress

1. Ability to save images to the Database
2. Like Comments and have a list of comments you liked
3. Profile page with all your posts

### Future additions

1. Pagination on comments and posts to browse through them
2. Counter that tells you how many characters you have left in your description
3. Search Function for users and posts
4. Put website online
