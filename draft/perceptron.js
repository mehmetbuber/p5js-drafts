function Perceptron(n, c_) {
    var weights;  // Array of weights for inputs
    var c;          // learning constant

    weights = [];
    // Start with random weights
    for (var i = 0; i < weights.length; i++) {
        weights[i] = random(-1, 1);
    }
    c = c_;

    this.weights = weights;

    this.train = function () {
        // Guess the result
        var guess = this.feedforward(this.inputs);
        // Compute the factor for changing the weight based on the error
        // Error = desired output - guessed output
        // Note this can only be 0, -2, or 2
        // Multiply by learning constant
        var error = this.desired - guess;
        // Adjust weights based on weightChange * input
        for (var i = 0; i < weights.length; i++) {
            weights[i] += c * error * inputs[i];
        }
    };

    this.feedforward = function () {
        // Sum all values
        var sum = 0;
        for (var i = 0; i < weights.length; i++) {
            sum += inputs[i] * weights[i];
        }
        // Result is sign of the sum, -1 or 1
        return this.activate(sum);
    };

    this.activate = function (sum) {
        if (sum > 0) return 1;
        else return -1;
    };

    this.getWeights = function () {
        return weights;
    };

    this.sigmoid = function () {

    };

    this.hardside = function () {

    };
}