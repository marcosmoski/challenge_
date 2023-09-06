# solidts

## Summary

- Use cases are our services, where we have the functions which will connect with the repository and do something. 
- Controllers are what our routes will call, they will call an use case or more then one and return a response to the client 
- Entities are our entities, we could use this on future to add users or phones on our database, for now we dont do this because we are using axios to get it from a third party url. 
- Using JWT to authenticate, if you want to test it, please run *yarn* then add a *.env* file on root folder with variable *JWT_KEY* filled in with something.
- Swagger api is on \api-docs url.
- Using express validator to validate request parameters 
- Using axios to make url requests 
- Using vitest on unit tests
- To run unit tests please run yarn vitest =)
- I did tests only on Authentication controller to demonstrate how i would deal with that, and because i didn't had time to finish every utest, for sure the idea would be add tests for get phones controller and use cases.