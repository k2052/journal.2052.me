---
title: How to Solve an Interview Challenge
publishDate: 2016-02-08
---

A frog wants to cross a river.

When I was a kid I hated word problems, they drove me insane. Word problems took math, which was fun, and turned it into a hellscape of word play and misdirection. Instead of data and variables, I had to play a game of decipher and find the data. I hated world problems and it took me years to get comfortable with them.

You know the ones I'm talking about. They sound like this (you can skip the next 500 words)

Claire gets to the airport at 5:45am, going to visit her boyfriend Chad in up state New York. At 5:30am Claire's best friend Drew sees the note she left in January but he never got because his comic relief roommate Cheese knocked over the table while playing a game of hockey in the kitchen; which meant this particular letter had slid beneath the far right cupboard. Claire thought Drew had ignored her letter. Claire thought the feelings weren't mutual. Now Claire is leaving and Drew is passed out on the kitchen floor from last night's _try to forget Claire drunken escapades_ -- when he sees the letter beneath the cupboard. He reads the letter and begins crying. It is now 5:45am and Drew is trying to find his pants and keys, but what he cant remember is that last night he left his keys with a golden retriever.

Two weeks later, while eating, Drew will remember that last night he played fetch with a golden retriever outside a french restaurant at 3am. This is something you should not do, especially when your keychain has a small bouncy ball and the golden retriever is a professional ball thief.

It is now 6am and the living room looks like the aftermath of either a Pillowstown vs Blanketsburg war or a spontaneous couch explosion. Drew has given up on finding his keys and is trying to use the Uber app with one hand while eating a 2 day old muffin with the other. He drops the muffin, leaves it on the floor and rushes out the door. Cheese will pick up this muffin for breakfast later. Claire isn't answering texts. 6:30am and the Uber leaves with a Drew that forgot to put on deadorant. Still no reply. Drew remembers the 400 drunk texts he sent ranting about Chad and realizes that is probably it.

3am last night...

> omg you won't believe this golden outside La Food! he is playing fetch with my keys!

La Food, the same restaurant where she realized she loved him back in October. The same restaurant where she wrote him the note he ignored. It is 3am and Claire mutes Drew.

It is 7am and Drew is stuck in traffic in the passenger side of a Prius with an Uber driver that keeps talking about his education startup.

Don't worry Drew will make it. This is post 9/11 and Claire wont board for another 2 hours. One hour waiting in line next to some backpackers that haven't showered in 8 weeks and begin every sentence with "dude", 30 minutes of being groped by creepy TSA agents, 15 minutes paying for a $57 dollar sandwich, on her flight by 8:30. Don't you just love Dulles.

7:45am, the Uber arrives at the airport. A very smelly Drew has travelled 30 miles. For the first part of the trip, the average speed was 45mph. Then the sportsball team lost and the rest of trip was at an average speed of 5mph.

For how long did the Uber drive at each speed?

The problem with word problems is they are full of data you don't need. Unintentionally or intentionally written in a way that obscures what they are. If you were just given the distance, rate, and time it would be easy to solve. You learn to rewrite them, to pick them apart and quickly get what you need.

Interview puzzles are like word problems. Once you understand them they tend to be rather straightforward. The only reason they are hard is because the skills needed to pick apart an interview challenge are not the same ones you use to pick apart and breakdown a real world problem.

Let's take a typical challenge from Codility [Frog river one](https://codility.com/programmers/task/frog_river_one):

<blockquote>

A small frog wants to get to the other side of a river. The frog is currently located at position 0, and wants to get to position X. Leaves fall from a tree onto the surface of the river.

You are given a non-empty zero-indexed array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.

The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X. You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.

For example, you are given integer X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

Write a function:

def solution(x, a)

that, given a non-empty zero-indexed array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

If the frog is never able to jump to the other side of the river, the function should return −1.

For example, given X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
the function should return 6, as explained above.

Assume that:

N and X are integers within the range [1..100,000];
each element of array A is an integer within the range [1..X].

Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(X), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

</blockquote>

## 1. Don't Solve it. Describe the problem

Let's describe this problem in a way that is clearer.

> You have an unordered stack of numbers to go through. You can only cross the river when you have counted numbers in a sequence up to a specified number. To cross you must know where you stopped counting.
>
> For example, if you had the following numbers [1, 3, 1, 4, 2, 3, 5, 4] and you were counting to five, then six (your stack of numbers is zero indexed) would be the answer to cross the river.

When described this way the solution should come to you instantly. But don't solve it just yet.

## 2. Don't Solve It. Do it manually

Now that you have described the problem, you can write out a manual solution. Often but not always, this manual solution is already available to you in the problems description, you just need to rip it out. For example, our Frog Jump River problem is simply:

```ruby
x = 5
a = [1, 3, 1, 4, 2, 3, 5, 4]
```

Look through numbers `a` until every number up to and including 5 `x` has appeared; when this happens, record where the number was and use that to cross the river.

This is a very simple example. The more complex the case the more important this manual step will be. This step does two things;

1. It makes sure your math is right. In this case it is just a simple equal sign but it can be a lot more complicated.
2. It helps reveal the data structures you will need. In this example most of the data is decided for us, we only generate one new thing, an int. 

## 3. Solve... Kidding Don't Solve it yet either. Figure out the data structures

First let's work out the inputs. The data types of the inputs were given to us in the problem definition. We receive an int denoting the number we have to look for and an array of numbers to look through:

```elm
x : int
a : array
```

Now we need to work the structures for any state we accumulate. We need to hold a list of all the numbers we have seen. We can hold them in a set:

```elm
seen : Set
```

And finally our output; the number we use to cross:

```elm
position : int
```

## The solution

The solution should be obvious by now. We can write it in seconds:

```ruby
require 'set'
def solution(x, a)
  seen = Set.new
  a.each_with_index do |value, index|
    seen << value
    if seen.length == x
      return index
    end
  end

  return -1
end
```

[https://codility.com/demo/results/training3QJ39T-N2M/](https://codility.com/demo/results/training3QJ39T-N2M/)

tl/dr

1. Describe the problem
2. Do it manually
3. Figure out the data structures

This is the approach I'm using to tackle all my training for getting better at interview challenges. I have started a repo [interview-challenge-walkthroughs](https://github.com/k2052/interview-challenge-walkthroughs) where I document working through challenges in this exact way. Every challenge has a Markdown file where I describe the problem, manually solve it, work out the data structures and then finally arrive at a solution.

While there are a lot of interview puzzle solution resources out there, even dedicated blogs and sites to them; they all focus on the solution itself. They rarely cover how to arrive at the solution. They miss the most important part of interview challenges, the process leading up to the solution. The solutions are easy, the hard part is the solving. I think this gap is why being terrible at interviews is so common. We focus on mastering and practicing solutions instead of solving. Change a puzzle just slightly and most will be lost. But that is a subject for [another time](http://journal.2052.me/Im-Terrible-at-Interviews.html)
