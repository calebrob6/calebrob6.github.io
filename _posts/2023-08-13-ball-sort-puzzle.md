---
title: "Solving a game called 'ball sort puzzle'"
date: 2023-08-13 00:00:00 -0800
permalink: /algorithms/2023/08/13/ball-sort-puzzle.html
tags:
  - algorithms
excerpt: ""
---
(note: the jupyter notebook for this post can be found [here](https://gist.github.com/calebrob6/ba9a39c6275990665362a27777b8efc9).)

My wife recently got stuck on level 80 of an online game called ["Ball Sort Puzzle"](https://www.xpgameplus.com/games/ballsort/index.html). Every level in this game involves a set of tubes filled with 4 colored balls each and some number of empty tubes, and the objective is to move the balls around such that each tube is filled with 4 balls of the same color. The rules are that you can only move the top-most ball in each tube, and you can only move a ball to the first open space in another tube as long as the ball below it is the same color (or the tube is empty). For example, in the screenshot of level 80, below, if we were to start by moving the first blue ball into the last tube, then moving forward we would only be able to move blue balls into the last tube (unless we moved all the blue balls away again for some reason).

![](/assets/images/ball_sort_puzzle.jpg)

The tricky part is finding the combination of moves that allow you to free up enough space to complete stacks of 4. Here, the search space increases quickly (the number of filled tubes \* the number of empty tubes)!

Luckily, we can formulate this as a graph search problem! This notebook does exactly that, AI for good if you will :).

``` python
import copy
```

## Setup the way we'll represent the game state

``` python
COLORS_TO_NUMBERS = {
    "blue": 0,
    "pink": 1,
    "orange": 2,
    "not green": 3,
    "not red": 4,
    "green": 5,
    "black": 6,
    "yellow": 7,
    "red": 8,
}

NUMBERS_TO_COLORS = {
    i: color
    for color, i in COLORS_TO_NUMBERS.items()
}

def convert_color_board_to_numbers(board):
    # We actually represent the game as a tuple of tuples to make it hashable
    return tuple([tuple([COLORS_TO_NUMBERS[color] for color in row]) for row in board])


def is_winning(state):
    for i in range(len(state)):
        if len(state[i]) > 0 and len(state[i]) != 4:
            return False
        elif len(state[i]) == 4:
            if not all(state[i][0] == color_index for color_index in state[i]):
                return False
    return True
```

## Encode level 80

``` python
board = [
    ["not green", "orange", "pink", "blue"],
    ["green", "not red", "not red", "not red"],
    ["black", "pink", "orange", "pink"],
    ["yellow", "black", "blue", "not green"],
    ["not green", "black", "orange", "yellow"],
    ["yellow", "black", "red", "not red"],
    ["blue", "green", "orange", "pink"],
    ["green", "red", "not green", "red"],
    ["green", "yellow", "blue", "red"],
    [],
    [],
]
board = convert_color_board_to_numbers(board)
```

``` python
# just to check
assert not is_winning(board)
```

``` python
assert is_winning([
    [i] * 4
    for i in range(9)
] + [[], []])
```

## Solve it - take 1

We encode the game as a graph where each node represents a state of the board, and directed edges represent valid moves to new board states. Naively -- we start our search from the starting state, then perform a depth first search and check to see if we have solved the puzzle at each node. Importantly, we keep track of a global set of visited states, and do not traverse edges in this set -- this prevents the search from infinitely moving a ball back and forth between two empty tubes.

We implement the DFS in an iterative way using a stack, and push game states with a short text description of the edges taken to get to that state so that we can easily print out the steps needed to solve the puzzle when we find the solution.

``` python
def generate_neighbors(state):
    candidate_rows = []
    for i in range(len(state)):
        if len(state[i]) < 4:
            if len(state[i]) == 0:
                candidate_rows.append((i, -1))
            else:
                candidate_rows.append((i, state[i][-1]))

    for i in range(len(state)):
        if len(state[i]) > 0:
            color_index = state[i][-1]
            for j, dst_color_index in candidate_rows:
                if j != i and (color_index == dst_color_index or dst_color_index == -1):
                    new_state = [
                        [k for k in row] for row in state
                    ]
                    new_state[i].pop()
                    new_state[j].append(color_index)

                    new_state = tuple(tuple(row) for row in new_state)
                    yield new_state, f"move {NUMBERS_TO_COLORS[color_index]} from {i} to {j}"
```

``` python
frontier = [[board, []]]
seen_states = set()
seen_states.add(board)

i = 0
while True:
    if len(frontier) == 0:
        print("No solution found")
        break
    state, history = frontier.pop()
    if is_winning(state):
        print(f"Solution of size {len(history)} found in {i} iterations")
        break
    else:
        for neighbor, text_description in generate_neighbors(state):
            if neighbor not in seen_states:
                new_history = copy.deepcopy(history) + [text_description]
                frontier.append([neighbor, new_history])
                seen_states.add(neighbor)
    i += 1
```

> Solution of size 452 found in 773 iterations

452 moves to get to the solution! wow this must be a hard puzzle...

``` python
history[:5]
```

<blockquote>
     ['move red from 8 to 10',<br/>
     'move blue from 8 to 9',<br/>
     'move red from 7 to 10',<br/>
     'move yellow from 4 to 8',<br/>
     'move not green from 3 to 7']<br/>
</blockquote>

Much to my wife's amuesement, the "computer" here spends a *lot* of time moving stacks of balls from one empty tube to another.

``` python
history[22:28]
```

<blockquote>
     ['move blue from 10 to 9',<br/>
     'move blue from 10 to 9',<br/>
     'move blue from 10 to 9',<br/>
     'move not green from 4 to 10',<br/>
     'move not green from 4 to 10',<br/>
     'move not green from 4 to 10']<br/>
</blockquote>

While our solution prevents the search from looping back to game states it has already visited, with 9 colors and 11 tubes there is a lot of room for superfluous moves that the depth first search will happily take.

## Solve it - take 1.5

We can always switch to a breadth first search by switching `frontier` to a `collections.deque` and changing `.pop()` to `.popleft()`. While this finds a solution in 38 moves (if I'm remembering correctly), it takes over 9 million iterations and \>10 minutes to get there. That's not satisfying at all.

## Solve it - take 2

For the final solution, we stick with a DFS, however represent nodes in our set of "seen" nodes in permutation invariant way. As an example, if there are two board configurations that are identical except in one there is a stack of blue balls in the second to last tube, while in the other the stack of blue balls is in the last tube, then these representations should be seen as equivalent when we are considering "seen" nodes.

We implement this trivially by storing sorted representations of the board state in the set of "seen" nodes, and checking whether the sorted version of an expanded node is in this set. In the example above, both board states with the stack of blue balls would be the same after sorting (as the board state is a tuple of tuples where each color is represented by a different number).

``` python
frontier = [[board, []]]
seen_states = set()
seen_states.add(tuple(sorted(board)))

i = 0
while True:
    if len(frontier) == 0:
        print("No solution found")
        break
    state, history = frontier.pop()
    if is_winning(state):
        print(f"Solution of size {len(history)} found in {i} iterations")
        break
    else:
        for neighbor, text_description in generate_neighbors(state):
            sorted_neighbor = tuple(sorted(neighbor))
            if sorted_neighbor not in seen_states:
                new_history = copy.deepcopy(history) + [text_description]
                frontier.append([neighbor, new_history])
                seen_states.add(sorted_neighbor)
    i += 1
```

> Solution of size 65 found in 381 iterations

This change shortens the found solution from 452 to 65 steps. While this isn't the shortest possible solution, it only takes a few minutes to follow :)

``` python
history
```

<blockquote>
     ['move red from 8 to 9',<br/>
     'move blue from 8 to 10',<br/>
     'move red from 7 to 9',<br/>
     'move yellow from 4 to 8',<br/>
     'move not green from 3 to 7',<br/>
     'move blue from 10 to 3',<br/>
     'move not green from 7 to 10',<br/>
     'move not green from 7 to 10',<br/>
     'move red from 9 to 7',<br/>
     'move red from 9 to 7',<br/>
     'move blue from 3 to 9',<br/>
     'move blue from 3 to 9',<br/>
     'move blue from 0 to 9',<br/>
     'move pink from 6 to 0',<br/>
     'move orange from 4 to 6',<br/>
     'move black from 4 to 3',<br/>
     'move not green from 4 to 10',<br/>
     'move black from 3 to 4',<br/>
     'move black from 3 to 4',<br/>
     'move yellow from 3 to 8',<br/>
     'move pink from 2 to 3',<br/>
     'move orange from 6 to 2',<br/>
     'move pink from 0 to 3',<br/>
     'move pink from 0 to 3',<br/>
     'move orange from 2 to 6',<br/>
     'move orange from 2 to 0',<br/>
     'move orange from 6 to 0',<br/>
     'move pink from 2 to 3',<br/>
     'move black from 2 to 4',<br/>
     'move orange from 6 to 2',<br/>
     'move orange from 0 to 2',<br/>
     'move orange from 0 to 2',<br/>
     'move orange from 0 to 2',<br/>
     'move not green from 0 to 10',<br/>
     'move yellow from 8 to 0',<br/>
     'move yellow from 8 to 0',<br/>
     'move yellow from 8 to 0',<br/>
     'move green from 8 to 6',<br/>
     'move red from 7 to 8',<br/>
     'move red from 7 to 8',<br/>
     'move red from 7 to 8',<br/>
     'move green from 7 to 6',<br/>
     'move not red from 5 to 7',<br/>
     'move red from 8 to 5',<br/>
     'move not red from 1 to 7',<br/>
     'move not red from 1 to 7',<br/>
     'move red from 5 to 8',<br/>
     'move red from 5 to 8',<br/>
     'move not red from 7 to 1',<br/>
     'move black from 5 to 4',<br/>
     'move not red from 7 to 1',<br/>
     'move yellow from 5 to 0',<br/>
     'move not green from 10 to 5',<br/>
     'move not green from 10 to 5',<br/>
     'move not red from 1 to 7',<br/>
     'move not red from 1 to 7',<br/>
     'move not green from 5 to 10',<br/>
     'move not green from 5 to 10',<br/>
     'move blue from 9 to 5',<br/>
     'move not red from 1 to 7',<br/>
     'move green from 6 to 1',<br/>
     'move green from 6 to 1',<br/>
     'move green from 6 to 1',<br/>
     'move blue from 5 to 9',<br/>
     'move blue from 6 to 9']<br/>
</blockquote>

