// Updated NetworkGraph.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAppContext } from '../context/AppContext';
import { User } from '../types';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  centrality: number;
  role: 'high-trust' | 'newcomer' | 'regular';
  trustScore: number;
  image: string;
  isCurrentUser: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  trust: number;
}

const NetworkGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { currentUser, allUsers } = useAppContext();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const calculateNetworkMetrics = (nodes: Node[], links: Link[]) => {
    const nodeMap = new Map(nodes.map(node => [node.id, { inDegree: 0, outDegree: 0 }]));
    links.forEach(link => {
      const source = nodeMap.get(link.source as string);
      const target = nodeMap.get(link.target as string);
      if (source && target) {
        source.outDegree++;
        target.inDegree++;
      }
    });
    nodes.forEach(node => {
      const degrees = nodeMap.get(node.id);
      if (degrees) {
        node.centrality = (degrees.inDegree + degrees.outDegree) / (nodes.length - 1);
      }
    });
    const maxCentrality = Math.max(...nodes.map(n => n.centrality));
    nodes.forEach(node => {
      node.centrality = node.centrality / maxCentrality;
    });
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ 
          width: Math.min(width, window.innerWidth - 40), 
          height: Math.min(600, window.innerHeight - 100) 
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;
    d3.select(svgRef.current).selectAll("*").remove();
    // --- Data prep ---
    // Use a hardcoded mock network for demonstration
    const demoNodes: Node[] = [
      { id: 'maya', name: 'Maya', centrality: 0.82, role: 'high-trust', trustScore: 0.9, image: 'https://randomuser.me/api/portraits/women/1.jpg', isCurrentUser: false },
      { id: 'salma', name: 'Salma', centrality: 0.47, role: 'regular', trustScore: 0.6, image: 'https://randomuser.me/api/portraits/women/2.jpg', isCurrentUser: false },
      { id: 'ali', name: 'Ali', centrality: 0.30, role: 'newcomer', trustScore: 0.3, image: 'https://randomuser.me/api/portraits/men/3.jpg', isCurrentUser: false },
      { id: 'lina', name: 'Lina', centrality: 0.22, role: 'regular', trustScore: 0.5, image: 'https://randomuser.me/api/portraits/women/4.jpg', isCurrentUser: false },
      { id: 'sara', name: 'Sara', centrality: 0.65, role: 'high-trust', trustScore: 0.85, image: 'https://randomuser.me/api/portraits/women/5.jpg', isCurrentUser: true },
      { id: 'omar', name: 'Omar', centrality: 0.38, role: 'regular', trustScore: 0.55, image: 'https://randomuser.me/api/portraits/men/6.jpg', isCurrentUser: false },
      { id: 'nina', name: 'Nina', centrality: 0.55, role: 'regular', trustScore: 0.7, image: 'https://randomuser.me/api/portraits/women/7.jpg', isCurrentUser: false },
      { id: 'lucas', name: 'Lucas', centrality: 0.41, role: 'regular', trustScore: 0.6, image: 'https://randomuser.me/api/portraits/men/8.jpg', isCurrentUser: false },
      { id: 'hana', name: 'Hana', centrality: 0.33, role: 'newcomer', trustScore: 0.4, image: 'https://randomuser.me/api/portraits/women/9.jpg', isCurrentUser: false },
      { id: 'zara', name: 'Zara', centrality: 0.60, role: 'high-trust', trustScore: 0.88, image: 'https://randomuser.me/api/portraits/women/10.jpg', isCurrentUser: false },
      { id: 'leo', name: 'Leo', centrality: 0.28, role: 'regular', trustScore: 0.5, image: 'https://randomuser.me/api/portraits/men/11.jpg', isCurrentUser: false },
      { id: 'amira', name: 'Amira', centrality: 0.36, role: 'regular', trustScore: 0.58, image: 'https://randomuser.me/api/portraits/women/12.jpg', isCurrentUser: false },
    ];
    const demoLinks: Link[] = [
      { source: 'maya', target: 'salma', trust: 0.9 },
      { source: 'salma', target: 'ali', trust: 0.6 },
      { source: 'ali', target: 'lina', trust: 0.3 },
      { source: 'maya', target: 'lina', trust: 0.7 },
      { source: 'sara', target: 'maya', trust: 0.85 },
      { source: 'sara', target: 'nina', trust: 0.8 },
      { source: 'nina', target: 'omar', trust: 0.5 },
      { source: 'omar', target: 'ali', trust: 0.4 },
      { source: 'lina', target: 'sara', trust: 0.6 },
      { source: 'lucas', target: 'maya', trust: 0.7 },
      { source: 'lucas', target: 'zara', trust: 0.8 },
      { source: 'zara', target: 'sara', trust: 0.9 },
      { source: 'zara', target: 'amira', trust: 0.7 },
      { source: 'amira', target: 'leo', trust: 0.5 },
      { source: 'leo', target: 'hana', trust: 0.4 },
      { source: 'hana', target: 'lucas', trust: 0.6 },
      { source: 'nina', target: 'zara', trust: 0.7 },
      { source: 'amira', target: 'maya', trust: 0.6 },
      { source: 'leo', target: 'ali', trust: 0.5 },
    ];
    const nodes = demoNodes;
    const links = demoLinks;
    calculateNetworkMetrics(nodes, links);

    const width = dimensions.width;
    const height = dimensions.height;
    const nodeRadius = Math.min(30, dimensions.width / 25);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'background-color: white');

    const defs = svg.append('defs');
    defs.append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', 4)
      .attr('result', 'coloredBlur');

    defs.select('filter')
      .append('feMerge')
      .selectAll('feMergeNode')
      .data(['coloredBlur', 'SourceGraphic'])
      .enter()
      .append('feMergeNode')
      .attr('in', d => d);

    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -10 20 20')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 20)
      .attr('markerHeight', 20)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-10L20,0L0,10Z')
      .attr('fill', '#9333ea');

    // --- Force simulation ---
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(140).strength(d => d.trust * 0.5))
      .force('charge', d3.forceManyBody().strength(-1800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => nodeRadius * (1 + (d as any).centrality) + 30));
    simulation.stop();
    for (let i = 0; i < 200; ++i) simulation.tick();

    // Clamp node positions after simulation
    nodes.forEach(d => {
      d.x = Math.max(60, Math.min(width - 60, d.x ?? width / 2));
      d.y = Math.max(60, Math.min(height - 60, d.y ?? height / 2));
    });

    // --- Edges ---
    svg.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', d => {
        const sourceNode = typeof d.source === 'object' ? d.source as Node : nodes.find(n => n.id === d.source)!;
        const targetNode = typeof d.target === 'object' ? d.target as Node : nodes.find(n => n.id === d.target)!;
        const sx = sourceNode.x ?? width / 2;
        const sy = sourceNode.y ?? height / 2;
        const tx = targetNode.x ?? width / 2;
        const ty = targetNode.y ?? height / 2;
        return `M${sx},${sy}L${tx},${ty}`;
      })
      .attr('stroke', 'red')
      .attr('stroke-width', 4)
      .attr('stroke-opacity', 1)
      .attr('fill', 'none');

    // --- Tooltips ---
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white')
      .style('border', '1px solid #ddd')
      .style('border-radius', '6px')
      .style('padding', '10px')
      .style('font-size', '13px')
      .style('box-shadow', '0 2px 8px rgba(0,0,0,0.12)');

    // --- Nodes ---
    const nodeGroup = svg.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => {
        const x = d.x ?? width / 2;
        const y = d.y ?? height / 2;
        return `translate(${x},${y})`;
      })
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .html(`
            <strong>${d.name}</strong><br/>
            Trust Score: ${(d.trustScore * 100).toFixed(0)}%<br/>
            Centrality: ${(d.centrality * 100).toFixed(0)}%<br/>
            Role: ${d.role}
          `)
          .style('left', (event.pageX + 12) + 'px')
          .style('top', (event.pageY - 18) + 'px');
      })
      .on('mousemove', (event) => {
        tooltip.style('left', (event.pageX + 12) + 'px')
          .style('top', (event.pageY - 18) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // White border (thicker/dark for current user)
    nodeGroup.append('circle')
      .attr('r', d => nodeRadius * (1 + d.centrality))
      .attr('fill', '#fff')
      .attr('stroke', d => d.isCurrentUser ? '#4c1d95' : '#fff')
      .attr('stroke-width', d => d.isCurrentUser ? 6 : 3);

    // Profile image clipped to circle
    nodeGroup.append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('circle')
      .attr('r', d => nodeRadius * (1 + d.centrality) - 2);
    nodeGroup.append('image')
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .attr('xlink:href', d => d.image)
      .attr('x', d => -(nodeRadius * (1 + d.centrality) - 2))
      .attr('y', d => -(nodeRadius * (1 + d.centrality) - 2))
      .attr('width', d => (nodeRadius * (1 + d.centrality) - 2) * 2)
      .attr('height', d => (nodeRadius * (1 + d.centrality) - 2) * 2);

    // Name label with white drop shadow
    nodeGroup.append('text')
      .text(d => d.name)
      .attr('dy', d => nodeRadius * (1 + d.centrality) + 16)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('paint-order', 'stroke')
      .style('stroke', 'white')
      .style('stroke-width', 5)
      .style('stroke-linejoin', 'round')
      .style('filter', 'none')
      .style('text-shadow', '0 0 8px white, 0 0 8px white');
    nodeGroup.append('text')
      .text(d => d.name)
      .attr('dy', d => nodeRadius * (1 + d.centrality) + 16)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('font-weight', 'bold')
      .style('fill', '#333');

    // Cleanup tooltip on unmount
    return () => { tooltip.remove(); };

  }, [currentUser, allUsers, dimensions]);

  return (
    <div ref={containerRef} className="network-graph">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default NetworkGraph;
