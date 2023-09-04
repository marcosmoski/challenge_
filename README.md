# solidts

## Esse fonte apresenta os conceitos de solid 

  - [x] S ### Single Responsability Principle
    - Here we saw the CreateUserUseCase class, we just made the creation of user in your single method "execute". 
    - When we do that, we respect the frist principle of SOLID, because we dont use this class to do another type of things unless creating an user.
  - [x] O ### Open-Closed Principle
    - That principle its more complicated to explain, because we need to open our classes to extends, but not to modifications, in our day like a programmer, sometimes, that is not possible.
  - [x] L ### Liskov Substitution Principle
    - We are receiving our dependencies with a interface, that means if we change de database or de rule, we will not break the code, because we can just substitute our interface with another with the same methods.
  - [x] I ### Interface Segregation Principle
       - We are using interfaces to make our DTO's and our interface of classes, so, our classes are segregated by 1 or more interfaces
  - [x] D ### Dependecy Inversion Principle
      - When we use interaces like dependencies, we inverted our dependecie, because our class CreateUserUseCase, does not know how we send and email or what database we use to create the user, it does know about de dependencie and what kind of method it needs to execute.
