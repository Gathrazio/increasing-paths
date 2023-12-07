let exampleGrids = [
                    [[1, 4],
                    [5, 2]],

                    [[2, 4, 5],
                     [3, 10, 12],
                     [1, 1, 2]],

                    [[233, 1243, 1, 54, 453, 34],
                     [43, 6523, 123, 2, 4, 493],
                     [432, 122, 94, 11, 0, 3],
                     [222, 32, 68, 999, 1023]],

                     [[56931, 7358, 30212, 62096, 13485, 52317, 39013, 30288, 54474, 18492, 20123, 61469],
                      [51433, 9324, 55861, 53922, 18893, 24242, 42002, 34385, 64655, 1041, 34074, 51565],
                      [54428, 47174, 18783, 12261, 45518, 3833, 13168, 52153, 137, 42625, 56346, 38729],
                      [33932, 10775, 17896, 11230, 63847, 39359, 24197, 38215, 21551, 1667, 33530, 52526],
                      [21734, 12497, 9122, 45395, 2414, 14557, 56099, 3623, 43816, 10067, 51173, 5610],
                      [40319, 45643, 1126, 42540, 14911, 22861, 56138, 20441, 56568, 62565, 6558, 50163],
                      [34017, 59004, 41020, 24915, 22584, 45962, 40041, 10058, 34403, 3046, 11895, 11200],
                      [35176, 23530, 2221, 52607, 39224, 64037, 44443, 46472, 31393, 1424, 12046, 34439]]
                    ]

// Path: A sequence of two or more elements of a matrix where each element is directly adjacent to its neighbors in an either horizontal or vertical fashion.
// Increasing Path: A path where the sequence is increasing. I.e., for a {x_1, x_2, ..., x_j, ..., x_n}, x_{j-1} < x_j < x_{j+1}.


/*

recursiveDetermination tallies the number of paths that start at the (row, column)th entry of grid.

The idea is that there are 9 archetypal locations in any grid, with syntax {vertical} location {horizontal} location:

top left (TL)
top middle (TM),
top right (TR),
middle left (ML),
middle middle (MM),
middle right (MR),
bottom left (BL),
bottom middle (BM),
bottom right (BR)

as a visual reference, see below:


[[TL, __, TM, __, TR],
 [__, __, __, __, __],
 [ML, __, MM, __, MR],
 [__, __, __, __, __],
 [BL, __, BM, __, BR]]


recursiveDetermination classifies a (row, column)th entry as one of these nine archetypal locations and, if an adjacent element is found to be larger than said (row, column)th entry, it adds to the path total by 1 + (a call of itself on the next element in the Increasing Path). The addition of 1 comes from the fact that a discovery of a larger adjacent element either starts an Increasing Path or increases the length of a previously existing Increasing Path by 1; in both instances, the number of Increasing Paths increases by 1. If no adjacent element is found to be larger than said (row, column)th entry, recursiveDetermination will return zero as there are no more Increasing Paths to be found starting from the (row, column)th entry.
*/

const checkElement = (direction: "top" | "bottom" | "left" | "right", grid: number[][], row: number, column: number, currentElement: number, adjacentElement: number): number => {
    if (adjacentElement > currentElement) { // if the adjacent element to the top is bigger than the current element
        switch (direction) {
            case "top":
                return 1 + recursiveDetermination(grid, row - 1, column);
            case "bottom":
                return 1 + recursiveDetermination(grid, row + 1, column);
            case "left":
                return 1 + recursiveDetermination(grid, row, column - 1);
            case "right":
                return 1 + recursiveDetermination(grid, row, column + 1);
        }
    } else {
        return 0;
    }
}

const recursiveDetermination = (grid: number[][], row: number, column: number): number => {
    const currentElement = grid[row][column];
    let elementAnchorTotal = 0;

    if (row === 0 && column === 0) { // Archetypal location 1: TL, top left
        // naturally has two potential adjacent elements: bottom and right
        // checking element to the bottom
        elementAnchorTotal = checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
        // checking element to the right; return result
        return elementAnchorTotal += checkElement("right", grid, row, column, currentElement, grid[row][column + 1]);
    }

    if (row === 0 && column > 0 && column < grid[0].length - 1) { // Archetypal location 2: TM, top middle
        // naturally has three potential adjacent elements: left, bottom, and right
        // checking element to the left
        elementAnchorTotal = checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
        // checking element to the bottom
        elementAnchorTotal += checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
        // checking element to the right; return result
        return elementAnchorTotal += checkElement("right", grid, row, column, currentElement, grid[row][column + 1]);
    }

    if (row === 0 && column === grid[0].length - 1) { // Archetypal location 3: TR, top right
        // naturally has two potential adjacent elements: bottom and left
        // checking element to the bottom
        elementAnchorTotal = checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
        // checking element to the left
        return elementAnchorTotal += checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
    }

    if (row > 0 && row < grid.length - 1 && column === 0) { // Archetypal location 4: ML, middle left
        // naturally has three potential adjacent elements: top, right, and bottom
        // checking element to the top
        elementAnchorTotal = checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the right
        elementAnchorTotal += checkElement("right", grid, row, column, currentElement, grid[row][column + 1]);
        // checking element to the bottom
        return elementAnchorTotal += checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
    }

    if (row > 0 && row < grid.length - 1 && column > 0 && column < grid[0].length - 1) { // Archetypal location 5: MM, middle middle
        // naturally has four potential adjacent elements: top, bottom, left, right
        // checking element to the top
        elementAnchorTotal = checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the bottom
        elementAnchorTotal += checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
        // checking element to the left
        elementAnchorTotal += checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
        // checking element to the right
        return elementAnchorTotal += checkElement("right", grid, row, column, currentElement, grid[row][column + 1]);
    }

    if (row > 0 && row < grid.length - 1 && column === grid[0].length - 1) { // Archetypal location 6: MR, middle right
        // naturally has three potential adjacent elements: top, left, bottom
        // checking element to the top
        elementAnchorTotal = checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the left
        elementAnchorTotal += checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
        // checking element to the bottom
        return elementAnchorTotal += checkElement("bottom", grid, row, column, currentElement, grid[row + 1][column]);
    }

    if (row === grid.length - 1 && column === grid[0].length - 1) { // Archetypal location 7: BL, bottom left
        // naturally has two potential adjacent elements: top, left
        // checking element to the top
        elementAnchorTotal = checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the left
        return elementAnchorTotal += checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
    }

    if (row === grid.length - 1 && column > 0 && column < grid[0].length - 1) { // Archetypal location 8: BM, bottom middle
        // naturally has three potential adjacent elements: left, top, right
        // checking element to the left
        elementAnchorTotal = checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
        // checking element to the top
        elementAnchorTotal += checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the right
        return elementAnchorTotal += checkElement("right", grid, row, column, currentElement, grid[row][column + 1]);
    }

    if (row === grid.length - 1 && column === grid[0].length - 1) { // Archetypal location 9: BR, bottom right
        // naturally has two potential adjacent elements: top, left
        // checking element to the top
        elementAnchorTotal = checkElement("top", grid, row, column, currentElement, grid[row - 1][column]);
        // checking element to the left
        elementAnchorTotal += checkElement("left", grid, row, column, currentElement, grid[row][column - 1]);
    }
    // else there are no more increasing paths to be found for the current element, so we return 0
    return 0;
}

const findIncreasingPaths = (grid: number[][]): number => {
    let runningTotal = 0;
    for (let i = 0; i < grid.length; i++) { // row i
        for (let j = 0; j < grid[0].length; j++) { // column j
            // grid[i][j] is the (i, j)th entry of the matrix
            // recursiveDetermination tallies the number of paths that start at the (i, j)th entry of grid
            runningTotal += recursiveDetermination(grid, i, j);
        }
    }
    // after recursively tallying the number of Increasing Paths that correspond to each (i, j)th entry of grid and summing them into runningTotal, we return the result
    return runningTotal;
}

exampleGrids.forEach(grid => {
    console.log("Grid:", grid)
    console.log("Number of Increasing Paths:", findIncreasingPaths(grid))
})