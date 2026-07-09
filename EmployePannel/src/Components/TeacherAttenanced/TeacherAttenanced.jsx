import React, { useEffect, useState, useRef } from "react";
import "./TeacherAttenanced.css";
import API from "../../api/axios"; 
import Swal from "sweetalert2"; // Integrated SweetAlert2

import {
  FaSignInAlt, FaSignOutAlt, FaCoffee, FaPlayCircle, FaHome,
  FaChevronRight, FaClock, FaBusinessTime, FaMugHot, FaHistory,
  FaThumbtack, FaExclamationTriangle,
} from "react-icons/fa";

const TeacherAttenanced = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState("Not Punched In"); 
  
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchInTimestamp, setPunchInTimestamp] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [activities, setActivities] = useState([]);

  // Geofencing warnings
  const [geoError, setGeoError] = useState(null);
  const [fenceWarning, setFenceWarning] = useState("");
  const [isOutside, setIsOutside] = useState(false);

  const syncIntervalRef = useRef(null);
  const dbBreaksRef = useRef([]); 

  /* =====================================================
      INITIAL DATA FETCH FROM SERVER (ON LOAD)
  ====================================================== */
  useEffect(() => {
    const fetchTodayState = async () => {
      try {
        const response = await API.get("/attendance/today-status");
        if (response.data.data) {
          const record = response.data.data;
          setAttendanceStatus(record.status);
          setPunchInTimestamp(record.punchInTime);
          setPunchInTime(new Date(record.punchInTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
          dbBreaksRef.current = record.breaks || [];

          let logs = [{ id: 1, title: "Punched In", time: new Date(record.punchInTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) }];
          
          record.breaks.forEach((b, idx) => {
            if (b.start) logs.push({ id: `bs-${idx}`, title: "Break Started", time: new Date(b.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) });
            if (b.end) logs.push({ id: `be-${idx}`, title: "Break Ended", time: new Date(b.end).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) });
          });

          if (record.punchOutTime) {
            setPunchOutTime(new Date(record.punchOutTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
            logs.push({ id: 2, title: record.status, time: new Date(record.punchOutTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) });
          }

          setActivities(logs.reverse());
        }
      } catch (err) {
        console.error("Initialization failed to retrieve ledger.", err);
      }
    };
    fetchTodayState();
  }, []);

  /* =====================================================
      DYNAMIC DRIVEN CALCULATION ENGINES
  ====================================================== */
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    const isActiveSession = ["Working", "On Break"].includes(attendanceStatus);

    if (isActiveSession && punchInTimestamp) {
      timer = setInterval(() => {
        const totalElapsedSecs = Math.floor((new Date() - new Date(punchInTimestamp)) / 1000);
        
        let parsedBreakSecs = 0;
        dbBreaksRef.current.forEach((b) => {
          const end = b.end ? new Date(b.end) : new Date();
          parsedBreakSecs += Math.floor((end - new Date(b.start)) / 1000);
        });

        setBreakSeconds(parsedBreakSecs);
        setWorkingSeconds(totalElapsedSecs > parsedBreakSecs ? totalElapsedSecs - parsedBreakSecs : 0);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [attendanceStatus, punchInTimestamp]);

  /* =====================================================
      GEOLOCATION BACKGROUND SYNC
  ====================================================== */
  useEffect(() => {
    if (attendanceStatus === "Working") {
      syncIntervalRef.current = setInterval(() => {
        getCurrentLocation()
          .then(async (coords) => {
            try {
              const response = await API.post("/attendance/sync-location", {
                lat: coords.lat, lng: coords.lng, accuracy: coords.accuracy,
              });

              if (response.data.status === "Auto Punched Out") {
                setAttendanceStatus("Auto Punched Out");
                setPunchOutTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
                addActivity("Auto Punched Out");

                // Critical Geofence Perimeter Eviction Notification
                Swal.fire({
                  title: "<strong>System Auto Punch-Out</strong>",
                  icon: "error",
                  html: `<b>Perimeter breach:</b> ${response.data.message || "Your session ended automatically because you remained outside campus boundaries."}`,
                  confirmButtonColor: "#d33",
                  confirmButtonText: "Acknowledge"
                });

              } else if (!response.data.isInside) {
                setIsOutside(true);
                setFenceWarning(response.data.message);
              } else {
                setIsOutside(false);
                setFenceWarning("");
              }
            } catch (err) {
              console.error(err);
            }
          })
          .catch((err) => setGeoError(err.message));
      }, 15000); 
    } else {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
        syncIntervalRef.current = null;
      }
      setFenceWarning("");
      setIsOutside(false);
    }

    return () => {
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    };
  }, [attendanceStatus]);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("Browser location services missing."));
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
        (err) => reject(new Error("Please enable location services permissions.")),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  /* =====================================================
      EVENT HANDLERS WITH SWAL NOTIFICATIONS
  ====================================================== */
  const handlePunchIn = async () => {
    try {
      const coords = await getCurrentLocation();
      const response = await API.post("/attendance/punch-in", { lat: coords.lat, lng: coords.lng, accuracy: coords.accuracy });
      
      const record = response.data.data;
      setAttendanceStatus("Working");
      setPunchInTimestamp(record.punchInTime);
      setPunchInTime(new Date(record.punchInTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
      addActivity("Punched In");

      Swal.fire({
        title: "<strong>Punch In Successful</strong>",
        icon: "success",
        html: `Welcome! Your attendance shift has been registered successfully at <b>${new Date(record.punchInTime).toLocaleTimeString()}</b>.`,
        confirmButtonColor: "#28a745",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!'
      });
    } catch (err) {
      Swal.fire({
        title: "<strong>Punch In Failed</strong>",
        icon: "error",
        text: err.response?.data?.message || err.message,
        confirmButtonColor: "#dc3545"
      });
    }
  };

  const handleToggleBreak = async () => {
    try {
      const response = await API.post("/attendance/toggle-break");
      const record = response.data.data;
      dbBreaksRef.current = record.breaks;
      
      if (record.status === "On Break") {
        setAttendanceStatus("On Break");
        addActivity("Break Started");

        Swal.fire({
          title: "<strong>Break Initiated</strong>",
          icon: "info",
          html: "Your status is set to <b>On Break</b>. Background geofence tracking metrics are temporarily on hold.",
          confirmButtonColor: "#17a2b8"
        });
      } else {
        setAttendanceStatus("Working");
        addActivity("Break Ended");

        Swal.fire({
          title: "<strong>Break Concluded</strong>",
          icon: "success",
          html: "Welcome back! Your status has returned to <b>Active Duty</b>.",
          confirmButtonColor: "#28a745"
        });
      }
    } catch (err) {
      Swal.fire({
        title: "<strong>Action Failed</strong>",
        icon: "error",
        text: err.response?.data?.message || err.message,
        confirmButtonColor: "#dc3545"
      });
    }
  };

  const handlePunchOut = async () => {
    // Confirm dialogue prior to cutting off shift metrics
    Swal.fire({
      title: "<strong>End Your Shift?</strong>",
      icon: "warning",
      html: "Are you sure you want to <b>Punch Out</b>? You will lock this submission and won't be able to log back in until tomorrow.",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Punch Out",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const coords = await getCurrentLocation();
          await API.post("/attendance/punch-out", { lat: coords.lat, lng: coords.lng, accuracy: coords.accuracy });
          
          setAttendanceStatus("Punched Out");
          setPunchOutTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
          addActivity("Punched Out");

          Swal.fire({
            title: "<strong>Punched Out Successfully</strong>",
            icon: "success",
            html: "Have a great Day ! Today's duty metrics are stored and locked cleanly.",
            confirmButtonColor: "#28a745"
          });
        } catch (err) {
          Swal.fire({
            title: "<strong>Checkout Error</strong>",
            icon: "error",
            text: err.response?.data?.message || err.message,
            confirmButtonColor: "#dc3545"
          });
        }
      }
    });
  };

  const addActivity = (title) => {
    const log = {
      id: Date.now(),
      title,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    setActivities((prev) => [log, ...prev]);
  };

  const formatSecondsToHoursMins = (totalSeconds) => {
    if (!totalSeconds || totalSeconds < 0) return "00h 00m 00s";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
  };

  const isShiftComplete = ["Punched Out", "Auto Punched Out"].includes(attendanceStatus);
  const displayStatus = isOutside && attendanceStatus === "Working" ? "Outside Geofence" : attendanceStatus;

  const timeString = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const [rawTime, amPm] = timeString.split(" ");

  return (
    <div className="attendance-page-wrapper">
      <div className="top-navigation-bar">
        <div>
          <span className="eyebrow">Register</span>
          <h2>Today&rsquo;s Attendance Dashboard</h2>
        </div>
      </div>

      {geoError && <div className="geo-alert-banner system-error"><FaExclamationTriangle /> <span>{geoError}</span></div>}
      {fenceWarning && <div className="geo-alert-banner system-warning"><FaExclamationTriangle /> <span>{fenceWarning}</span></div>}

      <div className="dashboard-grid">
        <div className="dashboard-card live-clock-card">
          <div className="clock-glass-overlay">
            <div className="clock-digits">{rawTime}<span className="clock-ampm">{amPm}</span></div>
            <div className="clock-date">{currentTime.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
          <div className="shift-plan-strip"><FaClock /> <span>Logged In At: {punchInTime || "--:--"}</span></div>
        </div>

        <div className="dashboard-card action-controller-card">
          <div className={`status-badge-pill ${displayStatus.toLowerCase().replace(/\s+/g, "-")}`}>
            <span className="status-indicator-dot"></span>
            <span>{displayStatus}</span>
          </div>

          <div className="circle-button-container">
            {isShiftComplete ? (
              <button className="action-circle btn-locked" disabled style={{ background: "#4A4A4A", color: "#A0A0A0", cursor: "not-allowed" }}>
                <FaClock className="circle-icon" />
                <span>Shift Ended</span>
              </button>
            ) : attendanceStatus === "Not Punched In" ? (
              <button className="action-circle btn-punch-in" onClick={handlePunchIn}>
                <FaSignInAlt className="circle-icon" />
                <span>Punch In</span>
              </button>
            ) : (
              <div className="dual-action-wrapper">
                <button className="action-circle btn-punch-out" onClick={handlePunchOut}>
                  <FaSignOutAlt className="circle-icon" />
                  <span>Punch Out</span>
                </button>
                <button className={`secondary-break-btn ${attendanceStatus === "On Break" ? "on-break-active" : ""}`} onClick={handleToggleBreak}>
                  <FaCoffee /> {attendanceStatus === "On Break" ? "End Break" : "Go on Break"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card statistics-card">
        <div className="sub-stats-grid">
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper shift-icon"><FaClock /></div>
            <div className="stat-content-text"><span className="stat-lbl">Punch In Reference</span><span className="stat-val">{punchInTime || "--:--"}</span></div>
          </div>
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper work-icon"><FaBusinessTime /></div>
            <div className="stat-content-text"><span className="stat-lbl">Net Work Duration</span><span className="stat-val font-numeric">{formatSecondsToHoursMins(workingSeconds)}</span></div>
          </div>
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper break-icon"><FaMugHot /></div>
            <div className="stat-content-text"><span className="stat-lbl">Total Break Accumulated</span><span className="stat-val font-numeric">{formatSecondsToHoursMins(breakSeconds)}</span></div>
          </div>
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper overtime-icon"><FaHistory /></div>
            <div className="stat-content-text"><span className="stat-lbl">Checkout Status</span><span className="stat-val">{punchOutTime || "Active Session"}</span></div>
          </div>
        </div>
      </div>

      <div className="bottom-activity-panel">
        <h3>Today&rsquo;s Activity Register</h3>
        <div className="timeline-container">
          {activities.length === 0 ? (
            <div className="empty-timeline-state">No shifts recorded today.</div>
          ) : (
            activities.map((activity) => (
              <div className="timeline-row" key={activity.id}>
                <span className="log-timestamp">{activity.time}</span>
                <span className={`log-title tag-${activity.title.toLowerCase().replace(/\s+/g, "-")}`}>{activity.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttenanced;