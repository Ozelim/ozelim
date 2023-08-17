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
import Tree from 'react-d3-tree'

// Данные для бинарного дерева
const treeData = [
  {
    id: 'Root',
    data: '123123',
    partners: '123123',
    children: [
      {
        id: 'Node 1',
        children: [
          {
            id: 'Node 1.1',
            children: [
              {
                id: 'Node 1.1.1',
              },
              {
                id: 'Node 1.1.2',
              },
            ],
          },
          {
            id: 'Node 1.2',
            children: [
              {
                id: 'Node 1.2.1',
              },
              {
                id: 'Node 1.2.2',
              },
            ],
          },
        ],
      },
      {
        id: 'Node 2',
        children: [
          {
            id: 'Zhopa',
          },
          {
            id: 'Node 2.2',
          },
        ],
      },
    ],
  },
];

function CustomNode({ nodeData, toggleNode }) {

  return (
    <g>
      <circle
        r={10}
        fill={nodeData.children ? 'lightsteelblue' : '#fff'}
        onClick={toggleNode}
      />
      <text
        x={-20}
        y={-20}
        style={{fontSize: '14px' }}
        textAnchor="start"
      >
        {nodeData.id}
      </text>
    </g>
  )
}

function BinaryTreeView () {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc='step'
        nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10, fill: 'lightsteelblue' } }}
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
          <CustomNode nodeData={nodeDatum} toggleNode={toggleNode} />
        )}
      />
    </div>
  );
}

export default BinaryTreeView ;

///////////////////////////////////////////////////////////////////
// const BinaryTree = ({treeData}) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')

//     // Определение параметров дерева
//     const nodeSize = 80
//     const levelDistance = 250
//     const verticalDistance = 200
//     const rootNodePosition = { x: canvas.width / 2, y: 40 }

//     // Рекурсивная функция для отрисовки узлов и связей дерева
//     const drawNode = (node, x, y, level) => {
//       // Отрисовка прямоугольника с округленными границами и прозрачным фоном
//       const rectWidth = nodeSize + 20
//       const rectHeight = nodeSize + 80
//       const rectX = x - rectWidth / 2
//       const rectY = y - rectHeight / 2
//       context.fillStyle = 'rgba(48,186,143)' // Зеленый цвет
//       context.strokeStyle = 'rgba(208,240,192)' // Зеленый цвет
//       context.lineWidth = 2
//       context.beginPath()
//       context.moveTo(rectX + 10, rectY)
//       context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + 10, 10)
//       context.arcTo(
//         rectX + rectWidth,
//         rectY + rectHeight,
//         rectX + rectWidth - 10,
//         rectY + rectHeight,
//         10
//       )
//       context.arcTo(
//         rectX,
//         rectY + rectHeight,
//         rectX,
//         rectY + rectHeight - 10,
//         10
//       )
//       context.arcTo(rectX, rectY, rectX + 10, rectY, 10)
//       context.closePath()
//       context.fill()
//       context.stroke()

//       // Отрисовка округленного аватара
//       const avatarSize = nodeSize - 20
//       const avatarX = x - avatarSize / 2
//       const avatarY = y - rectHeight / 2 + 10
//       const avatarImage = new Image()
//       avatarImage.src = node.avatar
//       avatarImage.onload = () => {
//         context.save()
//         context.beginPath()
//         context.arc(x, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
//         context.closePath()
//         context.clip()
//         context.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize)
//         context.restore()
//       }

//       // Отрисовка имени пользователя
//       context.font = '14px Calibri'
//       context.fillStyle = 'white'
//       context.textAlign = 'center'
//       context.textBaseline = 'middle'
//       context.fillText(node.username, x, avatarY + avatarSize + 20)

//       // Отрисовка партнеров пользователя
//       context.font = '14px Calibri'
//       context.fillStyle = 'white'
//       context.textAlign = 'center'
//       context.textBaseline = 'middle'
//       context.fillText(node.partner, x, avatarY + avatarSize + 40)

//       // Отрисовка id
//       context.font = '14px Arial'
//       context.fillStyle = 'white'
//       context.textAlign = 'center'
//       context.textBaseline = 'middle'
//       context.fillText(node.id.toString(), x, avatarY + avatarSize + 60)
      
//       // Отрисовка даты рождения
//       context.font = '14px Tahoma'
//       context.fillStyle = 'white'
//       context.textAlign = 'center'
//       context.textBaseline = 'middle'
//       context.fillText(node.birthdate, x, avatarY + avatarSize + 80)


//       // Отрисовка связей
//       if (node.left) {
//         const leftChildX = x - levelDistance / Math.pow(2, level)
//         const leftChildY = y + verticalDistance
//         context.strokeStyle = 'rgba(48,186,143, 1)' // Зеленый цвет
//         context.beginPath()
//         context.moveTo(x, y + rectHeight / 2)
//         context.lineTo(leftChildX, leftChildY - rectHeight / 2)
//         context.stroke()
//         drawNode(node.left, leftChildX, leftChildY, level + 1)
//       }

//       if (node.right) {
//         const rightChildX = x + levelDistance / Math.pow(2, level)
//         const rightChildY = y + verticalDistance
//         context.strokeStyle = 'rgba(48,186,143, 1)' // Зеленый цвет
//         context.beginPath()
//         context.moveTo(x, y + rectHeight / 2)
//         context.lineTo(rightChildX, rightChildY - rectHeight / 2)
//         context.stroke()
//         drawNode(node.right, rightChildX, rightChildY, level + 1)
//       }
//     }

//     // Пример данных для бинарного дерева
//     const treeData = {
//       id: 1,
//       avatar: 'avatar1.png',
//       username: 'Иван',
//       birthdate: '01.01.1990',
//       partner: 'партнеров: 3',
//       left: {
//         id: 2,
//         avatar: 'avatar2.png',
//         username: 'Петр',
//         birthdate: '02.02.1991',
//         partner: 'партнеров: 10',
//         left: {
//           id: 123548975412,
//           avatar: 'avatar4.png',
//           username: 'Анна',
//           birthdate: '03.03.1992',
//           partner: 'партнеров: 2',
//           left: null,
//           right: null,
//         },
//         right: {
//           id: 5,
//           avatar: 'avatar5.png',
//           username: 'Мария',
//           birthdate: '04.04.1993',
//           partner: 'партнеров: 11',
//           left: null,
//           right: null,
//         },
//       },
//       right: {
//         id: 3,
//         avatar: 'avatar3.png',
//         username: 'Алексей',
//         birthdate: '05.05.1994',
//         partner: 'партнеров: 50',
//         left: {
//           id: 6,
//           avatar: 'avatar6.png',
//           username: 'Елена',
//           birthdate: '06.06.1995',
//           partner: 'партнеров: 69',
//           left: null,
//           right: null,
//         },
//         right: {
//           id: 7,
//           avatar: 'avatar7.png',
//           username: 'Дмитрий',
//           birthdate: '07.07.1996',
//           partner: 'партнеров: 5',
//           left: null,
//           right: null,
//         },
//       },
//     }

//     // Очистка холста перед отрисовкой
//     context.clearRect(0, 0, canvas.width, canvas.height)

//     // Отрисовка корневого узла и его потомков
//     drawNode(treeData, rootNodePosition.x, rootNodePosition.y, 1)
//   }, [])

//   return <canvas ref={canvasRef} width={1500} height={1000} />;

///////////////////////////////////////////////////////////////////

  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');
    
  //   // Определение параметров дерева 
  //   const nodeSize = 120;
  //   const levelDistance = 700;
  //   const verticalDistance = 220;
  //   const rootNodePosition = { x: canvas.width / 2, y: 40 };
    
  //   // Рекурсивная функция для отрисовки узлов и связей дерева
  //   const drawNode = (node, x, y, level) => {
  //     const avatarSize = nodeSize - 10;
  //     const avatarX = x - avatarSize / 2;
  //     const avatarY = y - avatarSize / 2;
  //     const avatarImage = new Image();
  //     avatarImage.src = getImageUrl(node?.value, node?.value?.avatar);

      
  //     avatarImage.onload = () => {
  //       context.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
  //     };

  //     // Отрисовка узла в форме квадрата
  //     context.fillStyle = 'black';
  //     context.fillRect(x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);
  //     context.strokeStyle = 'black';
  //     context.strokeRect(x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);


  //     // Отрисовка значения узла
  //     context.font = '12px Arial';
  //     context.fillStyle = 'white';
  //     context.textAlign = 'center';
  //     context.textBaseline = 'middle'; 
  //     context.fillText(node?.value?.id.toString(), x, y);

  //     // Отрисовка связей
  //     if (node?.left) {
  //       const leftChildX = x - levelDistance / Math.pow(2, level);
  //       const leftChildY = y + verticalDistance;
  //       context.beginPath();
  //       context.moveTo(x, y + nodeSize / 2);
  //       context.lineTo(leftChildX, leftChildY - nodeSize / 2);
  //       context.stroke();
  //       drawNode(node.left, leftChildX, leftChildY, level + 1);
  //     }

  //     if (node?.right) {
  //       const rightChildX = x + levelDistance / Math.pow(2, level);
  //       const rightChildY = y + verticalDistance;
  //       context.beginPath();
  //       context.moveTo(x, y + nodeSize / 2);
  //       context.lineTo(rightChildX, rightChildY - nodeSize / 2);
  //       context.stroke();
  //       drawNode(node.right, rightChildX, rightChildY, level + 1);
  //     }
  //   }; 

  //   // Пример данных для бинарного дерева

  //   // Очистка холста перед отрисовкой
  //   context.clearRect(0, 0, canvas.width, canvas.height);

  //   // Отрисовка корневого узла и его потомков
  //   drawNode(treeData, rootNodePosition.x, rootNodePosition.y, 1);
  // }, [treeData]);

  // return (
  //   <canvas 
  //     ref={canvasRef} 
  //     width={2000} 
  //     height={800} 
  //   />
  // ) 
  
// };

// export default BinaryTree;

// const [isDragging, setIsDragging] = React.useState(false);
// const [startX, setStartX] = React.useState(0);
// const [startY, setStartY] = React.useState(0);
// const [offsetX, setOffsetX] = React.useState(0);
// const [offsetY, setOffsetY] = React.useState(0);

// const handleMouseDown = (e) => {
//   setIsDragging(true);
//   setStartX(e.clientX);
//   setStartY(e.clientY);
// };

// const handleMouseUp = () => {
//   setIsDragging(false);
//   setOffsetX(offsetX + (startX - e.clientX));
//   setOffsetY(offsetY + (startY - e.clientY));
// };

// const handleMouseMove = (e) => {
//   if (!isDragging) return;
//   const deltaX = startX - e.clientX;
//   const deltaY = startY - e.clientY;
//   setOffsetX(offsetX - deltaX);
//   setOffsetY(offsetY - deltaY);
//   setStartX(e.clientX);
//   setStartY(e.clientY);
// };

// <div 
//   className="w-[100vw] h-[100vh] overflow-hidden relative"
//   onMouseDown={handleMouseDown}
//   onMouseUp={handleMouseUp}
//   onMouseMove={handleMouseMove}
// >
//   <canvas 
//     className='w-[200%] h-[200%]'
//     ref={canvasRef} 
//     width={2500} 
//     height={600} 
//     style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
//   />
// </div>