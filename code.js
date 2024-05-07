/*
    Keifer Buss 
    COSC-3020-01 
    Last modified May 06 2024
    Sources: None for this program
*/

function tsp_ls(distance_matrix) {
    // Base cases
    if (distance_matrix.length <= 1) return 0;
    if (distance_matrix.length === 2) {
        return Math.min(distance_matrix[0][1], distance_matrix[1][0]);
    }

    var n = distance_matrix.length;

    var sequence = [];
    var min_value = Infinity;
    var temp;

    sequence = gen_seq_arr(n)

    // Quick and dirty randomization of sequence array
    for (var j = 0; j < n; j++) {
        swap_elements(sequence, Math.floor(Math.random() * n), Math.floor(Math.random() * n))
    }

    let i = 0;
    let k = 2;
    let prev = null;
    let attempts = 0;

    // Stops when attempts get too high in polynomial time
    while (attempts < (n ** 4)) {
        attempts++;
        temp = calc_dist(distance_matrix, sequence);
        if(temp < min_value) {
            min_value = temp;
        }

        // Swapping algorithm below (quick and dirty randomization)
        k = Math.floor(1 + Math.random() * (n - 1));

        // Preventing undoing of last swap
        if (prev === k) {
            if (k === 1) {
                k++;
            } else {
                k--;
            }
        }
        
        /* 
        What I decided for i and k were for i to be fixed while k is chosen randomly, ignoring the previous and ith element. 
        If i and k were both randomly determined, there would exist a chance for i and k to land on the same spot,
        and I would prefer to avoid generating i and k at a possible T(infinity) time in a while loop.
        This could be more efficient in memoization at the cost of greater memory usage since there exists n! permutations
        */
        swap_elements(sequence, i, k);
        prev = k
    }

    return min_value;
}

// Calculates distance from the sequence
function calc_dist(distance_matrix, sequence) {
    var accum = 0;
    for (var i = 1; i < sequence.length; i++) {
        accum += distance_matrix[sequence[i - 1]][sequence[i]]
    }
    return accum;
}

// Pretty self-explanatory swap function for an array
function swap_elements(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    return;
}

// Generates a sequential array up to a limit n, then returns a copy of that array
function gen_seq_arr(n) {
    let sequence = [];
    for (var j = 0; j < n; j++) {
        sequence.push(j);
    }
    return sequence.slice(0,);
}