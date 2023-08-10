// import React, { useRef, useEffect } from 'react';

// const BinaryTree = ({treeData}) => {

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
    
//     // Определение параметров дерева
//     const nodeRadius = 50;
//     const levelDistance = 500;
//     const verticalDistance = 200;
//     const rootNodePosition = { x: canvas.width / 1.5, y: 40 };

//     // Рекурсивная функция для отрисовки узлов и связей дерева
//     const drawNode = (node, x, y, level) => {
//       // Отрисовка узла
//       context.beginPath();
//       context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
//       context.fillStyle = 'gray';
//       context.fill();
//       context.stroke();

//       // Отрисовка значения узла
//       context.font = '14px Arial';
//       context.fillStyle = 'white';
//       context.textAlign = 'center';
//       context.textBaseline = 'middle';
//       context.fillText(node?.value?.id.toString(), x, y);

//       // Отрисовка связей
//       if (node?.left) {
//         const leftChildX = x - levelDistance / Math.pow(2, level);
//         const leftChildY = y + verticalDistance;
//         context.beginPath();
//         context.moveTo(x, y + nodeRadius);
//         context.lineTo(leftChildX, leftChildY - nodeRadius);
//         context.stroke();
//         drawNode(node.left, leftChildX, leftChildY, level + 1);
//       }

//       if (node?.right) {
//         const rightChildX = x + levelDistance / Math.pow(2, level);
//         const rightChildY = y + verticalDistance;
//         context.beginPath();
//         context.moveTo(x, y + nodeRadius);
//         context.lineTo(rightChildX, rightChildY - nodeRadius);
//         context.stroke();
//         drawNode(node.right, rightChildX, rightChildY, level + 1);
//       }
//     };

//     // Пример данных для бинарного дерева
//     // const treeData = {
//     //   id: 1,
//     //   left: {
//     //     id: 2,
//     //     left: {
//     //       id: 4,
//     //       left: null,
//     //       right: null,
//     //     },
//     //     right: {
//     //       id: 5,
//     //       left: null,
//     //       right: null,
//     //     },
//     //   },
//     //   right: {
//     //     id: 3,
//     //     left: {
//     //       id: 6,
//     //       left: null,
//     //       right: null,
//     //     },
//     //     right: {
//     //       id: 7,
//     //       left: null,
//     //       right: null,
//     //     },
//     //   },
//     // };

//     // Очистка холста перед отрисовкой
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // Отрисовка корневого узла и его потомков
//     drawNode(treeData, rootNodePosition.x, rootNodePosition.y, 1);
//   }, []);

//   return <canvas ref={canvasRef} width={800} height={2000} />;
// };

// export default BinaryTree;

import React, { useRef, useEffect } from 'react';

const BinaryTree = ({treeData}) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Определение параметров дерева
    const nodeSize = 200;
    const levelDistance = 1400;
    const verticalDistance = 320;
    const rootNodePosition = { x: canvas.width / 2, y: 40 };

    // Рекурсивная функция для отрисовки узлов и связей дерева
    const drawNode = (node, x, y, level) => {
      // Отрисовка узла в форме квадрата
      context.fillStyle = 'black';
      context.fillRect(x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);
      context.strokeStyle = 'black';
      context.strokeRect(x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);

      // Отрисовка значения узла
      context.font = '12px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(node?.value?.id.toString(), x, y);

      // Отрисовка связей
      if (node?.left) {
        const leftChildX = x - levelDistance / Math.pow(2, level);
        const leftChildY = y + verticalDistance;
        context.beginPath();
        context.moveTo(x, y + nodeSize / 2);
        context.lineTo(leftChildX, leftChildY - nodeSize / 2);
        context.stroke();
        drawNode(node.left, leftChildX, leftChildY, level + 1);
      }

      if (node?.right) {
        const rightChildX = x + levelDistance / Math.pow(2, level);
        const rightChildY = y + verticalDistance;
        context.beginPath();
        context.moveTo(x, y + nodeSize / 2);
        context.lineTo(rightChildX, rightChildY - nodeSize / 2);
        context.stroke();
        drawNode(node.right, rightChildX, rightChildY, level + 1);
      }
    }; 

    // Пример данных для бинарного дерева

    // Очистка холста перед отрисовкой
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка корневого узла и его потомков
    drawNode(treeData, rootNodePosition.x, rootNodePosition.y, 1);
  }, []);

  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setOffsetX(offsetX + (startX - e.clientX));
    setOffsetY(offsetY + (startY - e.clientY));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = startX - e.clientX;
    const deltaY = startY - e.clientY;
    setOffsetX(offsetX - deltaX);
    setOffsetY(offsetY - deltaY);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  return (
    <div 
      className="w-[100vw] h-[100vh] overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <canvas 
        className='w-[200%] h-[200%]'
        ref={canvasRef} 
        width={2500} 
        height={600} 
        style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      />
    </div>
  ) 
};

export default BinaryTree;