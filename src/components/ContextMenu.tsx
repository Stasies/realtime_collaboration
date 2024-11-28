const ContextMenu: React.FC<{ coords: number[] }> = ({ coords }) => {
  return (
    <div
      className="menu fixed bg-white"
      style={{ top: coords[1] + "px", left: coords[0] + "px" }}
    >
      <div className="menu-item">Add text</div>
      <div className="menu-item">Add sticky note</div>
      <div className="menu-item">Add comment</div>
    </div>
  );
};

export default ContextMenu;
