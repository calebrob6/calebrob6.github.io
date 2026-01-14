/**
 * Decision Tree Visualization
 * SVG-based tree rendering with pan/zoom support.
 */

class TreeViz {
    /**
     * @param {SVGElement} svg - SVG element to render into
     * @param {HTMLElement} viewport - Scrollable viewport container
     * @param {HTMLElement} inner - Inner container for transform
     * @param {HTMLElement} zoomDisplay - Element to display zoom level
     * @param {Function} onNodeClick - Callback when a node is clicked
     */
    constructor(svg, viewport, inner, zoomDisplay, onNodeClick) {
        this.svg = svg;
        this.viewport = viewport;
        this.inner = inner;
        this.zoomDisplay = zoomDisplay;
        this.onNodeClick = onNodeClick;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.nodeW = 160;
        this.nodeH = 52;
        this.gapH = 12;
        this.gapV = 28;
        this.treeWidth = 0;
        this.treeHeight = 0;
        this.initPan();
    }

    /**
     * Initialize pan and zoom event handlers
     */
    initPan() {
        if (!this.viewport) return;
        let dragging = false, startX, startY, startPanX, startPanY;

        this.viewport.addEventListener('mousedown', (e) => {
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startPanX = this.panX;
            startPanY = this.panY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            this.panX = startPanX + (e.clientX - startX);
            this.panY = startPanY + (e.clientY - startY);
            this.updateTransform();
        });

        window.addEventListener('mouseup', () => dragging = false);

        this.viewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.setZoom(this.zoom * delta);
        });
    }

    /**
     * Update the CSS transform based on current pan/zoom
     */
    updateTransform() {
        if (this.inner) {
            this.inner.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
        }
        if (this.zoomDisplay) {
            this.zoomDisplay.textContent = Math.round(this.zoom * 100) + '%';
        }
    }

    /**
     * Calculate layout positions for all nodes
     * @param {Object} node - Tree node
     * @param {number} depth - Current depth
     * @param {number} pos - Current x position
     * @returns {Object} Layout info with width, nodes, and links
     */
    layout(node, depth = 0, pos = 0) {
        if (!node) return { width: 0, nodes: [], links: [] };
        const nodes = [], links = [];

        if (node.type === 'leaf') {
            nodes.push({ ...node, x: pos, y: depth, w: this.nodeW });
            return { width: this.nodeW, nodes, links };
        }

        const left = this.layout(node.left, depth + 1, pos);
        const right = this.layout(node.right, depth + 1, pos + left.width + this.gapH);
        const totalW = left.width + this.gapH + right.width;
        const nodeX = pos + totalW / 2 - this.nodeW / 2;

        nodes.push({ ...node, x: nodeX, y: depth, w: this.nodeW });

        const leftChild = left.nodes.find(n => n.depth === depth + 1);
        const rightChild = right.nodes.find(n => n.depth === depth + 1);
        if (leftChild) links.push({ x1: nodeX + this.nodeW / 2, y1: depth, x2: leftChild.x + this.nodeW / 2, y2: depth + 1 });
        if (rightChild) links.push({ x1: nodeX + this.nodeW / 2, y1: depth, x2: rightChild.x + this.nodeW / 2, y2: depth + 1 });

        return { width: totalW, nodes: [...nodes, ...left.nodes, ...right.nodes], links: [...links, ...left.links, ...right.links] };
    }

    /**
     * Render the decision tree to SVG
     * @param {Object} tree - Root node of the tree
     */
    render(tree) {
        if (!tree) {
            this.svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#666">No tree to display</text>';
            return;
        }

        // Calculate tree depth and adjust node size for deep trees
        const getDepth = (n) => n && n.type !== 'leaf' ? 1 + Math.max(getDepth(n.left), getDepth(n.right)) : 1;
        const depth = getDepth(tree);

        // Compact layout for deeper trees
        if (depth > 6) {
            this.nodeW = 120;
            this.nodeH = 42;
            this.gapH = 8;
            this.gapV = 22;
        } else if (depth > 4) {
            this.nodeW = 140;
            this.nodeH = 46;
            this.gapH = 10;
            this.gapV = 24;
        } else {
            this.nodeW = 160;
            this.nodeH = 52;
            this.gapH = 12;
            this.gapV = 28;
        }

        const { nodes, links } = this.layout(tree);
        const maxX = Math.max(...nodes.map(n => n.x + this.nodeW)) + 40;
        const maxY = Math.max(...nodes.map(n => n.y)) * (this.nodeH + this.gapV) + this.nodeH + 40;

        this.treeWidth = maxX;
        this.treeHeight = maxY;

        this.svg.setAttribute('width', maxX);
        this.svg.setAttribute('height', maxY);
        this.svg.style.width = maxX + 'px';
        this.svg.style.height = maxY + 'px';

        let html = '<g transform="translate(20,20)">';
        
        // Draw links
        links.forEach(l => {
            const y1 = l.y1 * (this.nodeH + this.gapV) + this.nodeH;
            const y2 = l.y2 * (this.nodeH + this.gapV);
            html += `<path class="tree-link" d="M${l.x1},${y1} C${l.x1},${(y1 + y2) / 2} ${l.x2},${(y1 + y2) / 2} ${l.x2},${y2}"/>`;
        });

        const fontSize = depth > 6 ? 9 : (depth > 4 ? 10 : 11);
        const subFontSize = depth > 6 ? 8 : (depth > 4 ? 9 : 10);

        // Draw nodes
        let nodeIdx = 0;
        nodes.forEach(n => {
            n.nodeIdx = nodeIdx++;
            const x = n.x, y = n.y * (this.nodeH + this.gapV);
            const isLeaf = n.type === 'leaf';
            const cls = isLeaf ? `tree-node leaf ${n.prediction === 1 ? 'positive' : 'negative'}` : 'tree-node';
            html += `<g class="${cls}" data-node-idx="${n.nodeIdx}" data-node-id="${n.nodeId || ''}" transform="translate(${x},${y})">`;
            html += `<rect width="${this.nodeW}" height="${this.nodeH}" rx="4"/>`;
            if (isLeaf) {
                html += `<text x="${this.nodeW / 2}" y="${this.nodeH / 2 - 2}" text-anchor="middle" style="font-size:${fontSize}px">${n.prediction === 1 ? '>50K' : '≤50K'}</text>`;
                html += `<text class="sub" x="${this.nodeW / 2}" y="${this.nodeH / 2 + 10}" text-anchor="middle" style="font-size:${subFontSize}px">n=${n.samples}</text>`;
            } else {
                html += `<text x="${this.nodeW / 2}" y="16" text-anchor="middle" style="font-size:${fontSize}px">${n.feature}</text>`;
                const split = n.splitType === 'continuous' ? `≤ ${n.threshold?.toFixed(1)}` : `= ${n.category || ''}`;
                html += `<text class="sub" x="${this.nodeW / 2}" y="${16 + fontSize + 2}" text-anchor="middle" style="font-size:${subFontSize}px">${split}</text>`;
                html += `<text class="sub" x="${this.nodeW / 2}" y="${this.nodeH - 5}" text-anchor="middle" style="font-size:${subFontSize}px">n=${n.samples}</text>`;
            }
            html += '</g>';
        });
        html += '</g>';
        this.svg.innerHTML = html;

        // Add click handlers to nodes
        if (this.onNodeClick) {
            this.svg.querySelectorAll('.tree-node').forEach(g => {
                g.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const nodeId = g.dataset.nodeId;
                    this.svg.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
                    g.classList.add('selected');
                    this.onNodeClick(nodeId);
                });
            });
        }

        // Auto-fit on first render
        if (this.viewport) {
            this.fitToView();
        }
    }

    /**
     * Set zoom level
     * @param {number} z - Zoom level (0.1 to 3)
     */
    setZoom(z) {
        this.zoom = Math.max(0.1, Math.min(3, z));
        this.updateTransform();
    }

    /** Zoom in by 25% */
    zoomIn() {
        this.setZoom(this.zoom * 1.25);
    }

    /** Zoom out by 25% */
    zoomOut() {
        this.setZoom(this.zoom / 1.25);
    }

    /** Fit tree to viewport */
    fitToView() {
        if (!this.viewport || !this.treeWidth) return;
        const vw = this.viewport.clientWidth;
        const vh = this.viewport.clientHeight;
        const scaleX = vw / this.treeWidth;
        const scaleY = vh / this.treeHeight;
        this.zoom = Math.min(scaleX, scaleY, 1) * 0.95;
        this.panX = (vw - this.treeWidth * this.zoom) / 2;
        this.panY = 10;
        this.updateTransform();
    }

    /** Reset to default zoom and pan */
    reset() {
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }

    /**
     * Highlight a specific node by ID
     * @param {string} nodeId - Node ID to highlight
     */
    highlightNode(nodeId) {
        this.svg.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
        if (nodeId) {
            const node = this.svg.querySelector(`.tree-node[data-node-id="${nodeId}"]`);
            if (node) node.classList.add('selected');
        }
    }
}
