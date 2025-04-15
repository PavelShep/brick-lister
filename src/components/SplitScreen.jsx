function SplitScreen({ children, direction = 'left-right', splitRatio = 0.5 }) {
    const [leftChild, rightChild] = children;
  
    return (
      <div className={`split-screen ${direction}`}>
        <div className="split-panel left" style={{ flex: splitRatio }}>
          {leftChild}
        </div>
        <div className="split-panel right" style={{ flex: 1 - splitRatio }}>
          {rightChild}
        </div>
      </div>
    );
  }
  
  export default SplitScreen;