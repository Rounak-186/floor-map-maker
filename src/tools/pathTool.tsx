import { Circle, Group, Line } from "react-konva";

export const PathTool = ({ id, path, data }: { path: Record<string, Record<string, number>>[], id: string, data: any }) => {

  const points: number[] = [];
  const vertices: number[][] = [];

  path.map((edge) => {
    points.push(...[edge.v1?.x, edge.v1?.y, edge.v2?.x, edge.v2?.y])
  })
  path.map((edge) => {
    vertices.push([edge.v1?.x, edge.v1?.y])
    vertices.push([edge.v2?.x, edge.v2?.y])
  })

  return (
    <Group id={id}>
      <Line
        points={points}
        stroke="green"
        strokeWidth={3}
      />
      {
        vertices.map((vertex, index) => {
          return (
            <Circle
              key={index}
              x={vertex[0]}
              y={vertex[1]}
              radius={4}
              fill="green"
              
            />
          )
        })
      }
    </Group>

  )
}
