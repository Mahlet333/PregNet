import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

interface Node {
  id: string;
  name: string;
  radius: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  image: string;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

const NetworkVisualization: React.FC = () => {
  const { allUsers, currentUser } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const links = useRef<Link[]>([]);
  const animationRef = useRef<number>();
  const hoveredNode = useRef<Node | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stageColors = {
    'pregnancy': '#e9d5ff', // Purple light
    'early-postpartum': '#fbcfe8', // Pink light
    'ongoing-postpartum': '#a5f3fc', // Cyan light
  };

  // Initialize the network visualization
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions to match container
    const updateCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = Math.min(500, window.innerHeight * 0.6);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create nodes from users
    nodes.current = allUsers.map(user => {
      const isCurrentUser = user.id === currentUser.id;
      const radius = isCurrentUser ? 35 : 25 + (user.crowns / 10);
      
      return {
        id: user.id,
        name: user.name,
        radius,
        color: stageColors[user.stage] || '#e9d5ff',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        image: user.profilePic,
      };
    });

    // Create links between connected users
    links.current = [];
    allUsers.forEach(user => {
      user.connections.forEach(connectionId => {
        if (connectionId !== user.id) { // Avoid self-connections
          links.current.push({
            source: user.id,
            target: connectionId,
            strength: 0.5 + Math.random() * 0.5, // Random strength between 0.5 and 1
          });
        }
      });
    });

    // Load profile images
    const imageCache: {[key: string]: HTMLImageElement} = {};
    const imagePromises = nodes.current.map(node => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = node.image;
        img.onload = () => {
          imageCache[node.id] = img;
          resolve();
        };
        img.onerror = () => {
          resolve(); // Resolve even if image fails to load
        };
      });
    });

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      hoveredNode.current = null;
      
      // Check if mouse is over any node
      for (const node of nodes.current) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < node.radius) {
          hoveredNode.current = node;
          break;
        }
      }
      
      canvas.style.cursor = hoveredNode.current ? 'pointer' : 'default';
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop for force-directed layout
    Promise.all(imagePromises).then(() => {
      const animate = () => {
        if (!canvasRef.current || !context) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate forces and update positions
        calculateForces();
        
        // Draw links
        context.strokeStyle = '#d8b4fe';
        context.lineWidth = 2;
        
        links.current.forEach(link => {
          const sourceNode = nodes.current.find(n => n.id === link.source);
          const targetNode = nodes.current.find(n => n.id === link.target);
          
          if (sourceNode && targetNode) {
            context.beginPath();
            context.moveTo(sourceNode.x, sourceNode.y);
            context.lineTo(targetNode.x, targetNode.y);
            context.globalAlpha = link.strength * 0.6;
            context.stroke();
            context.globalAlpha = 1;
          }
        });
        
        // Draw nodes
        nodes.current.forEach(node => {
          const isHovered = hoveredNode.current === node;
          
          // Draw node background
          context.beginPath();
          context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, false);
          context.fillStyle = node.color;
          context.fill();
          
          // Draw border (thicker for hovered node or current user)
          context.strokeStyle = node.id === currentUser.id ? '#9333ea' : '#d8b4fe';
          context.lineWidth = isHovered ? 4 : (node.id === currentUser.id ? 3 : 2);
          context.stroke();
          
          // Draw profile image
          const img = imageCache[node.id];
          if (img) {
            context.save();
            context.beginPath();
            context.arc(node.x, node.y, node.radius - 3, 0, Math.PI * 2, false);
            context.closePath();
            context.clip();
            context.drawImage(img, node.x - node.radius + 3, node.y - node.radius + 3, (node.radius - 3) * 2, (node.radius - 3) * 2);
            context.restore();
          }
          
          // Draw hovered node name
          if (isHovered) {
            context.fillStyle = 'rgba(147, 51, 234, 0.9)';
            context.font = '14px Arial';
            const textWidth = context.measureText(node.name).width;
            const padding = 8;
            
            // Draw name background
            context.fillRect(
              node.x - textWidth / 2 - padding, 
              node.y + node.radius + 5, 
              textWidth + padding * 2, 
              25
            );
            
            // Draw name text
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(node.name, node.x, node.y + node.radius + 22);
          }
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    });

    // Physics for force-directed layout
    const calculateForces = () => {
      // Apply forces between nodes (repulsion)
      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const nodeA = nodes.current[i];
          const nodeB = nodes.current[j];
          
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = nodeA.radius + nodeB.radius + 10;
          
          if (distance < minDistance) {
            const forceX = dx / distance * (minDistance - distance) * 0.05;
            const forceY = dy / distance * (minDistance - distance) * 0.05;
            
            nodeA.vx -= forceX;
            nodeA.vy -= forceY;
            nodeB.vx += forceX;
            nodeB.vy += forceY;
          }
        }
      }
      
      // Apply link forces (attraction)
      links.current.forEach(link => {
        const sourceNode = nodes.current.find(n => n.id === link.source);
        const targetNode = nodes.current.find(n => n.id === link.target);
        
        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const idealDistance = 150;
          
          const forceX = dx / distance * (distance - idealDistance) * 0.01 * link.strength;
          const forceY = dy / distance * (distance - idealDistance) * 0.01 * link.strength;
          
          sourceNode.vx += forceX;
          sourceNode.vy += forceY;
          targetNode.vx -= forceX;
          targetNode.vy -= forceY;
        }
      });
      
      // Center force to current user
      const currentUserNode = nodes.current.find(n => n.id === currentUser.id);
      if (currentUserNode && canvas) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        currentUserNode.vx += (centerX - currentUserNode.x) * 0.01;
        currentUserNode.vy += (centerY - currentUserNode.y) * 0.01;
      }
      
      // Apply velocity, damping, and boundary conditions
      nodes.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Damping
        node.vx *= 0.9;
        node.vy *= 0.9;
        
        // Boundaries
        const padding = node.radius;
        if (canvas) {
          if (node.x < padding) {
            node.x = padding;
            node.vx = Math.abs(node.vx) * 0.5;
          } else if (node.x > canvas.width - padding) {
            node.x = canvas.width - padding;
            node.vx = -Math.abs(node.vx) * 0.5;
          }
          
          if (node.y < padding) {
            node.y = padding;
            node.vy = Math.abs(node.vy) * 0.5;
          } else if (node.y > canvas.height - padding) {
            node.y = canvas.height - padding;
            node.vy = -Math.abs(node.vy) * 0.5;
          }
        }
      });
    };

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [allUsers, currentUser]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-4">
      <h2 className="text-xl font-bold text-purple-900 mb-3">Your Support Network</h2>
      <p className="text-sm text-purple-700 mb-4">
        This interactive visualization shows your connections in the community. 
        Larger nodes represent users with higher crowns. Colors indicate different stages.
        Hover over nodes to see details.
      </p>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: stageColors.pregnancy }}></div>
          <span className="text-xs text-purple-800">Pregnancy</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: stageColors['early-postpartum'] }}></div>
          <span className="text-xs text-purple-800">Early Postpartum</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full mr-1" style={{ backgroundColor: stageColors['ongoing-postpartum'] }}></div>
          <span className="text-xs text-purple-800">Ongoing Postpartum</span>
        </div>
      </div>
      
      <div ref={containerRef} className="relative w-full border border-purple-200 rounded-lg overflow-hidden bg-purple-50">
        <canvas 
          ref={canvasRef} 
          className="touch-none"
        />
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-purple-600">
          <span className="font-semibold">Network Theory:</span> This visualization demonstrates concepts like centrality, 
          strong/weak ties, and social capital in your pregnancy support network.
        </p>
      </div>
    </div>
  );
};

export default NetworkVisualization;