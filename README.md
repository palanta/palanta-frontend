# Palanta
<i>A Visual Programming Language for Paleography</i>

## Usage
### Prerequisites
- Node.js package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Quasar](https://quasar.dev/) framework
### Running for development
1. Install dependencies:  
`npm install`
1. Run development server:  
`quasar dev`
### Building for production
1. Install dependencies:  
`npm install`
1. Build for deployment:  
`quasar build`

## Design
### Introduction
*Paleography* (or *Palaeography*, in British English) is the study of
ancient handwriting, that is, the writing itself and not its contents.
The word "paleography" comes from the Greek words *palaiós*, which means
"old", and *graphein*, which means "to write". Many documents containing
such writing exist, and they are often digitized. This is because, while
investigating the original document in its physical form seems
appropriate, a digital examination on the scanned form is more
convenient and efficient in most cases. Humanists can work on digital
manuscripts without occupying or damaging the original.\
Paleographers spend a lot of time and effort studying historical
documents. This equates to human labor which may be avoidable, e.g.
through the use of computer programs.

Textual programming languages have been an active field of research ever
since the invention of the first computer. Many advancements have been
made to aid the creation of faster or more complex programs. For
example, *object orientation* is used to make the code more structured
and easier to understand for the software developer by managing
cognitive load. However, fundamental algorithmic thinking, as well as an
in-depth understanding of different programming languages and libraries,
require years of practice. For a researcher (e.g. a paleographer)
without a computer science background, gathering this knowledge is often
infeasible, even though creating a computer program specifically
designed to help with their task could greatly increase their
productivity.

This is where visual programming languages excel. They can provide the
user with a simple, intuitive, visual interface that provides exactly
the tools they need for their abstract algorithm. They can be learned
quickly, even by someone without programming knowledge, and are able to
solve complex problems with little prior effort.\
In this document, we introduce Palanta, a new visual programming
language specifically designed for the analysis of historical
handwriting. Palanta provides a simple working environment where
humanists can create powerful algorithms for analyzing scanned
manuscripts without overwhelming complexity or the need for advanced
experience in computer science.

### Domain Requirements
Paleography is all about image and text processing. Usually, images are
taken on-site and then transformed and translated manually into digital
text. However, not everything found in the picture is always important.
Some text might be indecipherable or not relevant for the current
analysis process, so it must be possible to specifically include or
exclude parts of the processed image in order to reduce the workload.
When multiple images are taken in the same context, there has to be a
way to apply a certain set of actions repeatedly over a set of images,
so the user does not have to waste time on performing a set of actions
over and over again. In general, there is no fixed procedure that will
work for every use-case. That means operations must be freely applicable
and transformable to suit the current needs. The next sections explain
how these requirements are represented in Palanta.

### Nodes
The primary visual primitive in Palanta is a node. Nodes act as the core
components of the VPL. It is where data is processed and brought to the
next step so that the next node can build upon its output and thus
directly represent real-world actions usually done manually by humans.\
The interactions between multiple nodes are realized using edges that
transport data unidirectionally between two nodes. Edges connect to
input and output connectors on the nodes and, like them, have a certain
data type that they carry. This allows for clarity in the design process
and helps reduce errors while creating the program.\
Every node provides an interface on its surface for tweaking
node-specific settings. The node body might be empty for certain nodes
and may also be manually minimized on every node.\
The following nodes are required.

#### Values
Value nodes are nodes representing a single value. This may be an image
from a file, a number, some text, a color, a boolean or likewise. They
have no inputs and typically a single output to then be sent further
into the program to be processed. The value to be output can be selected
on the node itself via a file selector, slider, switch, text input field
or color picker.

#### Mathematics, text mutation & comparisons
Palanta offers a variety of different nodes to perform mathematical
operations like addition and multiplication of numeric values. These
allow a variant amount of inputs. More complex functions like *abs*,
*sine* or *square root* are also available. A user is able to create
large formulas by combining several nodes.\
Similarly, text can be processed with nodes like *Concatenate Text*,
*Lowercase Text*, and *Reverse Text*. Using the *Split Text* node, Text
may also be split at separator characters into a Text Bundle.\
Nodes like *Greater Than* or *Equal To* compare the numerical inputs and
output an appropriate boolean value.

#### Grouping
Palanta includes a structuring node, called *Group*. A Group can be seen
as an individual program that in itself contains a collection of
connected nodes. In each Group, there is a special Input and a special
Output node used to define the containing Group node's inputs and
outputs.\
Group nodes appear on the canvas as an opaque, self-contained node and
may be expanded to inspect and edit their functionality. Group nodes can
be saved as templates to appear in the tool palette for being used
multiple times.\
This allows nesting and encapsulation of functionality to cope with
complexity, prevent canvas cluttering and encourage code reuse.

<img src="https://user-images.githubusercontent.com/31693992/70633834-77605a80-1c31-11ea-801b-669a573a665a.png" width="100%" />
<p align="center"><i>Example view of a nested Group canvas</i></p>

#### Bundles & Loops
Of each basic data type (image, text, number, ...) there may also be
values representing sets of such. In Palanta, these are called Bundles.
Bundles only contain elements of a single type and can be of any size,
even empty. An example of a Bundle is a set of images loaded from a
directory.\
Two or more Bundles can be combined using the *Merge* node.\
For processing bundles, a special type of group node is available: Loop.
This node acts similarly to a Group node in the sense that it
encapsulates a nested process and provides a separate canvas for
editing. However, a Loop only allows a single input of the type that the
bundle contains and a single output which is then rebundled after
processing each element of the input Bundle. More inputs may be added to
the Loop interface, but these are just passed through as constants
instead of being unpacked and iterated like the first input. In the case
where a single Loop iteration outputs a Bundle type, all output Bundles
are collapsed and merged together for the Loop output, meaning there are
no Bundles of Bundles. When opening the Loop node, a debug preview
element can be selected from the input bundle on the *Loop Input* node
for use in computations and previews. This selection has no side effects
beyond the scope of the Loop Group itself.

#### Conditionals
There are several nodes related to conditional logic.\
A *Conditional Select* node evaluates the boolean value of an input to
then select one of its additionally provided inputs as its output
depending on the value of the conditional.\
*Filter* nodes act similarly to Loops, in that they take a Bundle as an
input, can be expanded by the user like Groups, and process each element
in the Bundle individually. Unlike Loops however, the output value of
each iteration must be boolean, indicating whether or not the element
should remain in the Bundle. The Filter node then outputs a Bundle of
only the remaining elements.

#### Image Analysis & Processing
Nodes for image analysis and processing methods are predefined and
shipped by default.\
Basic nodes like the *Image Width* or *Image Height* offer a quick and
simple way to extract information out of input images.\
Nodes for image analysis like segmentation (*Line Extraction*, *Image
Extraction*), *Optical Character Recognition* (OCR), and *Feature
Extraction* are also provided. A Segmentation node would output an image
Bundle, representing all the identified segments of a single input
image.\
Processing methods include *Binarization*, *Otsu*, *Gaussian Blur* and
color operations. As an example, the Binarization node takes an image as
well as a threshold (i.e. a number between 0 and 1) as its input. The
output value is then a black and white binarized version of the original
image, based on the threshold.

#### Preview
A *Preview* node is a node that has one input of any type and no
outputs. It provides the user with a visual representation of the input
data. For example, if the input type is a single image, said image is
displayed on the node's surface. Similarly, numbers or text can be
displayed. Bundle inputs can be cycled through by the user to view each
element in the bundle. This allows peeking into a processing flow at any
point. Since any number of Preview nodes may be present on the canvas,
results of different branches or steps are comparable. This way,
previewing values for debugging and testing is made easy and fast.\
Another feature of the Preview node is the ability to export its current
input. A bundle of images from anywhere in the program could therefore
be saved to a folder with the help of this node.

#### Notes
Aside from interconnected nodes, Palanta also provides a node for the
purpose of commenting. *Note* nodes can be placed anywhere on any layer
without the need for further visual relations as they do not have any
in- or output. Their body consists only of a text field in which remarks
can be written down in order to create a helpful annotation.

### Visual Representation
The nodes are placed and resizable on a grid so that the appearance is
clean and establishing connections between nodes is simple. A toolbar on
the left comprises a selection of existing nodes to use. From there,
nodes can simply be drag-and-dropped on the said grid. The nodes'
representation consists of a card on which the name accompanied by a
suitable icon, it's in- and output names, as well as buttons and text
boxes, are displayed. Such buttons provide certain functionality, like
the possibility to save a Preview node's input. Text boxes serve to type
in certain data like a file path or a number for a Value node. To view a
Group node's structure, a click on the *inspect* button causes the
canvas to switch to the underlying layer, where a path is displayed on
top for easy navigation between layers.\
Inputs and outputs are represented by a circle whose color portraits the
data type. In case of an input, the circle is placed on the left side of
the input name, otherwise, it is placed on the right side. When two
nodes are connected through their in- and outputs, a line of the same
color forms between the circles. One output can connect to more than
just one input. When an in- or output is not connected, it's circle
remains hollow. For Bundles, on the other hand, the circle also contains
a small horizontal gap. A single line between two nodes symbolizes the
transmission of a single value, while the transmission of a Bundle is
shown as two intertwined lines. To prevent mistakes, a connection
between nodes only forms when the respective data types match.\
Palanta's dark theme consists of dark grey colors for the background and
the nodes and light grey colors for text and icons. The darker colors
spare the eyes when working with Palanta and also accentuate the bright
colored lines between the nodes.

<img src="https://user-images.githubusercontent.com/31693992/70634225-23a24100-1c32-11ea-9175-474947064c98.png" width="100%" />
<p align="center"><i>Demonstration of connected and disconnected nodes, as well as the node toolbox</i></p>

### Language Analysis
Due to its domain and audience requirements we have designed Palanta to
be of rather limited scope and very high language level. Internal
functionality, and even custom defined Groups, are encapsulated and
abstracted away from the user. Furthermore, all frequently used document
processing functionality is delivered as single predefined nodes.

Data representation complexity is kept to a minimum whilst fulfilling
sophisticated needs like Bundles for operating on multiple data and
implicit parsing and display of document data structures.\
Palanta employs the graph-based data-flow paradigm and has a level 4
liveness. Each change leads to an immediate update of all referencing
uses. This includes adding or removing nodes, changing interconnection
of nodes and tweaking parameters. Loops are also executed and their
Bundle output is computed for being used directly.

### Discussion
Palanta was intentionally designed without Turing-completeness in order
to reduce its complexity and aid users without a programming background.
It does however reduce its capabilities accordingly as well.

The aforementioned high liveness and data-flow paradigm remove the
necessity of an algorithmic thought process, while still allowing the
user to create complex, reusable programs.\
Data-flow graphs may contain a lot of nodes. To enable code reuse and to
reduce cluttering of the screen and cognitive load, Palanta offers
grouping. Note however, that Groups add a level of indirection to the
program.

No error handling is required, as the language only allows user
operations that result in a valid program. This makes it easy to
comprehend. It does mean however, that some nodes like List Reference
were not included in the specification, even though it may be useful in
certain scenarios, simply because it could result in errors.\
The grid layout was chosen over free form node positioning and sizing to
allow for aesthetically pleasing programs with congruent spacing.

The amount of data types is kept to a minimum and Bundles of Bundles are
automatically collapsed. While complex data types can be useful for an
experienced individual, they may not offer the same value for a beginner
and instead result in a steep learning curve.
