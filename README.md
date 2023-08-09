# Hack GitHub Contributions Graph

This Repo Contains Program To Hack GitHub Contributions Graph And Fill The Empty Days.

I did it for fun so be cool! 😎

## Before You Start

You need to have [Node.js](https://nodejs.org/en) installed on your machine if you havn't installed it already.

In order to run this program for your benefits, you need to change these variables to fits your needs.

`startDate, endDate, commitsPerDay, timeBetweenCommits` : on lines `6, 7, 8 and 9`.

I left comments on each line to explain what they do.

## How To Use:

Run the following command:

    npm start

And that's it!

## Notes:

I didn't cover edge cases or handled errors, it's just a simple program that works as expected, if you gonna modify it, you might find bugs and may lead to unexpected behavior, so be careful.

There is strange behavior I noticed, when I make long period like years, the graph will be empty, I found that github only counts the last 50 days when I add 20 commit per day, so we can say roughly it added the last 1000 commit if there is more than commit at once, so the solution for that we can use short periods like month or 40 days with the same amount of commits 20 per day, I didn't test it yet with little commits per day like 1 or 2 and long periods to test my theory that it only work for the last 1000 commit no matter how many days, but this is what I found so far, so good luck hacking your owm graph I already hacked mine.
