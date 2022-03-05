import { POSE_LANDMARKS_LEFT, POSE_LANDMARKS_RIGHT } from '@mediapipe/pose';
import Knee from './Knee';

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

  const kneePresent = (knee) => knee.hip && knee.knee && knee.ankle

  return (
    <div>
      {kneePresent(leftLandmarks) ? <p> Left: <Knee landmarks={leftLandmarks} /> </p> : ""}
      {kneePresent(rightLandmarks) ? <p> Right: <Knee landmarks={rightLandmarks} /> </p> : ""}
    </div>
  );
};
