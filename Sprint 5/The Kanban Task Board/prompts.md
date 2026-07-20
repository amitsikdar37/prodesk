1. when i added coding to the text input of the to do list and clicked add button. i don't see my new card in the ui. why so ??

2. [Card.jsx#L3-27](textBlock;file:///d%3A/VS%20Code/Prodesk/Sprint%205/The%20Kanban%20Task%20Board/src/components/Card.jsx#L3-27) why its not showing the task tittle in the ui ??? i had written this much of code right now. 

3. why my input field is not getting hidden upon clicking save ??? also the css looks horrible. fix all this  issue. 

4. how i can use dnd kit to implement drag and drop feature of the task cards. give me the step by step guide. 

5. the cards are sliding down. why this is happening ??? fix this

6. this are the error i am seeing in the console log when i am trying to click any task. the page is becoming white. 

Uncaught ReferenceError: Card is not defined
    at Board (Board.jsx:110:14)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=d7d8eb9d:12866:12)
    at renderWithHooks (react-dom_client.js?v=d7d8eb9d:4213:19)
    at updateFunctionComponent (react-dom_client.js?v=d7d8eb9d:5569:16)
    at beginWork (react-dom_client.js?v=d7d8eb9d:6140:20)
    at runWithFiberInDEV (react-dom_client.js?v=d7d8eb9d:851:66)
    at performUnitOfWork (react-dom_client.js?v=d7d8eb9d:8429:92)
    at workLoopSync (react-dom_client.js?v=d7d8eb9d:8325:37)
    at renderRootSync (react-dom_client.js?v=d7d8eb9d:8309:6)
    at performWorkOnRoot (react-dom_client.js?v=d7d8eb9d:7994:27)
Board @ Board.jsx:110
react_stack_bottom_frame @ react-dom_client.js?v=d7d8eb9d:12866
renderWithHooks @ react-dom_client.js?v=d7d8eb9d:4213
updateFunctionComponent @ react-dom_client.js?v=d7d8eb9d:5569
beginWork @ react-dom_client.js?v=d7d8eb9d:6140
runWithFiberInDEV @ react-dom_client.js?v=d7d8eb9d:851
performUnitOfWork @ react-dom_client.js?v=d7d8eb9d:8429
workLoopSync @ react-dom_client.js?v=d7d8eb9d:8325
renderRootSync @ react-dom_client.js?v=d7d8eb9d:8309
performWorkOnRoot @ react-dom_client.js?v=d7d8eb9d:7994
performSyncWorkOnRoot @ react-dom_client.js?v=d7d8eb9d:9067
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=d7d8eb9d:8984
processRootScheduleInMicrotask @ react-dom_client.js?v=d7d8eb9d:9005
(anonymous) @ react-dom_client.js?v=d7d8eb9d:9078
<Board>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d7d8eb9d:193
App @ App.jsx:11
react_stack_bottom_frame @ react-dom_client.js?v=d7d8eb9d:12866
renderWithHooksAgain @ react-dom_client.js?v=d7d8eb9d:4268
renderWithHooks @ react-dom_client.js?v=d7d8eb9d:4219
updateFunctionComponent @ react-dom_client.js?v=d7d8eb9d:5569
beginWork @ react-dom_client.js?v=d7d8eb9d:6140
runWithFiberInDEV @ react-dom_client.js?v=d7d8eb9d:851
performUnitOfWork @ react-dom_client.js?v=d7d8eb9d:8429
workLoopSync @ react-dom_client.js?v=d7d8eb9d:8325
renderRootSync @ react-dom_client.js?v=d7d8eb9d:8309
performWorkOnRoot @ react-dom_client.js?v=d7d8eb9d:7957
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=d7d8eb9d:9059
performWorkUntilDeadline @ react-dom_client.js?v=d7d8eb9d:36
<App>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=d7d8eb9d:193
(anonymous) @ main.jsx:8
App.jsx:11 An error occurred in the <Board> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.