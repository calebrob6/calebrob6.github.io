/**
 * Decision Tree Algorithm Implementation
 * A CART-style decision tree classifier supporting both Gini impurity and entropy.
 */

/**
 * Calculate classification metrics from predictions
 * @param {number[]} yTrue - Actual labels
 * @param {number[]} yPred - Predicted labels
 * @returns {{accuracy: number, precision: number, recall: number, f1: number}}
 */
function calcMetrics(yTrue, yPred) {
    let tp = 0, tn = 0, fp = 0, fn = 0;
    for (let i = 0; i < yTrue.length; i++) {
        if (yTrue[i] === 1 && yPred[i] === 1) tp++;
        else if (yTrue[i] === 0 && yPred[i] === 0) tn++;
        else if (yTrue[i] === 0 && yPred[i] === 1) fp++;
        else fn++;
    }
    return {
        accuracy: (tp + tn) / (tp + tn + fp + fn) || 0,
        precision: tp / (tp + fp) || 0,
        recall: tp / (tp + fn) || 0,
        f1: 2 * ((tp / (tp + fp)) * (tp / (tp + fn))) / ((tp / (tp + fp)) + (tp / (tp + fn))) || 0
    };
}

/**
 * Decision Tree Classifier
 */
class DecisionTree {
    /**
     * @param {Object} opts - Configuration options
     * @param {number} opts.maxDepth - Maximum tree depth (default: 10)
     * @param {number} opts.minSamplesSplit - Minimum samples to split a node (default: 2)
     * @param {number} opts.minSamplesLeaf - Minimum samples in a leaf node (default: 1)
     * @param {number} opts.minImpurityDecrease - Minimum impurity decrease for a split (default: 0)
     * @param {string} opts.criterion - Split criterion: 'gini' or 'entropy' (default: 'gini')
     * @param {string[]} opts.features - Features to consider for splits
     * @param {string[]} opts.continuousFeatures - Which features are continuous vs categorical
     */
    constructor(opts = {}) {
        this.maxDepth = opts.maxDepth || 10;
        this.minSamplesSplit = opts.minSamplesSplit || 2;
        this.minSamplesLeaf = opts.minSamplesLeaf || 1;
        this.minImpurityDecrease = opts.minImpurityDecrease || 0;
        this.criterion = opts.criterion || 'gini';
        this.features = opts.features || [];
        this.continuousFeatures = opts.continuousFeatures || [];
        this.tree = null;
        this.featureImportance = {};
    }

    /**
     * Calculate impurity of a set of labels
     * @param {number[]} labels - Class labels
     * @returns {number} Impurity score
     */
    impurity(labels) {
        const n = labels.length;
        if (n === 0) return 0;
        
        const counts = {};
        labels.forEach(l => counts[l] = (counts[l] || 0) + 1);

        if (this.criterion === 'entropy') {
            let ent = 0;
            Object.values(counts).forEach(c => {
                const p = c / n;
                if (p > 0) ent -= p * Math.log2(p);
            });
            return ent;
        }

        // Gini impurity
        let gini = 1;
        Object.values(counts).forEach(c => {
            const p = c / n;
            gini -= p * p;
        });
        return gini;
    }

    /**
     * Find the best split for a given feature
     * @param {Object[]} data - Training data
     * @param {string} feature - Feature to split on
     * @returns {Object|null} Best split or null if no valid split found
     */
    findBestSplit(data, feature) {
        const n = data.length;
        if (n < this.minSamplesSplit) return null;

        const labels = data.map(d => d.label);
        const currentImp = this.impurity(labels);
        let bestGain = this.minImpurityDecrease, bestSplit = null;

        if (this.continuousFeatures.includes(feature)) {
            // Continuous feature: find best threshold
            const vals = [...new Set(data.map(d => d.features[feature]))].sort((a, b) => a - b);
            for (let i = 0; i < vals.length - 1; i++) {
                const thresh = (vals[i] + vals[i + 1]) / 2;
                const left = data.filter(d => d.features[feature] <= thresh);
                const right = data.filter(d => d.features[feature] > thresh);
                if (left.length < this.minSamplesLeaf || right.length < this.minSamplesLeaf) continue;

                const wImp = (left.length / n) * this.impurity(left.map(d => d.label)) +
                             (right.length / n) * this.impurity(right.map(d => d.label));
                const gain = currentImp - wImp;
                if (gain > bestGain) {
                    bestGain = gain;
                    bestSplit = { feature, threshold: thresh, type: 'continuous' };
                }
            }
        } else {
            // Categorical feature: find best category to split on
            const cats = [...new Set(data.map(d => d.features[feature]))];
            for (const cat of cats) {
                const left = data.filter(d => d.features[feature] === cat);
                const right = data.filter(d => d.features[feature] !== cat);
                if (left.length < this.minSamplesLeaf || right.length < this.minSamplesLeaf) continue;

                const wImp = (left.length / n) * this.impurity(left.map(d => d.label)) +
                             (right.length / n) * this.impurity(right.map(d => d.label));
                const gain = currentImp - wImp;
                if (gain > bestGain) {
                    bestGain = gain;
                    bestSplit = { feature, category: cat, type: 'categorical' };
                }
            }
        }
        return bestGain > 0 ? { ...bestSplit, gain: bestGain } : null;
    }

    /**
     * Recursively build the decision tree
     * @param {Object[]} data - Training data
     * @param {number} depth - Current depth
     * @returns {Object} Tree node
     */
    buildTree(data, depth = 0) {
        const labels = data.map(d => d.label);
        const counts = {};
        labels.forEach(l => counts[l] = (counts[l] || 0) + 1);
        const majority = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

        // Stopping conditions
        if (depth >= this.maxDepth || data.length < this.minSamplesSplit || Object.keys(counts).length === 1) {
            return { type: 'leaf', prediction: parseInt(majority), samples: data.length, distribution: counts, depth };
        }

        // Find best split across all features
        let bestSplit = null;
        for (const f of this.features) {
            const split = this.findBestSplit(data, f);
            if (split && (!bestSplit || split.gain > bestSplit.gain)) bestSplit = split;
        }

        if (!bestSplit) {
            return { type: 'leaf', prediction: parseInt(majority), samples: data.length, distribution: counts, depth };
        }

        // Track feature importance
        this.featureImportance[bestSplit.feature] = (this.featureImportance[bestSplit.feature] || 0) + bestSplit.gain * data.length;

        // Split data
        let leftData, rightData;
        if (bestSplit.type === 'continuous') {
            leftData = data.filter(d => d.features[bestSplit.feature] <= bestSplit.threshold);
            rightData = data.filter(d => d.features[bestSplit.feature] > bestSplit.threshold);
        } else {
            leftData = data.filter(d => d.features[bestSplit.feature] === bestSplit.category);
            rightData = data.filter(d => d.features[bestSplit.feature] !== bestSplit.category);
        }

        return {
            type: 'node',
            feature: bestSplit.feature,
            splitType: bestSplit.type,
            threshold: bestSplit.threshold,
            category: bestSplit.category,
            samples: data.length,
            distribution: counts,
            depth,
            left: this.buildTree(leftData, depth + 1),
            right: this.buildTree(rightData, depth + 1)
        };
    }

    /**
     * Fit the decision tree to training data
     * @param {Object[]} data - Training data with features and labels
     * @returns {DecisionTree} this
     */
    fit(data) {
        this.featureImportance = {};
        this.tree = this.buildTree(data);
        
        // Normalize feature importance
        const total = Object.values(this.featureImportance).reduce((a, b) => a + b, 0);
        if (total > 0) {
            for (const f in this.featureImportance) {
                this.featureImportance[f] /= total;
            }
        }
        return this;
    }

    /**
     * Predict class for a single sample
     * @param {Object} sample - Feature values
     * @param {Object} node - Current tree node
     * @returns {number} Predicted class
     */
    predictOne(sample, node = this.tree) {
        if (node.type === 'leaf') return node.prediction;
        const goLeft = node.splitType === 'continuous'
            ? sample[node.feature] <= node.threshold
            : sample[node.feature] === node.category;
        return goLeft ? this.predictOne(sample, node.left) : this.predictOne(sample, node.right);
    }

    /**
     * Predict classes for multiple samples
     * @param {Object[]} samples - Array of samples
     * @returns {number[]} Predicted classes
     */
    predict(samples) {
        return samples.map(s => this.predictOne(s.features || s));
    }

    /**
     * Count total nodes in the tree
     * @param {Object} node - Starting node
     * @returns {number} Node count
     */
    countNodes(node = this.tree) {
        if (!node) return 0;
        return node.type === 'leaf' ? 1 : 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    /**
     * Get the depth of the tree
     * @param {Object} node - Starting node
     * @returns {number} Tree depth
     */
    getDepth(node = this.tree) {
        if (!node || node.type === 'leaf') return node ? 1 : 0;
        return 1 + Math.max(this.getDepth(node.left), this.getDepth(node.right));
    }
}
