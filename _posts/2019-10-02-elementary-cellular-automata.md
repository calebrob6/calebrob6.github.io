---
title: "Generating elementary cellular automata with Python"
date: 2019-10-02 00:00:00 -0800
permalink: /fun/2019/10/02/elementary-cellular-automata.html
tags:
  - fun
excerpt: ""
---

Cellular automata (CA) are discrete models defined by a _board_ and _transition function_.
In the simplest case, a _board_ is an array where cells can take on values '0' or '1' and a _transition function_ is a method that describes how the values of each cell on the board changes from one time step to the next.
Specifically, the _transition function_ will take the value of a cell and its two neighbors as input, and output the value of that cell at the next point in time.
An example of a (boring) _transition function_ is, "if the neighors of a cell are both '1' at time _t_, then the cell will take the value '1' at time _t+1_, else it will take the value '0'".
The transition function is applied to all cells on a board at the same time in order to move from one time step to the next.

If, as above, we simply consider 1D boards, cells with binary values, and transition functions that operate as a function of a cell and its immediate neighbor's values, then there are only 256 _possible_ transition functions.
These are called [elementary cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton).
Despite the simplicity of these rules, there exist elementary cellular automata that exhibit complex behavior - so much so that they are the main topic in Stephen Wolfram's 1200 page book ["A New Kind of Science"](https://www.wolframscience.com).
Some of the elementary CA rules have actually been shown to be capable of universal computation (that is, with carefully designed input boards, or initial states, you can perform arbitrary computations by just iterating according to one of the elementary cellular automata transition functions).
 
Science, new or old, aside, this blog post is simply about _simulating_ the elementary cellular automata using Python.
This is a fun excersise that results in some pretty cool looking pictures, but, more importantly, that demonstrates the wide range of possible extensions that can be explored (e.g. the reader can consider: can this be done in 2D, can this be done faster, what all can be computed with CA, can this be done in color, etc.).


[//]: # (e.g. can this be done in 2D, can this be done faster, what can we compute with CA, can we add color, etc.).

[//]: # Famous examples include [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), 

## The code

The following code can be run cell by cell in a Jupyter notebook. We start by doing some [magic](https://ipython.readthedocs.io/en/stable/interactive/magics.html) and importing the usual packages.

```python
%matplotlib inline
import numpy as np
import matplotlib.pyplot as plt
```

First, we implement the elementary CA _transition functions_ as lookup tables. These simply map the possible combinations of the states a cell and its two neighbors to the next value of the cellv. See [here](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) for more information about the mappings (i.e. what the rule `idx` defined below means).

```python
def get_rule(idx):
    if idx < 256:
        input_patterns = [
            (1,1,1),
            (1,1,0),
            (1,0,1),
            (1,0,0),
            (0,1,1),
            (0,1,0),
            (0,0,1),
            (0,0,0)
        ]
        outputs = list(map(int,format(idx, "#010b")[2:]))
        mapping = dict(zip(input_patterns, outputs))
        mapping["name"] = "Rule %d" % (idx)
        return mapping
    else:
        raise ValueError("Rule number out of range")
```


This method will perform one step on a given board according to a given rule. It assumes zero padding on the board's boundaries.
```python
def iterate(board, rule):
    board = np.pad(board, (1, 1), 'constant', constant_values=(0,0))
    new_board = np.zeros_like(board)
    for i in range(1, board.shape[0] - 1):
        new_board[i] = rule[tuple(board[i-1:i+2])]
    return new_board[1:-1]
```

Now that we have expressed rules and given a method to use a rule to move from one state to the next, we can make a helper function that wraps up the task of "permorming many iterations" nicely.
With elementary cellular automata, the information in an initial state can only propagate outwards at a rate of 1 cell per iteration, therefore this method pads the intial configuration with `num_iterations` zeros on each side of the `intial_board`.
This garuntees that our CA will have enough space to grow throughout the last iteration.
The method will return an array of size (`num_iterations + 1`, `len(initial_board) + 2*num_iterations`) where each row, _i_, is the output of the CA at timestep _i_.
```python
def generate_map(initial_board, rule, num_iterations=100):
    
    if isinstance(initial_board, list):
        board = np.array(initial_board)
    else:
        board = initial_board
    
    board = np.pad(board, (num_iterations, num_iterations), 'constant', constant_values=(0,0))
    
    rows = [board]
    for i in range(num_iterations):
        board = iterate(board, rule)
        rows.append(board)

    rows = np.array(rows)
    return rows
```

Finally, we create a simple method for visualizing the output of `generate_map`.
```python
def visualize_board(board, title=None):
    plt.figure(figsize=(5,2.5))
    plt.imshow(board, cmap="Greys")
    plt.axis("off")
    if title is not None:
        plt.title(title, fontsize=14)
    plt.show()
    plt.close()
```

## The results

Now that we have all the pieces, we can easily simulate the first 100 iterations of each of the 256 elementary cellular automata.
```python
for i in range(256):
    rule = get_rule(i)
    board = generate_map([0,1,0], rule, num_iterations=100)
    visualize_board(board, rule["name"]) 
```


![png](/assets/images/ca_simulator_files/ca_simulator_5_1.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_2.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_3.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_4.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_5.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_6.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_7.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_8.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_9.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_10.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_11.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_12.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_13.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_14.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_15.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_16.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_17.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_18.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_19.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_20.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_21.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_22.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_23.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_24.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_25.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_26.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_27.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_28.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_29.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_30.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_31.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_32.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_33.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_34.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_35.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_36.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_37.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_38.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_39.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_40.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_41.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_42.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_43.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_44.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_45.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_46.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_47.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_48.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_49.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_50.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_51.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_52.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_53.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_54.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_55.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_56.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_57.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_58.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_59.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_60.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_61.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_62.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_63.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_64.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_65.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_66.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_67.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_68.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_69.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_70.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_71.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_72.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_73.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_74.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_75.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_76.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_77.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_78.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_79.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_80.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_81.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_82.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_83.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_84.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_85.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_86.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_87.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_88.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_89.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_90.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_91.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_92.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_93.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_94.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_95.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_96.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_97.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_98.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_99.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_100.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_101.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_102.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_103.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_104.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_105.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_106.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_107.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_108.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_109.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_110.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_111.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_112.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_113.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_114.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_115.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_116.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_117.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_118.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_119.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_120.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_121.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_122.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_123.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_124.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_125.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_126.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_127.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_128.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_129.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_130.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_131.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_132.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_133.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_134.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_135.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_136.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_137.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_138.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_139.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_140.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_141.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_142.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_143.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_144.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_145.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_146.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_147.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_148.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_149.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_150.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_151.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_152.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_153.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_154.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_155.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_156.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_157.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_158.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_159.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_160.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_161.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_162.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_163.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_164.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_165.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_166.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_167.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_168.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_169.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_170.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_171.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_172.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_173.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_174.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_175.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_176.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_177.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_178.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_179.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_180.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_181.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_182.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_183.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_184.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_185.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_186.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_187.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_188.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_189.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_190.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_191.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_192.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_193.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_194.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_195.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_196.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_197.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_198.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_199.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_200.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_201.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_202.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_203.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_204.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_205.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_206.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_207.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_208.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_209.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_210.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_211.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_212.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_213.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_214.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_215.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_216.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_217.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_218.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_219.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_220.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_221.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_222.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_223.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_224.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_225.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_226.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_227.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_228.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_229.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_230.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_231.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_232.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_233.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_234.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_235.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_236.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_237.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_238.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_239.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_240.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_241.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_242.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_243.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_244.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_245.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_246.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_247.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_248.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_249.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_250.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_251.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_252.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_253.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_254.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_255.png){: .center-image }
![png](/assets/images/ca_simulator_files/ca_simulator_5_256.png){: .center-image }
