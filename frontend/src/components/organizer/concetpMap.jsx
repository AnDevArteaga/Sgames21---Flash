import React from 'react';
import {
    ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 50 },
    data: { label: '🌍 Cambio Climático' },
    style: { background: '#E0F2FE', borderRadius: 10, padding: 10 },
  },
  {
    id: '2',
    position: { x: 400, y: 0 },
    data: { label: '🌳 Deforestación' },
    style: { background: '#FEF3C7', borderRadius: 10, padding: 10 },
  },
  {
    id: '3',
    position: { x: 400, y: 150 },
    data: { label: '🔥 Efecto Invernadero' },
    style: { background: '#FEE2E2', borderRadius: 10, padding: 10 },
  },
  {
    id: '4',
    position: { x: 100, y: 250 },
    data: { label: '💡 Pensamiento Crítico' },
    style: { background: '#EDE9FE', borderRadius: 10, padding: 10 },
  },
  {
    id: '5',
    position: { x: 400, y: 300 },
    data: { label: '🧠 Metacognición' },
    style: { background: '#DCFCE7', borderRadius: 10, padding: 10 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'contribuye a',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'causa',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e4-1',
    source: '4',
    target: '1',
    label: 'analiza causas y consecuencias',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e5-4',
    source: '5',
    target: '4',
    label: 'refuerza',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export default function ConceptMap() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-96">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}