25 substantive slides



1. You have a great idea, Pivotal is going to change what it does, and sell consumer goods instead of cloud computing tools and agile consulting.


2. You spin up a rest backend service in Spring that includes a bunch of pivotal T-Shirts for sale.

3. You TDD a sweet new homepage using the demo code from the Angular website.
(commit 56e53839de09e72ae0a704584d153b3cf2f535cb)

4. Home page is almost ready, just need a shopping cart to show users what they're buying.

5. Users keep trying to check out with no products in their cart, let's disable it:
	- classic angular gives us to awful choices:
		1. jam more logic in our markup!
		2. add a stateful flag in our controller
		
	- both options are horrible
		1. markup is painful to test
		2. state is hard to keep track of in our heads
	
	- we choose markup since at least it's somewhat declarative
	
6. Some of our developers live in New Jersey, so we add some more shirts

7. Some of our developers live in Brooklyn, let's add some hats

	mmmm, that's a good hat

8. Design says the UX is heinous, users need to be able to filter clothing color

9. the MVP works great, but we've hard coded our colors, that will never do

10. red and blue clothes are great, but we already know we need more than that, let's make it dynamic:
	- now we have our favorite Shitty Angular Choice® again:
		1. jam more logic in our markup!
		2. keep track of state in our controller
		
	this time we decide to use our controller, the way god intended. We'll watch any new 	clothing line that comes in, and add those colors to the permitted colors list, and then let users filter anything out that they want

11. Good news! the site is growing like crazy, two requests come in:
	1. marketing wants to be able to be a little more... agile, and decide what goes on the site each morning
	2. our users want to be able to pick a size for their new swag
	
	the problem is that our application is brittle, and we now have two competing requests: one set of users wants the site to be more general, the other wants the site to be more highly specified. Well factored code would make this pretty OK, but this is going to be a challenge.
	
	- We'll start by adding a size dropdown for our shirts, which come in Fibonacci sizes
	Done. Great, now users can pick a size, but then can also make an invalid purchase. that's going to be annoying to validate)
		
	- Done. Not the end of the world, and our code is actually a little cleaner for it.

12. The sales team has identified a Synergy™: from now on, we're also going to to offer Labs Engagements on our site, so that our users can have one-stop shopping.

    - this is going to be tricky. Until now, we've been able to get away with treating the shopping cart like it's part of the items page, since it was only used for buying clothing. Now we're going to have to face something Angular is **terrible** at: inter-controller communication. To accomplish this, we have two options:
    	1. event soup: because browsers aren't hard enough
    	2. try to make our controller accessible to each other, by proxying methods through scopes.
    	
    	- we're going to use events, since at least most people are familiar with events
    		fun problems with events:
    			events have strings for names, easy to make typos
    			events cannot have dashes in their names. found this out the hard way.
    			events are directional. anyone in the audience who enjoys differentiating between $broadcast and $emit gets double dessert.

13. Our site is a mess. We have the dankest marketing asset that any consultancy could ask for, but reasoning about the code is getting hard, extending it with cool features is gross, testing this thing (lol) is a nightmare. Maybe worst of all, working on it makes me feel sad. 
	- why is it so bad?
		1. Lots of logic jammed into the markup
		2. App structure/styling is deeply entwined with the html structure.
		3. data flow through the app is challenging to follow. Admittedly, it's not terrible yet, but it would be difficult to describe the site's behavior in simple language, despite the fact that it's doing simple things.
		
14. Our devs are sad, they want the site rewritten using a cleaner Angular pattern.

	our devs have all heard that React is the new hotness, and they want to make this app feel more like that to work with. After extensive user interviews with the Devs, we determine that they like React for the following reasons:
	 1. data flows one way
	 2. testing is simple
	 3. markup is encapsulated by components
	 4. it's stateless (sort of - more on that later)!
	 
	 we're smart, we can make this work in Angular too!
  
----

The big cleanup:
================

Let's refactor the app, in line with the principles we listed above:

1. data flows one way
2. testing is simple
3. markup is encapsulated by components
4. it's stateless

I regularly hear that Angular is highly opinionated - and I have literally no idea why anybody would ever say that ever. I'm a big fan of the framework, but it is so obviously schizeophrenic about what paradigm it supports and what patterns it encourages that I genuinely cannot understand why anyone feels it exerts pressure towards one specific way of working.

With that out of the way, let's talk about angular's biggest enemies that we've identified:

1. logic in markup sucks. It's hard to understand, hard to test, and hard to refactor
2. state sucks, state that lives somewhere between the markup and the controller code is toxic, angular does a terrible job at making this explicit or controlled, you have to do it yourself.
3. data is disaggregated, and it's movements are not always clear. What if we wanted to modify offerings on the page based on what's in your shopping cart? Does the cart get to decide the clothes' prices? Even though the clothes got to decide the composition of the cart?

Let's start with some rules:

1. No controllers. Ever. Controllers are a technique that Angular offers for adding behavior to markup. This is the exact inverse of the way a web app should be built. Our controllers should pass model data into a thing that can explain it to the user. Instead, we have the part of our app that explains data deciding how to transform and show the data. It sucks.
 - let's get rid of controllers
 
**Everything is a directive**

1. First, grab literally everything and shove it into one root directive. It's schnasty, but it's the first step to recovery.
2. Let's extract the shopping cart into its own directive - nice and easy
	- I see you're using link instead of controller! which should I use?
		- link. always. and inject anything you need at the top of your directive declaration. that way injection magic all happens in one place, and you never wonder whether the exact name of your arguments matters when defining your linker.

3. Let's extract the marketing header
	- what? even though it's just static markup???
		- yes. Why? because literally the whole point of this talk is that you have to be dogmatic for angular to be a comfortable environment to work in. just do it.

4. extract the clothing section.
5. extract the engagements section.

Great! We have no more free-floating controllers, and now we're down to a set of directives that use each other. **Note** they are no more or less free of each other's scopes/states than they were before we did this extraction. That comes next.

**Everything gets a private scope**

No matter what, don't share scopes in Angular. It's tempting, and it's something that's strongly encouraged by the api and by the design of angular and by its docs. Do not do it.



  			
    			