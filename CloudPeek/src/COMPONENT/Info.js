// All the process info and loading icon will be shown there
import { useInfo } from "../CONTEXT/ProcessInfo";

export default function Info() {
  const { Info: processInfo } = useInfo();

  if (!processInfo.isActive) {
    return null;
  }

  return (
    <div className="container my-5">
      <div className="p-4 text-center bg-body-tertiary rounded-3">
        <p className="mb-3 fs-5" style={{ whiteSpace: "pre-line" }}>
          {processInfo.message}
        </p>
        {processInfo.processStatus && (
          <div className="d-flex justify-content-center gap-3">
            <div
              className="spinner-grow spinner-grow-md text-primary spinner-speed"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow spinner-grow-md text-primary spinner-speed"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div
              className="spinner-grow spinner-grow-md text-primary spinner-speed"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
