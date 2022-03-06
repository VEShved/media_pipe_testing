import { POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT } from '@mediapipe/pose';
import Knee from './Knee';

const kneePresent = (knee) => knee.hip && knee.knee && knee.ankle

function printToConsole (left, right) {
  if (kneePresent(left)) {
    console.log(`Left: ${Knee({ landmarks: left })}`);
  };

  if (kneePresent(right)) {
    console.log(`Right: ${Knee({ landmarks: right })}`);
  };

  return "";
};

function addDiv (left, right) {
  return (
    <div>
      {kneePresent(left) ? <p>
        Left: <Knee landmarks={left} />
      </p> : ""}
      {kneePresent(right) ? <p> Right: <Knee landmarks={right} /> </p> : ""}
    </div>
  );
};

export default function Knees ({ landmarks }) {
  const leftLandmarks = {
    hip: landmarks[POSE_LANDMARKS_LEFT.LEFT_HIP],
    knee: landmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE],
    ankle: landmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE]
  };
  const rightLandmarks = {
    hip: landmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
    knee: landmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE],
    ankle: landmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]
  };

  // Print knee angles to console
  return printToConsole(leftLandmarks, rightLandmarks)

  // Print knee angles under the video
  // return addDiv(leftLandmarks, rightLandmarks)
};
