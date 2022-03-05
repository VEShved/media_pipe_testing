function calculateAngle (hip, shin) {
  let dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

  let mag = ({ x, y, z }) => Math.hypot(x, y, z);

  return Math.acos(dot(hip, shin) / (mag(hip) * mag(shin)));
};

export default function Knee ({ landmarks }) {
  const
    { hip, knee, ankle } = landmarks,
    hipV = {
      x: hip.x - knee.x,
      y: hip.y - knee.y,
      z: hip.z - knee.z
    },
    shinV = {
      x: ankle.x - knee.x,
      y: ankle.y - knee.y,
      z: ankle.z - knee.z
    },
    radians = calculateAngle(hipV, shinV),
    degrees = radians * 180 / Math.PI;

  return `${radians} (${degrees}°)`
};
