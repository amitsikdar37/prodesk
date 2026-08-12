1. why the screen is black. why i am not seeing any movies card on the ui ???

2. why am i seeing this error ??

ncaught ReferenceError: Cannot access 'query' before initialization
    at App (App.jsx:27:7)

3. what are these error i am seeing and also movies are still not visible on the new tab 
ncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
injectScriptAdjust.js:1  GET https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=be19de2f522236c460e367db33f361a8&page=2204 400 (Bad Request)
VihJ @ injectScriptAdjust.js:1
345.e.class.zaOz.window.fetch @ injectScriptAdjust.js:1
(anonymous) @ App.jsx:46
(anonymous) @ App.jsx:18
App.jsx:51 Uncaught TypeError: data.results is not iterable
    at App.jsx:51:55
    at basicStateReducer (react-dom_client.js?v=7ae2d96b:4388:42)
    at updateReducerImpl (react-dom_client.js?v=7ae2d96b:4465:46)
    at updateReducer (react-dom_client.js?v=7ae2d96b:4416:11)
    at Object.useState (react-dom_client.js?v=7ae2d96b:13299:13)
    at exports.useState (react.js?v=78a7084e:748:31)
    at App (App.jsx:9:31
    at Object.react_stack_bottom_frame (react-dom_client.js?v=7ae2d96b:12864:12)
    at renderWithHooks (react-dom_client.js?v=7ae2d96b:4211:19)
    at updateFunctionComponent (react-dom_client.js?v=7ae2d96b:5567:16)
(anonymous) @ App.jsx:51
basicStateReducer @ react-dom_client.js?v=7ae2d96b:4388
updateReducerImpl @ react-dom_client.js?v=7ae2d96b:4465
updateReducer @ react-dom_client.js?v=7ae2d96b:4416
useState @ react-dom_client.js?v=7ae2d96b:13299
exports.useState @ react.js?v=78a7084e:748
(anonymous) @ App.jsx:9
react_stack_bottom_frame @ react-dom_client.js?v=7ae2d96b:12864
renderWithHooks @ react-dom_client.js?v=7ae2d96b:4211
updateFunctionComponent @ react-dom_client.js?v=7ae2d96b:5567
beginWork @ react-dom_client.js?v=7ae2d96b:6138
runWithFiberInDEV @ react-dom_client.js?v=7ae2d96b:850
performUnitOfWork @ react-dom_client.js?v=7ae2d96b:8427
workLoopSync @ react-dom_client.js?v=7ae2d96b:8323
renderRootSync @ react-dom_client.js?v=7ae2d96b:8307
performWorkOnRoot @ react-dom_client.js?v=7ae2d96b:7992
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=7ae2d96b:9057
performWorkUntilDeadline @ react-dom_client.js?v=7ae2d96b:36
react-dom_client.js?v=7ae2d96b:5256 An error occurred in the <App> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries

4. my favourite section is not getting updated even though i am clicking the favourite the button. 

5. why am i getting this error in browser console ??? 

@google_genai.js?v=20d26fe4:19482 Uncaught (in promise) Error: An API Key must be set when running in a browser
    at new GoogleGenAI (@google_genai.js?v=20d26fe4:19482:37)
    at handleMoodSubmit (App.jsx:80:16)
    at onSubmit (SearchBar.jsx:36:11)

when google docs says that it automatically detects the api key in environement variable. 

6. bro right now when i am typing something long in the mood search bar its getting hidden and i am not able to see the full sentence. can you fix this issue. 