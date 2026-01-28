import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function ScanQRPage() {
  const navigate = useNavigate();

  // ---- scan states ----
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // ---------------- SCAN FLOW ----------------
  const handleScanResult = async (tableCode) => {
    try {
      const res = await api.get(`/bill/${tableCode}`);
      const data = res.data;

      navigate("/preview", {
        state: {
          tableNo: tableCode,
          totalBill: data.total,
          splitAmount: data.splitAmount,
          people: data.participants,
        },
      });
    } catch (err) {
      setError("Invalid or expired QR");
      setScanning(false);
    }
  };

  // demo scan
  const demoScan = () => {
    setError("");
    setScanning(true);

    const demoTableCode = "TABLE-12";
    setTimeout(() => {
      handleScanResult(demoTableCode);
    }, 2000);
  };

  const startCamera = () => {
    setError("");
    setCameraOn(true);
    setScanning(true);

    // simulate for now (remove this when real QR scanning is added)
    demoScan();
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
      } catch {
        setError("Unable to access camera");
        setCameraOn(false);
        setScanning(false);
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [cameraOn]);

  // ---------------- UI ----------------
  return (
    <div className="page">
      <div className="card split-card">
        <div className="qr-icon">📷</div>

        <h2 className="qr-title">Scan Table QR</h2>
        <p className="subtitle">Scan the QR to join and split the bill</p>

        {/* ---- SCAN QR ---- */}
        <div className="qr-box">
          {cameraOn ? (
            <video ref={videoRef} className="camera-video" muted playsInline />
          ) : (
            <div className="camera-icon">📷</div>
          )}
          {scanning && <div className="scan-line" />}
        </div>

        {error && <div className="error-box">{error}</div>}

        {!cameraOn && (
          <button className="confirm" onClick={startCamera}>
            Scan Table QR
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
