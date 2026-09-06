# Prompts

### Prompt 1: CORS Policy Error
bro my react app on localhost:5173 is trying to fetch posts from express server on localhost:5000 using useEffect, but in console it gives this error:
"Access to fetch at 'http://localhost:5000/api/posts' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
How do i fix this in express server so my frontend can call the api?

### Prompt 2: useEffect Infinite Loop
My useEffect is calling the api continuously in an infinite loop and it is crashing my browser tab with hundreds of network calls. Here is my code:
```javascript
useEffect(() => {
  fetchPosts();
});
```
Why is this happening and how to make it fetch only once when the page loads?

### Prompt 3: req.body is Undefined in POST Route
When I submit my form from React to create a new post with fetch, in my express console req.body is showing undefined. Why is express not reading my json data sent from the form?

### Prompt 4: MongoDB Connection Crashing Node
Whenever i run `node index.js`, mongoose crashes the whole server if local mongodb is not turned on. How can i handle mongoose connection error cleanly so my express app still starts up even if mongo is down?

### Prompt 5: Delete Post Not Updating UI
When i click delete button on a post, the delete request works on the server, but the post card stays on the screen until i manually refresh the browser. How do i update the react state to remove the deleted post immediately?
