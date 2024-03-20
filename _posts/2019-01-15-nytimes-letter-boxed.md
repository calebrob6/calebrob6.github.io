---
title: "Solving NYTimes 'Letter Boxed' puzzles"
date: 2019-01-15 00:00:00 -0800
permalink: /algorithms/2019/01/15/nytimes-letter-boxed.html
tags:
  - algorithms
---

## The Game

The NYTimes has a fun new puzzle game called ['Letter Boxed'](https://www.nytimes.com/puzzles/letter-boxed). The rules of the game (copied mostly verbatim) are as follows:
- Connect letters to spell words
- Words must be at least 3 letters long
- Letters can be reused
- Consecutive letters cannot be from the same side
- The last letter of a word becomes the first letter of the next word
- Use all letters to solve!

![png](/assets/images/letter_boxed.png){: .center-image }
For example.
{: style="color:gray; font-size: 120%; text-align: center;"}

In the above example puzzle, THY > YES > SINCE would be a valid sequence of words, but THY > SINCE would not (as the last letter of THY doesn't match the first letter of SINCE). BET would not be a valid word, as "B" and "E" are consecutive letters from the same side of the box. Etc.

## The Solution

This game is addicting. After spending way too long coming up with an unsatisfactory 5 word solution to my first puzzle, only to hear that a two word solution was possible (!), I decided to cut my future time losses and game the game. The rest of this post details my method for enumerating the possible solutions for a given puzzle instance 😈.


### Step 1 - Word list and Trie

First, we need a giant list of words. I'm unsure which words are accepted in the actual game, but I'm using a 276,519 word Scrabble wordlist that can be download [here](https://drive.google.com/file/d/0B9-WNydZzCHrdDVEc09CamJOZHc/view). The game will only accept words that are "at least 3 letters long", so we can filter out one and two letter words up front.

```python
f = open("words.txt", "r")
words = f.read().strip().split("\n")
words = [word.lower() for word in words if len(word)>2]
f.close()
```

In Step 2 we will need to enumerate all possible words that we can make using a given box, meaning we will need to ask "is this string the beginning of a valid word (which we will call a "prefix")?" a bunch of times. Given a query string, a really slow way to do this would be to iterate through each word in our wordlist and check to see if our query string fits the beginning of that word. A much much faster way to do this is to create a [Trie](https://en.wikipedia.org/wiki/Trie) data structure from our wordlist!

```python
class Trie(object):
    
    def __init__(self, words=None):
        self.trie = dict()
        if words is not None:
            for word in words:
                self.add(word)
        
    def add(self, word):
        current_position = self.trie
        for c in word:
            if c not in current_position:
                current_position[c] = dict()
            current_position = current_position[c]
        current_position["done"] = True
        
    def query(self, word):
        current_position = self.trie
        for c in word:
            if c in current_position:
                current_position = current_position[c]
            else:
                return -1
        if "done" in current_position:
            return 1
        else:
            return 0
```

We can add all of the words from our wordlist to a new Trie instance easily:

```python
trie = Trie(words)
```

Now, `trie.query(word)` will return:
- -1 if `word` is not in our wordlist and is not a prefix of any word in our wordlist
- 0 if `word` is a prefix of some words in our wordlist
- 1 if `word` is a word in our wordlist (and possibly a prefix to a longer word!)


### Step 2 - Enumerate the possible words for a given puzzle

Brute force it... with some intelligence!

To enumerate all the possible words for a given puzzle we start with one of the letters, then check to see if we can add any other valid letter to make a new word or word prefix. If we find a valid word or word prefix, then we need to recursively check if we can add any new valid letter to it, etc.

```python
def do_search(current_face, current_word):

    for face in range(4):
        if face != current_face:
            for c in faces[face]:
                val = trie.query(current_word+c)
                if val == 1:
                    possible_words.append(current_word+c)
                    do_search(face, current_word+c)
                elif val == 0:
                    do_search(face, current_word+c)
```

The above method will sloppily add all of the valid words it finds to `possible_words`, a global list defined below.

```python
faces = [
    ["t","j","o"],
    ["f","e","b"],
    ["c","u","y"],
    ["h","i","l"]
]

all_letters = set([letter for face in faces for letter in face])

possible_words = []
for i in range(4):
    for c in faces[i]:
        print("Searching for", c)
        do_search(i, c)
```

This search is very fast, on the example problem it takes 37.0ms on my laptop, and returns 399 valid words. Some fun samples you may want to play in your next scrabble game include: outbitch, biolytic, or locofoco.

### Step 3 - Graph representation

Now that we have a moderately sized list of possible words we can make on our letter box, we want to know the shortest sequence of valid words that we can play, which also use all the letters! To do this we will use another helpful data structure, the directed graph! (Note: this requires the [networkx](https://networkx.github.io/) library.)

```python
import networkx as nx

G = nx.DiGraph()
```

We first create a node for each of the valid words we found, then create edges between each pairs of nodes $$(u,v)$$ in which $$u$$ ends with the same letter that $$v$$ starts with.

```python
for u in possible_words:
    for v in possible_words:
        if u != v:
            if u[-1] == v[0]:
                G.add_edge(u,v)
```

### Step 4 - Enumerate solutions

With the directed graph we just made, any path will be a valid sequence of words that we can play in the game. To enumerate the solutions we simply have to look for simple paths (paths in which a node is not repeated) whose nodes jointly contain all the letters in the game. The [networkx](https://networkx.github.io/) python library makes this trivial!

```python
for u in possible_words:
    for v in possible_words:
        if u != v:
            for path in nx.all_simple_paths(G, u, v, 3):
                if len(all_letters - set(''.join(path))) == 0:
                    if len(path) < 4:
                        print(path)
```

The above code will (eventually) spit out all of the possible solutions. We can use this to reasonably conclude that there is indeed only a single two word solution for the original problem in the example: `['objectify', 'youthful']`. If instead you got `['jib', 'boyf', 'futchel']`, you may want to look into competitive Scrabble.



As always, I love feedback! Any questions, comments, or suggestions can be directed to my email (see page footer).
