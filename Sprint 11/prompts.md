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

### Prompt 6: Prevent Duplicate Form Submissions
When users click the submit button multiple times while the server is saving the post to MongoDB, it creates duplicate documents. How can i add a submitting loading state to disable the button and show "Injecting Data..." until the fetch completes?

### Prompt 7: Optimistic Local State Mutation for Delete
Should i re-run fetchPosts() to reload everything after deleting a post or should i filter the local posts array with setPosts? How do i show a deleting state on just that one card so user knows it's being deleted?

### Prompt 8: React Error Boundary for Runtime Crashes
My react app shows a completely blank white screen whenever there is an unhandled rendering error. How do i build a simple ErrorBoundary component in React using componentDidCatch to display a clean fallback card with a reload button?

### Prompt 9: Implementing Edit with PUT in Express and React
I want to let users edit a post title and content directly on the page. How do i make a PUT route in Express with mongoose findByIdAndUpdate, and how do i toggle edit mode for a post in React and update the state array?
