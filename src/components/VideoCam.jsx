import { Camera } from '@mediapipe/camera_utils';
import { Pose } from '@mediapipe/pose';
import { useRef, useEffect, useState } from 'react';
import Knees from './Knees';

function initPose () {
  let pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  return pose;
}

export default function VideoCam () {
  let camera;

  const
    videoRef = useRef(),
    pose = initPose(),
    [poseLandmarks, setPoseLandmarks] = useState({});

  function onPoseChanged (results) {
    if (!results.poseLandmarks) {
      return;
    }
    setPoseLandmarks(results.poseLandmarks)
  }

  pose.onResults(onPoseChanged);

  function startCamera () {
    if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 360
      });

      camera.start();
    }
  };

  useEffect(() => {
    startCamera();

    return function cleanup () {
      camera.stop();
    }
  }, [camera]);

  return (
    <div>
      <div>
        <video ref={videoRef} />
      </div>
      <Knees landmarks={poseLandmarks} />
    </div>
  );
};
