import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ScanQRPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraOn, setCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  const goNext = () => {
    setTimeout(() => {
      navigate("/next-page"); // 🔁 SAME PAGE FOR BOTH
    }, 3500);
  };

  const startCamera = () => {
    setCameraOn(true);
    setScanning(true);
    goNext();
  };

  const demoScan = () => {
    setScanning(true);
    goNext();
  };

  useEffect(() => {
    if (!cameraOn) return;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        setError("Unable to access camera.");
        setCameraOn(false);
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn]);

  return (
    <div className="page">
      <div className="card qr-card">

        <div className="qr-icon">⌁</div>

        <h2 className="qr-title">Scan Table QR</h2>
        <p className="subtitle">
          Scan the QR code on your table to get started
        </p>

        <div className="qr-box">
          {cameraOn ? (
            <video
              ref={videoRef}
              className="camera-video"
              playsInline
              muted
            />
          ) : (
            <div className="camera-icon">📷</div>
          )}

          {/* 🔥 SCAN LINE */}
          {scanning && <div className="scan-line" />}
        </div>

        {error && <div className="error-box">{error}</div>}

        {!cameraOn && !scanning && (
          <button onClick={startCamera}>
            Start Camera Scan
          </button>
        )}

        {!scanning && (
          <button className="secondary" onClick={demoScan}>
            Demo: Simulate Scan
          </button>
        )}

      </div>
    </div>
  );
}

export default ScanQRPage;
