function calculateAngle (hip, shin) {
  let dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

  let mag = ({ x, y, z }) => Math.hypot(x, y, z);

  return Math.acos(dot(hip, shin) / (mag(hip) * mag(shin)));
};

function vector (dotA, dotB) {
  return ({
    x: dotA.x - dotB.x,
    y: dotA.y - dotB.y,
    z: dotA.z - dotB.z
  });
}

export default function Knee ({ landmarks }) {
  const
    { hip, knee, ankle } = landmarks,
    degreesInRadian = 180 / Math.PI,
    hipV = vector(hip, knee),
    shinV = vector(ankle, knee),
    radians = calculateAngle(hipV, shinV),
    degrees = radians * degreesInRadian;

  return `${radians} (${degrees}°)`
};
