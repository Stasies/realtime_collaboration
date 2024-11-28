type PropFunction = (value: boolean) => void;
const Tools: React.FC<{ setDrawingMode: PropFunction }> = ({
  setDrawingMode,
}) => {
  return (
    <div className="fixed left-10 top-40 z-50 border-2 border-gray-600">
      <div onClick={() => setDrawingMode(false)}>Курсор</div>
      <div onClick={() => setDrawingMode(true)}>Рисовать</div>
      <div>text</div>
      <div>note</div>
    </div>
  );
};

export default Tools;
