import React from 'react';
import NetworkGraph from '../components/NetworkGraph';

const NetworkPage: React.FC = () => {
  return (
    <div className="network-page">
      <div className="network-header">
        <h1>Your Support Network</h1>
        <p>
          This interactive visualization shows your connections in the community. 
          Larger nodes represent users with higher crowns. Colors indicate different stages.
          Edge weights show connection strength. Hover over nodes to see details.
        </p>
        <div className="legend">
          <div className="legend-item">
            <div className="color-dot pregnancy"></div>
            <span>Pregnancy</span>
          </div>
          <div className="legend-item">
            <div className="color-dot early-postpartum"></div>
            <span>Early Postpartum</span>
          </div>
          <div className="legend-item">
            <div className="color-dot ongoing-postpartum"></div>
            <span>Ongoing Postpartum</span>
          </div>
        </div>
      </div>
      <div className="network-container">
        <NetworkGraph />
      </div>
      <style jsx>{`
        .network-page {
          padding: 2rem;
          background: #fafafa;
          min-height: 100vh;
        }
        .network-header {
          text-align: center;
          margin-bottom: 2rem;
          color: #5E35B1;
        }
        .network-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .network-header p {
          color: #666;
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
        .pregnancy {
          background-color: #9575CD;
        }
        .early-postpartum {
          background-color: #F06292;
        }
        .ongoing-postpartum {
          background-color: #4DD0E1;
        }
        .network-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin: 0 auto;
          max-width: 1200px;
        }
      `}</style>
    </div>
  );
};

export default NetworkPage; 